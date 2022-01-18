import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
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

const Chart = ({coinId}: ChartProps) => {

    const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId), {refetchInterval: 5000});

    return (
        <div style={{backgroundColor: "rgba(0, 0, 0, 0.5)", borderRadius: "10px"}}>
            {
                isLoading ? "Loading..."
                : 
                <ApexChart 
                type="line"
                series={[
                    {
                    name: "price",
                    data: data?.map(price => price.close)
                    },
                ]}
                options={{
                    theme:{
                    mode: "dark"
                    },
                    chart:{
                    height: 500,
                    width: 500,
                    toolbar:{
                        show: false
                    },
                    background: "transparent",
                    },
                    stroke: {
                    curve: "smooth",
                    width: 5,
                    },
                    grid: {
                    show: false
                    },
                    yaxis:{show: false},
                    xaxis:{
                    labels: {show: false},
                    axisTicks:{show: false},
                    axisBorder:{show: false},
                    type: "datetime",
                    categories: data?.map( price => price.time_close),
                    }, 
                    fill: {
                    type: "gradient",
                    gradient: {gradientToColors: ["#0be881"], stops:[0, 100]} 
                    },
                    colors: ["red"],
                    tooltip: {
                    y: {
                        formatter: (value) => `$ ${value.toFixed(3)}`,
                    }
                    }
                }} 
                />
            }
        </div>
    );
}

export default Chart;