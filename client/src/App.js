import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

import LandingPage from './components/LandingPage/landing-page';
import Welcome from './components/Welcome/welcome';
import StatisticsPage from './components/StatisticsPage/statistics-page';
import SettingsPage from './components/SettingsPage/settings-page';

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

  let  { params } = useParams();

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <>
          <div className='settings-drawer-wrapper'>
            <SettingsPage />
          </div>
          <Routes>
            <Route path='/statistics/:params' element={<StatisticsPage />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path='/' element={<LandingPage />} />
          </Routes>
        </>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
