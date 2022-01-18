import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ThemeProvider } from "styled-components";
import { theme, darkTheme } from "./theme";
import { QueryClient, QueryClientProvider } from 'react-query';
import { createGlobalStyle } from 'styled-components';
import { ReactQueryDevtools } from "react-query/devtools"
import { RecoilRoot, useRecoilValue } from 'recoil';
import { darkMode } from './atom';

const queryClient = new QueryClient();



ReactDOM.render(
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
          <App />
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
      </QueryClientProvider>
    </ThemeProvider>
  </RecoilRoot>,
  document.getElementById('root')
);


