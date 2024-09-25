import React, { useState, useEffect } from 'react';
import { fetchUserProfile } from '../utils/api';  // Import Axios function

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfile = async () => {
      const token = localStorage.getItem('token');  // Get token from localStorage
      try {
        const userProfile = await fetchUserProfile(token);
        setProfile(userProfile);
      } catch (err) {
        setError(err);
      }
    };

    getProfile();
  }, []);

  if (error) return <p>Error fetching profile: {error.message}</p>;
  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h1>Welcome, {profile.username}</h1>
      <p>Email: {profile.email}</p>
    </div>
  );
};

export default UserProfile;
