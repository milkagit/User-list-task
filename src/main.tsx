import ReactDOM from 'react-dom/client';
import App from './App.tsx';
// import './index.css'
import { Provider } from 'react-redux';
import store from './store';
import React from 'react';
import { ConfigProvider } from 'antd';
import type { ThemeConfig } from 'antd';

const customThemeTokens: ThemeConfig = {
  token: {
    colorPrimary: '#2b9ba6',
  },
  components: {
    Collapse: {
      colorBgContainer: "#F7F7F7",
      colorBorder: "#ffffff",
      colorFillAlter: '#e6eded',
    },
    Table: {
      headerBg: '#e6eded',
    }
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider theme={customThemeTokens}>
        <App />
      </ConfigProvider>
    </Provider>
  </React.StrictMode>,
);