import React from "react";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import styled from "styled-components"
import { Helmet } from "react-helmet"
import { Link } from "react-router-dom";

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean
    is_active: boolean
    type: string;
}
//console.log 나 api 제공해주는 홈페이지에서 파람값 확인 

const Coins = () => {

    const { isLoading, data } = useQuery<CoinInterface[]>("allCoins", fetchCoins);
    

    return (
        <Container>
            <Header>
                <Helmet>
                    <title>
                        coin
                    </title>
                </Helmet>
            </Header>
            { 
                isLoading ? <Loader>Loading...</Loader> 
                : 
                <CoinList>
                    {
                        data?.slice(0, 100).map(item => (
                            <Coin key={item.id} >
                                <Link to={`/${item.id}`} state={{name: item.name}}>
                                    <Img src={`https://cryptoicon-api.vercel.app/api/icon/${item.symbol.toLowerCase()}`} />
                                    {item.name} &rarr;
                                </Link>
                            </Coin>
                        ))
                    }
                </CoinList>
            }
        </Container>
    );
}

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;

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
`;

const CoinList = styled.ul``;

const Coin = styled.li`
    background-color: ${props => props.theme.cardColor};
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    padding: 20px;
    border-radius: 15px;
    a{
        padding: 20px;
        transition: color 0.2s ease-in;
        display: flex;
        align-items: center;
    }
    &:hover{
        a{
            color: ${props => props.theme.accentColor};
        }   
    }
`;

const Title = styled.h1`
    color: ${props => props.theme.accentColor};
    font-size: 48px;
`

export default Coins;
