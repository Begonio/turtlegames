import React from 'react';
import { useAuth } from '@frontegg/react'

function App() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className='App'>
      {isAuthenticated && (
        <div>
          <img src={user.profilePictureUrl} alt={user.name} />
          <span>{user.name}</span>
        </div>
      )}
    </div>
  );
}

export default App;