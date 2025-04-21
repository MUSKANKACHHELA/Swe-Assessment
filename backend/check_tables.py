import pymysql
from dotenv import load_dotenv
import os

load_dotenv()

# Establish connection to the MySQL database
conn = pymysql.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    db=os.getenv("DB_NAME"),
    charset='utf8'
)
cursor = conn.cursor()

# Retrieve and print all table names from the database
cursor.execute("SHOW TABLES;")
tables = cursor.fetchall()
print("📋 Tables in climate_db:")
for table in tables:
    print("-", table[0])

# Close cursor and connection
cursor.close()
conn.close()

