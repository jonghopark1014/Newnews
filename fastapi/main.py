import findspark
from pyspark.sql import SparkSession

from konlpy.tag import Okt
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import DBSCAN

from fastapi import FastAPI

# python - mysql
import pandas as pd
import pymysql
from sqlalchemy import create_engine
from sqlalchemy import text
pymysql.install_as_MySQLdb()

# db연결
db_connection_str = 'mysql+pymysql://${DB_NAME_PASSWORD}@${DB_LOCATION}/${DB_DATABASE}'
db_connection = create_engine(db_connection_str)
conn = db_connection.connect()

app = FastAPI()

data = pd.read_sql(text("select * from news n left join news_image ni on n.news_id = ni.news_news_id limit 100;"), conn)

@app.get("/fast/api/search")
def search(keyword: str):
    global data
    findspark.init()
    # # spark 세션 연결
    # spark = SparkSession.builder.master('local').config("spark.hadoop.dfs.client.use.datanode.hostname", "true").getOrCreate()
    # data = spark.read.json("${HDFS_LOCATION}", encoding='euc-kr')
    # pandas_df = data.select('*').toPandas()

    # test를 위한 mySQL에서 데이터 가져오기

    print(data.head())

    # 명사 추출
    print('명사추출 들어갑니다')
    okt = Okt()
    noun_list = []
    for content in data['content']:
        nouns = okt.nouns(content)
        noun_list.append(nouns)

    data['nouns'] = noun_list

    # TF-IDF
    print('TF-IDF 들어갑니다')
    text = [" ".join(noun) for noun in data['nouns']]
    tfidf_vectorizer = TfidfVectorizer(min_df=5, ngram_range=(1, 5))
    tfidf_vectorizer.fit(text)
    vector = tfidf_vectorizer.transform(text).toarray()

    # DBSCAN
    print('DBSCAN 들어갑니다')
    model = DBSCAN(eps=0.3, min_samples=3, metric='cosine')
    result = model.fit_predict(vector)
    data['result'] = result
    print('unique_df들어갑니다~')
    data = data.drop(columns="nouns")
    data = data.drop(columns="news_date")
    data = data.drop(columns="press")
    data = data.drop(columns="reporter")
    data = data.drop(columns="news_news_id")
    data = data.drop(columns="content")
    unique_df = data.drop_duplicates(subset=["result"], keep="first").reset_index(drop=True)
    print('unique_df들어갑니다2')
    # unique_df = unique_df.drop([1], axis=0, inplace=False)
    unique_df = unique_df.to_json(force_ascii=False, orient = 'records')

    return unique_df

