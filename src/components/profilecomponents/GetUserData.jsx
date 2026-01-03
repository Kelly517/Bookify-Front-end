import React, { useEffect, useState } from 'react'
import axios from 'axios';

export function useUserData (email) {
  const [ user, setUser ] = useState(null);
  const [ loading, setLoading ] = useState(null);
  const [ error, setError ] = useState(null);

  useEffect(() => {
    if(!email) return;
    let cancelled = false;
    setLoading(true);

    axios.get(
      `http://localhost:8080/api/bookify/users/${encodeURIComponent(email)}`)
      .then(res => {
        if(!cancelled) {
          setUser(res.data);
          setError(null);
        }
      })
      .catch(err => {
        if(!cancelled) setError(err);
      })
      .finally(() => {
        if(!cancelled) setLoading(false);
      });
      return () => {
        cancelled = true;
      }
  }, [email]);

  return { user, loading, error };
}