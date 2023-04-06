# spark import
import findspark
findspark.init()

import pyspark

# pandas import
import pandas as pd

# os 모듈 import
import os
os.environ["PYARROW_IGNORE_TIMEZONE"] = "1"

# kafka, json
from kafka import KafkaConsumer
from json import loads

# pyspark 세션, 함수 설정
from pyspark import SparkContext
from pyspark.sql.functions import *
from pyspark.sql import SparkSession
from pyspark.sql.types import *
from pyspark.sql.functions import lit

# python - mysql 연결
from sqlalchemy import create_engine
from sqlalchemy.sql import text

# sci-kit learn import
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import TfidfVectorizer

def write_by_dtype(df, word):
    df.write \
            .format("jdbc") \
            .option("url", "jdbc:mysql://주소:포트/newnews") \
            .option("dbtable", word) \
            .option("user", "아이디") \
            .option("password", "비밀번호") \
            .option("primaryKey", "news_id") \
            .option("ignore", "true") \
            .mode("append") \
            .save()

# MySQL에 데이터 쓰는 함수
def write_to_mysql(df, epoch_id):
    # df에서 image_list 필드를 제외한 wdf 생성
    wdf = df.select([col(c) for c in df.columns if c != "img" if c != "nouns"])
    # db 적재
    wdf.write \
            .format("jdbc") \
            .option("url", "jdbc:mysql://주소:포트/newnews") \
            .option("dbtable", "news") \
            .option("user", "아이디") \
            .option("password", "비밀번호") \
            .mode("append") \
            .save()

    news = spark \
        .read \
        .format("jdbc") \
        .option("url", "jdbc:mysql://주소:포트/newnews") \
        .option("user", "아이디") \
        .option("password", "비밀번호") \
        .option("query", "SELECT * FROM news ORDER BY news_id DESC LIMIT 1") \
        .load()

    if not news.isEmpty(): 
        news_id = news.select("news_id").collect()[0][0]
        df = df.withColumn("news_id",lit(news_id))
        # news_id에 따른 hdfs 적재
        df.write.format("json").mode("append").save(f"/user/newnews/{news_id}")
        news = news.selectExpr("CAST(dtype AS STRING)","CAST(news_id AS LONG)")
        check = news.select("dtype").collect()[0][0]
        if check=="Economy":
            news=news.drop("dtype")
            write_by_dtype(news,"economy")
        elif check=="ItAndScience":
            news=news.drop("dtype")
            write_by_dtype(news,"it_and_science")
        elif check=="LifeAndCulture":
            news=news.drop("dtype")
            write_by_dtype(news,"life_and_culture")
        elif check=="Politics":
            news=news.drop("dtype")
            write_by_dtype(news,"politics")
        elif check=="Society":
            news=news.drop("dtype")
            write_by_dtype(news,"society")
        if not df.select("img").isEmpty():
            image_list = df.select("img").collect()[0][0]
            if image_list.count!=0:
                for image in image_list:
                    news = news.withColumnRenamed("news_id", "news_news_id")
                    news = news.withColumn("url", lit(image['url']))
                    news = news.withColumn("description", lit(image["description"]))
                    news.write \
                    .format("jdbc") \
                    .option("url", "jdbc:mysql://주소:포트/newnews") \
                    .option("dbtable", "news_image") \
                    .option("user", "아이디") \
                    .option("password", "비밀번호") \
                    .mode("append") \
                    .save()

    # for notification
    # # watched 테이블 가져오기
    watched = spark \
            .read \
            .format("jdbc") \
            .option("url", "jdbc:mysql://주소:포트/newnews") \
            .option("dbtable", "watched") \
            .option("user", "아이디") \
            .option("password", "비밀번호") \
            .load()
    
    # # watched table에 nouns 가져오기
    if not watched.isEmpty():
        check_watched = watched.collect()
        for watch in check_watched:
            wwat_id = watch[0]
            wnews_id = watch[1]
            wuser_id = watch[2]
            text_arr = []
            comp_df = spark.read.json(f'hdfs:///user/newnews/{wnews_id}/*')
            comp_df = comp_df.select("nouns").collect()[0][0]
            comp_text = ' '.join(comp_df)
            new_nouns = df.select("nouns").collect()[0][0]
            new_text = ' '.join(new_nouns)
            # # 자연어 벡터화
            text_arr.append(comp_text)
            text_arr.append(new_text)
            tfidf = TfidfVectorizer()
            tfidf_matrix = tfidf.fit_transform(text_arr)
            cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
            if 0.4 <= cosine_sim[0][1] <= 0.7:
                df2 = df.withColumn("news_id", lit(news_id))
                df2 = df2.withColumn("user_id", lit(wuser_id))
                df2 = df2.withColumn("watched_id", lit(wwat_id))
                df2 = df2.selectExpr("CAST(news_id AS LONG)", "CAST(user_id AS LONG)", "CAST(watched_id AS LONG)")
                df2.write \
                        .format("jdbc") \
                        .option("url", "jdbc:mysql://주소:포트/newnews") \
                        .option("dbtable", "notification") \
                        .option("user", "아이디") \
                        .option("password", "비밀번호") \
                        .mode("append") \
                        .save()
   
    
# SparkSession 만들기
spark = SparkSession.builder.appName("KafkaStreamReader").getOrCreate()

# schema 만들기
schema = StructType([
    StructField("title", StringType()),
    StructField("content", StringType()),
    StructField("press", StringType()),
    StructField("reporter", StringType()),
    StructField("news_date", StringType()),
    StructField("dtype", StringType()),
    StructField("nouns", ArrayType(StringType())),
    StructField("img", ArrayType(MapType(StringType(), StringType()))),
])

# 토픽 구독 설정
df = spark \
  .readStream \
  .format("kafka") \
  .option("kafka.bootstrap.servers", "주소:포트") \
  .option("startingOffsets", "latest") \
  .option("subscribe", "newnews") \
  .option("maxOffsetsPerTrigger", 1) \
  .load()

# json 형식으로 변환
df2 = df.selectExpr("CAST(value AS STRING)").select(from_json("value", schema).alias("data"))

# 전체 추출
df3 = df2.select("data.*")
# MySQL에 저장
query = df3.writeStream \
        .foreachBatch(write_to_mysql) \
        .start() \
        .awaitTermination()
