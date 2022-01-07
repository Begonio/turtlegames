import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

import { FronteggProvider } from '@frontegg/react';

const contextOptions = {
  baseUrl: 'https://app-xtotye1zo6o0.frontegg.com',
};

ReactDOM.render(
  <FronteggProvider contextOptions={contextOptions}>
    <App />
  </FronteggProvider>,
  document.getElementById('root')
);