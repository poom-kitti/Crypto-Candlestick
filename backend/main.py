from fastapi import FastAPI, Response, status
from fastapi.middleware.cors import CORSMiddleware
import requests, json

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def index():
    return "Hello, this is an API to get the candlestick of a cryptocurrency in the past week"

@app.get('/candlestick', status_code=200)
def get_candlestick(symbol: str, response: Response):
    binance_url = "https://api.binance.com/api/v3/klines"
    payload = {
        "symbol": symbol.upper() + "BUSD",
        "interval": "1d",
        "limit": 7
    }
    r = requests.get(binance_url, params=payload)
    if r.status_code != 200:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "isOK": False,
            "message": "Cannot find the requested symbol"
        }

    r_content = json.loads(r.text)
    acc_data = []
    for data in r_content:
        acc_data.append({
            "open_time": data[0],
            "close_time": data[6],
            "OPEN": data[1],
            "HIGH": data[2],
            "LOW": data[3],
            "CLOSE": data[4]
        })
    result = {
        "isOK": True,
        "symbol": symbol.upper(),
        "interval": "1 day",
        "duration": "1 week",
        "data": acc_data
    }
    return result