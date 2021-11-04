import { useQuery } from 'react-query';

import { API_URL } from 'constants/API';
import { Coin } from 'types/Coin';

const fetchCoin = async (id: string) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const coin: Coin = await response.json();

    return coin;
  } catch (error) {
    throw error;
  }
};

export const useCoin = (id: string) =>
  useQuery<Coin, Error>(['coins', id], () => fetchCoin(id));
