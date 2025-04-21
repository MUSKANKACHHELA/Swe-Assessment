# 🌍 EcoVision: Climate Visualizer

EcoVision is a climate data visualization tool that helps users explore patterns and trends in climate metrics like temperature, precipitation, and humidity across various global locations. The app supports filtering, summarization, and trend analysis based on user-selected inputs.

---

## ⚙️ Backend Setup

### 1. Navigate to the backend folder

```bash
cd backend
```

### 2. Create and activate a virtual environment

```bash

python3 -m venv venv
source venv/bin/activate

```
### 3. Install dependencies

```bash

pip install -r requirements.txt

```

### 4. Set up .env for DB connection

Create a .env file in the backend folder and add:

```bash

DB_HOST=localhost  
DB_USER=root  
DB_PASSWORD=yourpassword  
DB_NAME=climate_db  
FLASK_PORT=5050

```



### 5. Load sample data into the MySQL database

```bash

python data_loader.py

```
### Optional: Verify Database Tables

You can run the `check_tables.py` script to verify that all required tables (`locations`, `metrics`, `climate_data`) exist in your database.

```bash
python check_tables.py
```

### 6. Create indexes for performance optimization

```bash

python create_indexes.py

```

### 7. Run the Flask backend

```bash

python app.py

```

Runs at: http://localhost:5050


## 💻 Frontend Setup

### 1. Navigate to the frontend directory

```bash

cd frontend

```

### 2. Install frontend dependencies

```bash

npm install

```

### 3. Start the development server

```bash

npm run dev

```

Runs at: http://localhost:3000

## 🌐 API Routes Implemented

GET`/api/v1/locations` — Fetch all location metadata

GET `/api/v1/metrics` — Fetch available climate metrics

GET `/api/v1/climate` — Fetch filtered raw climate data

GET `/api/v1/summary` — Return min, max, and weighted average stats

GET `/api/v1/trends` — Return trend direction, rate, anomalies, and seasonality