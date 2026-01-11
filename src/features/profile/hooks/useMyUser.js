import { useEffect, useState } from "react";
import { getUserByEmail } from "../../../services/userService";
import { loadAuthFromStorage } from "../../../storage/authStorage";

export function useMyUser() {
  const { email } = loadAuthFromStorage(); // o si aún no lo tienes, lo adaptamos

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!email) return;

    let cancelled = false;
    setLoading(true);
    setError(null);

    getUserByEmail(email)
      .then((data) => {
        if (!cancelled) setUser(data);
      })
      .catch((err) => {
        if (!cancelled) setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [email]);

  return { user, loading, error };
}
