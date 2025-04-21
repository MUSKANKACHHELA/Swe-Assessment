
import json
import pymysql
from dotenv import load_dotenv
import os



load_dotenv()


# Establish a connection to the MySQL database
conn = pymysql.connect(
    host=os.getenv("DB_HOST"),
    user=os.getenv("DB_USER"),
    password=os.getenv("DB_PASSWORD"),
    db=os.getenv("DB_NAME"),
    charset='utf8'
)
cursor = conn.cursor()


# Reading the JSON file that contains all climate data
with open('data/sample_data.json') as f:
    data = json.load(f)

# Inserting each location entry into the 'locations' table
for loc in data['locations']:
    cursor.execute("""
        INSERT INTO locations (id, name, country, latitude, longitude, region)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (loc['id'], loc['name'], loc['country'], loc['latitude'], loc['longitude'], loc['region']))

# Populating the 'metrics' table with metric definitions
for metric in data['metrics']:
    cursor.execute("""
        INSERT INTO metrics (id, name, display_name, unit, description)
        VALUES (%s, %s, %s, %s, %s)
    """, (metric['id'], metric['name'], metric['display_name'], metric['unit'], metric['description']))

# Looping through all climate records and inserting them into the 'climate_data' table
for cd in data['climate_data']:
    cursor.execute("""
        INSERT INTO climate_data (id, location_id, metric_id, date, value, quality)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (cd['id'], cd['location_id'], cd['metric_id'], cd['date'], cd['value'], cd['quality']))

# Committing all inserts to the database and closing the connection
conn.commit()
cursor.close()
conn.close()

print("✅ Data loaded into MySQL successfully!")
