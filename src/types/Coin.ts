export interface Coin {
  id: string;
  symbol: string;
  hashing_algorithm: string;
  description: {
    en: string;
  };
  market_data: {
    current_price: {
      eur: number;
    };
  };
  links: {
    homepage: Array<string>;
  };
}
