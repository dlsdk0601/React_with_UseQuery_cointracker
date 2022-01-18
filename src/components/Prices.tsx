import React from "react";
import { fetchCoinHistory } from "../api";
import { useQuery } from "react-query";
import ApexChart from "react-apexcharts";

interface PriceProps {
    coinId: string;
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

const Prices = ({coinId} : PriceProps) => {

    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {refetchInterval: 5000});

    return (
        <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "10px"}}>
            {
                isLoading ? "Loading chart..." 
                : <ApexChart 
                    type="candlestick"
                    series={[
                    {
                        name: "price",
                        data: data?.map(price => {
                        return {
                            x: price.time_close,
                            y: [price.open.toFixed(3), price.high.toFixed(3), price.low.toFixed(3), price.close.toFixed(3)]
                        }
                        })
                    },
                    ]}
                    options={{
                    theme:{
                        mode: "dark"
                    },
                    chart:{
                        height: 500,
                        width: 500,
                        background: "transparent",
                    },
                    grid: {
                        show: false
                    },
                    yaxis:{show: false},
                    xaxis:{
                        labels: {show: false},
                        type: "datetime",
                        categories: data?.map( price => price.time_close),
                    }, 
                    tooltip: {
                        enabled: true
                    }
                    }} 
                />
            }
        </div>
    );
}

export default Prices;
