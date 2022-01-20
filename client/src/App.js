import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage/landing-page';
import SettingsPage from './components/SettingsPage/settings-page';
import StatisticsPage from './components/StatisticsPage/statistics-page';

import './App.css';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/settings' element={<SettingsPage />} />
            <Route path='/statistics' element={<StatisticsPage />} />
          </Routes>
        </>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
