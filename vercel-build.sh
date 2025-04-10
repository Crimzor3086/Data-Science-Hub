#!/bin/bash

# Install frontend dependencies
cd frontend
npm install

# Build frontend
npm run vercel-build

# Install backend dependencies
cd ..
pip install -r requirements.txt 