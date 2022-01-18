
# useQuery를 이용한 서버 통신

> useQuery는 npm 사이트에서 이슈도 많이 없고, 서버통신을 통해 받은 data를 캐시에 저장해주는 큰 장점이있다. 캐시에 저장된 데이터는 5분후 자동 삭제된다. isLoading을 지원해주기 때문에, 로딩을 알려줘야할 경우 아주 유용하다.


<br />

> npm으로 설치 해준다

<br/>

```
    npm install react-query
```

<br />

> index.js에서 QueryClientProvider로 감싸준다.

<br />

```
    import { QueryClient, QueryClientProvider } from 'react-query';

    const queryClient = new QueryClient();

    ReactDOM.render(
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    document.getElementById('root')
    );
```

<br />

> App.js에서 옵션으로 ReactQueryDevtools을 셋팅해주면, 서버통신하는 데이터를 편하게 볼 수있다. App.js말고 index.js에서 한번에 처리해도 가능하다.

<br />

```
    import { ReactQueryDevtools } from "react-query/devtools";

    function App() {

        return (
            <>
                <Router/>
                <ReactQueryDevtools initialIsOpen={true} />
            </>
        );
    }
```

## api 통신

<br />

> api.js 파일을 만들어서 모든 서버 통신을 함수형으로 만들어 놓는다. 필요한 컴포넌트에서 import 시켜서 사용한다. 

<br />

```
    const BASE_URL = "https://api.coinpaprika.com/v1";

    export function fetchCoins(){
        return fetch(`${BASE_URL}/coins`).then(res => res.json());
        
    }

    export function fetchCoinInfo(coinId: string){
        return fetch(`${BASE_URL}/coins/${coinId}`).then(res => res.json());
    }

```

<br />

3. 컴포넌트에서 api통신의 결과물 불러오기 

<br />

> 컴포넌트에서 useQuery를 이용하여 api.js에서 만들었던 서버통신 함수의 결과를 불러와서 데이터 바인딩하면 된다.

<br />

```
    import { useQuery } from "react-query";

    const Coin = () => {

        const { coinId } = useParams(); 
    
        const { state } = useLocation();
        
        const { isLoading, data } = useQuery("allCoins", fetchCoins)
        //파라미터로 앞에 이름은 유니크한 키 값주고, 뒤에는 export 시킨 함수 이름 

        const { isLoading: infoLoading, data: infoData } = 
            useQuery(["info", coinId], 
            () => fetchCoinInfo(coinId)); 

        //react-query가 고유한 키값을 배열로 받기 떄문에 저런식으로 쓰는것도 가능 coinId는 너무 중복이라서 안좋음
        
        const { isLoading: tickersLoading, data: tickersData} = 
            useQuery(["tickers", coinId],
             () => fetchCoinTickers(coinId), {refetchInterval: 5000}); 
        
        //3번쨰 파라미터를 넣어서 기능 조절 가능, 여기선 5초마다 fetch하게 만듦

        const loading = infoLoading || tickersLoading;

        return (
            { 
                loading ? <Loader>Loading...</Loader> 
                : (
                    <>
                        ...
                    </>
                )
            }
        )
    }
```


> data에 결과값이 담겨있고, isLoading은 서버통신이 끝나기전까지 true이다가, 서버통신이 끝나서 data가 정의되면 false로 바뀐다. 

---
<br />

# react-hook-form 라이브러리 

input태그로 이뤄진 form 태그를 자유자재로 쉽게 컨트롤 할 수 있는 라이브러리. 
회원가입이 대표적인 예시이다. React_with_Recoil 레파지토리에서 사용했던 라이브러리인데, 리드미 파일이 너무 길어질까봐 여기에 정리

<br />

## npm 
> npm install react-hook-form

## 기본 설정

<br />

```
    const { register, watch, handleSubmit, formState:{ errors }, setError, setValue } = useForm<IForm>();

    //IForm은 typescript
```
<br />

> register => input에 필요한 함수들이 내장되있음. 파라미터 넣어주면 그 값을 value로 정의하고 onChange 쓸수있음

<br />

ex 
```
    <input {...register("pw", {required: "password is required"})} type="password" placeholder="pw"/>

    <input 
        {...register("email", {
            required: "is required", 
            minLength:{
                value: 5,
                message: "too short"
            },
            pattern: {
                value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                message: "only naver Email"
            }
        })} 
        placeholder="write a email"
    />
```
<br />


> watch => 여기서 register를 넣어준 input 태그의 변화를 관찰가능

<br />

ex
```
    console.log(watch());
```

<br />

> handleSubmit => preventDefault와 유효성 검사를 해준다

<br />

ex
```
     <form onSubmit={handleSubmit(onValid)}>

     const onValid () => {} //onSubmit함수 라고 생각하면 된다. 
```

<br />

> formstate => errors 처리를 한번에 보여준다. formState를 콘솔에 찎어보면 각 태그마다 type으로 어떤 에러인지 보여줌

<br />

ex
```
    <span>{errors?.email?.message}</span>
    //email 이라는 이름의 input 태그가 error가 발생해서 message가 출력되면 출력 시킨다. 
```

<br />

> setError => 에러를 발생 시킴 예를 들어 비밀번호랑 비번확인이 맞지 않을경우 setError로 오류 처리 시켜준다.

<br />

ex
```
     if(data.pw !== data.pw1){
            setError("pw1", {message: "pw are not the same"});
            //에러 를 발생시키고 싶은 input의 이름, 그리고 객체 형태로 메세지를 적어주면 된다 
            //비번과 비번확인이 맞지 않는 경우
     }
```

<br />

> setValue => submit이 이뤄지고 나서 인풋의 밸류값을 설정 할 수 있다. 

<br />

ex 
```
    setValue("UserName", "");
```