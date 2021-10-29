import { render, screen } from 'test-utils/customRender';

import { Market } from 'types/Market';

import MarketListItem from './MarketListItem';

const MARKET: Market = {
  id: 'bitcoin',
  current_price: 222,
  high_24h: 999,
  low_24h: 888,
  image: 'https://imagepath.com/image',
  symbol: 'B',
};

test('should render component with the provided data', () => {
  render(<MarketListItem market={MARKET} />);

  const name = screen.getByText(MARKET.id);
  const price = screen.getByText(new RegExp(`${MARKET.current_price}`));
  const high24 = screen.getByText(new RegExp(`${MARKET.high_24h}`));
  const low24 = screen.getByText(new RegExp(`${MARKET.low_24h}`));
  const image = screen.getByRole('link');
  const symbol = screen.getByText(new RegExp(`${MARKET.symbol}`));

  expect(name).toBeInTheDocument();
  expect(price).toBeInTheDocument();
  expect(high24).toBeInTheDocument();
  expect(low24).toBeInTheDocument();
  expect(image).toBeInTheDocument();
  expect(symbol).toBeInTheDocument();
});
