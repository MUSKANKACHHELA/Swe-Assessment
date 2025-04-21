import pymysql
from dotenv import load_dotenv
import os



load_dotenv()
# Connect to the MySQL database
conn = pymysql.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    db=os.getenv("DB_NAME"),
    charset='utf8'
)
cursor = conn.cursor()

# Create indexes to improve query performance on common filters
cursor.execute("CREATE INDEX idx_location_date ON climate_data(location_id, date);")
cursor.execute("CREATE INDEX idx_metric_date ON climate_data(metric_id, date);")

# Commit changes and close connection
conn.commit()
cursor.close()
conn.close()

print("Indexes created successfully!")
