import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export const useScrollToTop = () => {
  const { location } = useHistory();

  useEffect(() => {
    window.document.body.scrollTo({ top: 0 });
  }, [location]);
};
