FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Use gunicorn for production — Flask's built-in server isn't meant for real traffic
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 app:app