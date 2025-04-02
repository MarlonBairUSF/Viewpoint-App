import React from 'react';
import { useAuth } from '../contexts/AuthContext';

function Login() {
  const { user, signInWithGoogle, signOut } = useAuth();

  return (
    <div className="login-container">
      {user ? (
        <div>
          <span>Welcome, {user.displayName}!</span>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
}

export default Login; 