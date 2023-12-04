#!/bin/bash

API_ENDPOINT_ADD_INCOME="https://expense-tracker-ao84.onrender.com/api/v1/add-income"
API_ENDPOINT_ADD_EXPENSE="https://expense-tracker-ao84.onrender.com/api/v1/add-expense"
LOG_FILE="./cron_job.log"

# Use Python to generate the formatted date and create the JSON payloads
INCOME_POST_DATA=$(python -c "import datetime, json; date = (datetime.datetime.now() - datetime.timedelta(days=datetime.datetime.now().day-1)).strftime('%m-%d-%Y'); print(json.dumps({'title': 'Budget', 'amount': 2600, 'category': 'salary', 'description': 'Budget', 'date': date}))")
EXPENSE_POST_DATA_RENT=$(python -c "import datetime, json; date = (datetime.datetime.now() - datetime.timedelta(days=datetime.datetime.now().day-1)).strftime('%m-%d-%Y'); print(json.dumps({'title': 'Rent', 'amount': 1690, 'category': 'rent', 'description': 'Rent', 'date': date}))")
EXPENSE_POST_DATA_CAR_INSURANCE=$(python -c "import datetime, json; date = (datetime.datetime.now() - datetime.timedelta(days=datetime.datetime.now().day-1)).strftime('%m-%d-%Y'); print(json.dumps({'title': 'Car Insurance', 'amount': 295, 'category': 'carInsurance', 'description': 'Car Insurance', 'date': date}))")
EXPENSE_POST_DATA_ROGERS_MOBILE=$(python -c "import datetime, json; date = (datetime.datetime.now() - datetime.timedelta(days=datetime.datetime.now().day-1)).strftime('%m-%d-%Y'); print(json.dumps({'title': 'Rogers Mobile', 'amount': 134, 'category': 'mobile', 'description': 'Rogers Mobile', 'date': date}))")
EXPENSE_POST_DATA_BELL_WIFI=$(python -c "import datetime, json; date = (datetime.datetime.now() - datetime.timedelta(days=datetime.datetime.now().day-1)).strftime('%m-%d-%Y'); print(json.dumps({'title': 'Bell Wifi', 'amount': 102, 'category': 'wifi', 'description': 'Bell Wifi', 'date': date}))")
EXPENSE_POST_DATA_YMCA=$(python -c "import datetime, json; date = (datetime.datetime.now() - datetime.timedelta(days=datetime.datetime.now().day-1)).strftime('%m-%d-%Y'); print(json.dumps({'title': 'YMCA', 'amount': 44, 'category': 'tennis', 'description': 'YMCA', 'date': date}))")

# Add a delay before the cURL commands
sleep 5

# Directly use the Python-generated JSON data in cURL commands
CURL_CMD_ADD_INCOME="curl -X POST -H 'Content-Type: application/json' --data-raw '$INCOME_POST_DATA' $API_ENDPOINT_ADD_INCOME"
CURL_CMD_ADD_EXPENSE_RENT="curl -X POST -H 'Content-Type: application/json' --data-raw '$EXPENSE_POST_DATA_RENT' $API_ENDPOINT_ADD_EXPENSE"
CURL_CMD_ADD_EXPENSE_CAR_INSURANCE="curl -X POST -H 'Content-Type: application/json' --data-raw '$EXPENSE_POST_DATA_CAR_INSURANCE' $API_ENDPOINT_ADD_EXPENSE"
CURL_CMD_ADD_EXPENSE_ROGERS_MOBILE="curl -X POST -H 'Content-Type: application/json' --data-raw '$EXPENSE_POST_DATA_ROGERS_MOBILE' $API_ENDPOINT_ADD_EXPENSE"
CURL_CMD_ADD_EXPENSE_BELL_WIFI="curl -X POST -H 'Content-Type: application/json' --data-raw '$EXPENSE_POST_DATA_BELL_WIFI' $API_ENDPOINT_ADD_EXPENSE"
CURL_CMD_ADD_EXPENSE_YMCA="curl -X POST -H 'Content-Type: application/json' --data-raw '$EXPENSE_POST_DATA_YMCA' $API_ENDPOINT_ADD_EXPENSE"

echo "[$(date)] Cron Job started" >> "$LOG_FILE"
echo "Executing: $CURL_CMD_ADD_INCOME" >> "$LOG_FILE"
eval $CURL_CMD_ADD_INCOME >> "$LOG_FILE" 2>&1

echo "Executing: $CURL_CMD_ADD_EXPENSE_RENT" >> "$LOG_FILE"
eval $CURL_CMD_ADD_EXPENSE_RENT >> "$LOG_FILE" 2>&1

echo "Executing: $CURL_CMD_ADD_EXPENSE_CAR_INSURANCE" >> "$LOG_FILE"
eval $CURL_CMD_ADD_EXPENSE_CAR_INSURANCE >> "$LOG_FILE" 2>&1

echo "Executing: $CURL_CMD_ADD_EXPENSE_ROGERS_MOBILE" >> "$LOG_FILE"
eval $CURL_CMD_ADD_EXPENSE_ROGERS_MOBILE >> "$LOG_FILE" 2>&1

echo "Executing: $CURL_CMD_ADD_EXPENSE_BELL_WIFI" >> "$LOG_FILE"
eval $CURL_CMD_ADD_EXPENSE_BELL_WIFI >> "$LOG_FILE" 2>&1

echo "Executing: $CURL_CMD_ADD_EXPENSE_YMCA" >> "$LOG_FILE"
eval $CURL_CMD_ADD_EXPENSE_YMCA >> "$LOG_FILE" 2>&1

echo "[$(date)] Cron Job completed" >> "$LOG_FILE"
