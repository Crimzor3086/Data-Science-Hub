#!/bin/bash

# Install frontend dependencies
cd frontend
npm install

# Build frontend
npm run build

# Install backend dependencies
cd ..
pip install -r requirements.txt

# Run the application
python app.py 