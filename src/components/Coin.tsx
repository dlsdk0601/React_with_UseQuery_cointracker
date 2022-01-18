import React from "react";
import { useQuery } from "react-query";
import { useLocation, useMatch, useParams, Link, Routes, Route } from "react-router-dom";
import { fetchCoinInfo, fetchCoinTickers } from "../api";
import styled from "styled-components"
import { Helmet } from "react-helmet";
import Chart from "./Chart";
import Prices from "./Prices";

type Params = {
    coinId: string | undefined;
}

// type  변수 
// interface 컴포넌트에 props로 전달받은 애를 위주로. 확장성이 더 좋음 

interface RouteState {
    state: {
        name: string;
    }
}

interface InfoData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD:{
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d:  number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        }
    };
}

const Coin = () => {

    // const { coinId } = useParams<Params>(); // ?????
    const { coinId } = useParams<Readonly<Params>>(); // Readonly => 수정을 안하는 조건으로 사용 
    const { state } = useLocation() as RouteState;
    
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(["info", coinId], () => fetchCoinInfo(coinId||''))
    const { isLoading: tickersLoading, data: tickersData } = useQuery<PriceData>(["tickers", coinId], () => fetchCoinTickers(coinId||""), { refetchInterval: 5000});

    const loading = infoLoading || tickersLoading;

    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <Link to="/">
                    <Arrow>&larr;</Arrow>
                </Link>
                <Title>
                    {loading ? "Loading..." : infoData?.name}
                </Title>
            </Header>
            {
                loading ? <Loader>Loading...</Loader>
                : (<>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol</span>
                            <span>$ {infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>{tickersData && tickersData.quotes.USD.price.toFixed(3)}</span>
                        </OverviewItem>
                    </Overview>

                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>

                    <Routes>
                        <Route path={"price"} element={<Prices coinId={coinId || ""} />} />
                        <Route path={"chart"} element={<Chart coinId={coinId || ""} />} />
                    </Routes>
                </>)
            }
        </Container>
    );
}

const Arrow = styled.span`
    display: block;
    position: absolute;
    left: 0;
    top: 50%;
    transform: translate(0, -50%);
`

const Loader = styled.p`
    text-align: center;
`;

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`
const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

const Title = styled.h1`
    color: ${props => props.theme.accentColor};
    font-size: 48px;
    text-align: center;
`
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

export default Coin;
