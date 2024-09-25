import React from 'react';
import AuthForm from './components/AuthForm';  // Import AuthForm component
import UserProfile from './components/UserProfile';  // Import UserProfile component

const App = () => {
  return (
    <div>
      <h1>User Authentication</h1>
      <AuthForm />
      <UserProfile />
    </div>
  );
};

export default App;
