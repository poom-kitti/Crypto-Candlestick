# Crypto-Candlestick
A simple web application that utilizes Binance API to plot a candlestick graph of an input cryptocurrency symbol over the past week.

### Details
- API is served via FastAPI
- Web application is developed with React framework

### Usage
1. Clone the project repository into a directory
2. Access the project directory in terminal
3. Run the command `docker compose build`
4. Run the command `docker compose up`
5. Access the web application through entering `http://localhost:3000` from any browser 

### Cleanup
1. In the terminal, stop the docker containers by using `Ctrl+C`
2. Run the command `docker compose down` to remove the containers

### Regarding API
The FastAPI will serve endpoint in `localhost:8000`. The only endpoint available is `/candlestick` and require a parameter `symbol` which is the symbol of the cryptocurrency 
we want to get the candlestick prices of (OPEN, HIGH, LOW, CLOSE).
