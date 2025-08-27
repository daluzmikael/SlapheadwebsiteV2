# Use Python base image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

# Copy backend code
COPY . .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Run app
CMD ["python", "main.py"]

