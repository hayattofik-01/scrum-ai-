#!/bin/bash

# ScrumAI Dependency Checker ("Doctor")
# This script verifies that all required services are reachable before running the backend.

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}ScrumAI System Check...${NC}"
echo "---------------------------------"

# 1. Check MongoDB (Default port 27017)
echo -n "Checking MongoDB (port 27017)... "
if nc -z localhost 27017 2>/dev/null; then
    echo -e "${GREEN}RUNNING${NC}"
else
    echo -e "${RED}NOT FOUND${NC}"
    echo -e "  ${YELLOW}Tip: Run 'brew services start mongodb-community@7.0' or use Docker.${NC}"
fi

# 2. Check Redis (Default port 6379)
echo -n "Checking Redis (port 6379)... "
if nc -z localhost 6379 2>/dev/null; then
    echo -e "${GREEN}RUNNING${NC}"
else
    echo -e "${RED}NOT FOUND${NC}"
    echo -e "  ${YELLOW}Tip: Run 'brew services start redis' or use Docker.${NC}"
fi

# 3. Check RabbitMQ (Default port 5672)
echo -n "Checking RabbitMQ (port 5672)... "
if nc -z localhost 5672 2>/dev/null; then
    echo -e "${GREEN}RUNNING${NC}"
else
    echo -e "${RED}NOT FOUND${NC}"
    echo -e "  ${YELLOW}Tip: Run 'brew services start rabbitmq' or use Docker.${NC}"
fi

echo "---------------------------------"
echo -e "${YELLOW}Recommendation:${NC}"
echo "To avoid all connection issues, use the Docker command:"
echo -e "${GREEN}docker-compose up --build${NC}"
