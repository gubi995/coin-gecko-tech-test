import { useQuery } from 'react-query';

import { Coin } from 'types/Coin';

const fetchCoin = async (id: string) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/${id}`);
    const coin: Coin = await response.json();

    return coin;
  } catch (error) {
    console.error({ error });

    throw error;
  }
};

export const useCoin = (id: string) =>
  useQuery<Coin, Error>(['coins', id], () => fetchCoin(id));
