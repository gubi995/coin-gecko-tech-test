import { useQuery } from 'react-query';

import { API_URL } from 'constants/API';
import { Market } from 'types/Market';

const fetchMarkets = async (page: number) => {
  try {
    const params = new URLSearchParams();
    params.set('vs_currency', 'eur');
    params.set('order', 'market_cap_desc');
    params.set('per_page', '10');
    params.set('page', `${page}`);

    const response = await fetch(`${API_URL}/markets?${params.toString()}`);
    const markets: Array<Market> = await response.json();

    return markets;
  } catch (error) {
    throw error;
  }
};

export const useMarkets = (page: number) =>
  useQuery<Array<Market>, Error>(['markets', page], () => fetchMarkets(page), {
    keepPreviousData: true,
  });
