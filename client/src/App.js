import React from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import LandingPage from './components/LandingPage/landing-page';
import Welcome from './components/Welcome/welcome';
import UserDrawer from './components/UserDrawer/user-drawer';
import WorkoutPage from './components/WorkoutPage/workout-page';
import UserWorkoutPage from './components/UserWorkoutsPage/user-workout-page';
import SignupNotification from './components/Notification/signup-notification';
import UsersAnalyticsPage from './components/Analytics/Users/analytics-page';
import SingleUserAnalyticsPage from './components/Analytics/User/analytics-page';


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
          <div className='settings-drawer-wrapper'>
            <UserDrawer />
          </div>
          <div id='alert-this'>
            <SignupNotification />
          </div>
          <Routes>
            <Route path='/analytics/user' element={<SingleUserAnalyticsPage />} />
            <Route path='/analytics' element={<UsersAnalyticsPage />} />
            <Route path='/welcome' element={<Welcome />} />
            <Route path="/userworkouts/:id" element={<WorkoutPage />} />
            <Route path="/userworkouts" element={<UserWorkoutPage />} />
            <Route path='/' element={<LandingPage />} />
          </Routes>
        </>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
