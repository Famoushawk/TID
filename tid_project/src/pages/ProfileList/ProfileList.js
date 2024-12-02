import React, { useEffect, useState } from "react";
import { fetchData } from "../../api/client";

const ProfileList = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProfiles = async () => {
      try {
        const data = await fetchData("/classes/Profile");
        setProfiles(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getProfiles();
  }, []);

  if (loading) return <div>Loading profiles...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>Profiles</h1>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.objectId}>{profile.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileList;
