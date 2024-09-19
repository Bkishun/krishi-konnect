"use client";


export const SignOutButton = () => {
  const handleLogout = () => {
    // Clear all localStorage data (redux-persist stored data)
    localStorage.clear();

    // Redirect to the Auth0 logout route
    window.location.href = "/api/auth/logout";
  };

  return <button onClick={handleLogout}>Sign Out</button>;
};
