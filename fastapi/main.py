import findspark
from pyspark.sql import SparkSession

from pyspark.sql.functions import array_contains, col
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.cluster import DBSCAN

from fastapi import FastAPI

# for CORS
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.router.redirect_slashes = False

# CORS 해결
origins = [
    "https://j8b309.p.ssafy.io",
    "http://localhost:8889",
    "http://localhost:8000",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/fast/api/search")
def search(keyword: str):
    findspark.init()
    # spark 세션 연결
    data_parameter = f"hdfs://${DB_DOMAIN_1}:${DB_PORT}/${DB_DOMAIN_2}/${DB_DOMAIN_3}/${DB_DOMAIN_4}/{keyword}"
    spark = SparkSession.builder.master('local').config("spark.hadoop.dfs.client.use.datanode.hostname", "true").getOrCreate()
    print("=============================자료 읽기======================")
    data = spark.read.json(data_parameter, encoding='utf8')
    print("=========================자료 전처리==========================")
    # data = data.select(col('dtype'), col('news_id'), col('title'), col('nouns'), col('img')).filter(array_contains(data.nouns, keyword))
    # print(data)
    data = data.toPandas()

    try:
        print("try")
        # tf-idf
        print("tf-idf")
        text = [" ".join(noun) for noun in data["nouns"]]
        tfidf_vectorizer = TfidfVectorizer(min_df=3, ngram_range=(1, 5))
        tfidf_vectorizer.fit(text)
        vector = tfidf_vectorizer.transform(text).toarray()

        # DBSCAN
        print("DBSCAN")
        model = DBSCAN(eps=0.3, min_samples=3, metric='cosine')
        result = model.fit_predict(vector)
        data['result'] = result
        print("DB_DROP")
        data = data.drop(
            columns=["nouns"])
        print("DB_DROP_DUPLICATES")
        unique_df = data.drop_duplicates(subset=["result"], keep="first").reset_index(drop=True)
        unique_df = data.drop(columns=["nouns"])
        unique_df = unique_df.to_dict(orient='records')
        for i in range(len(unique_df)):
            unique_df[i]['img'] = unique_df[i]['img'][0][1]

        return unique_df
    except:
        print("except")
        unique_df = data.drop_duplicates(subset=["title"], keep="first").reset_index(drop=True)
        unique_df = data.drop(columns=["nouns"])
        unique_df = unique_df.to_dict(orient='records')
        for i in range(len(unique_df)):
            unique_df[i]['img'] = unique_df[i]['img'][0][1]
        return unique_df

