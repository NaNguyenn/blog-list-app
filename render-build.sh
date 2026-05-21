#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
npm install --prefix client
npm install --prefix server

# Build the project
npm run build
