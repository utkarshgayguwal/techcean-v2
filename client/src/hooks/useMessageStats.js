import { useState, useEffect } from 'react';
import { getMessageStats } from '../api/contact';

export const useMessageStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getMessageStats();
        setStats(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const refresh = async () => {
    setLoading(true);
    try {
      const data = await getMessageStats();
      setStats(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { stats, loading, error, refresh };
};

export default useMessageStats;