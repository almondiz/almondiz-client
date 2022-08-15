import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import { Provider } from 'react-redux';
import ButtomNav from './components/bottom-nav';

import './index.scss';
import './color.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/*<App />*/}
      <div style={{ width: "50%", height: 2700, backgroundColor: "rgba(0, 255, 0, .5)" }}>
        <p style={{ fontSize: "2rem", fontWeight: 600 }}>안녕하세요</p>
      </div>
      <ButtomNav />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
