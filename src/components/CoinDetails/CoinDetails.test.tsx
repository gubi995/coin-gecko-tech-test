import { render, screen } from 'test-utils/customRender';
import userEvent from '@testing-library/user-event';

import * as RoutePaths from 'constants/RoutePaths';
import { Coin } from 'types/Coin';

import CoinDetails from './CoinDetails';

const MOCK_COIN: Coin = {
  id: 'Bitcoin',
  description: { en: 'Lorem' },
  hashing_algorithm: 'SHA256',
  links: { homepage: ['https://url.com'] },
  market_data: { current_price: { eur: 1234 } },
  symbol: 'Symbol',
};

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    id: 'bitcoin',
  }),
  useRouteMatch: () => ({ url: '/coins/bitcoin' }),
}));

const fetchApi = jest.spyOn(global, 'fetch').mockImplementation(() =>
  Promise.resolve({
    json: () => Promise.resolve(MOCK_COIN),
  } as any)
);

describe('client is waiting for the response', () => {
  test('should show loading indicators', () => {
    const FIELD_NUMBER = Object.keys(MOCK_COIN).length;

    render(<CoinDetails />);

    const loadingIndicators = screen.getAllByRole('progressbar');

    expect(loadingIndicators.length).toBe(FIELD_NUMBER);
  });
});

describe('server respond with an error response', () => {
  test('should render the error message is provided', async () => {
    fetchApi.mockImplementationOnce(() =>
      Promise.reject({
        message: 'Server error',
      } as any)
    );

    render(<CoinDetails />);

    const errorTitle = await screen.findByText(
      /Sorry! We ran into a problem during data fetching/i
    );
    const errorDescription = await screen.findByText(/Server error/i);

    expect(errorTitle).toBeInTheDocument();
    expect(errorDescription).toBeInTheDocument();
  });

  test('should render the default error message', async () => {
    fetchApi.mockImplementationOnce(() => Promise.reject({} as any));

    render(<CoinDetails />);

    const errorTitle = await screen.findByText(
      /Sorry! We ran into a problem during data fetching/i
    );
    const errorDescription = await screen.findByText(/Unknown error/i);

    expect(errorTitle).toBeInTheDocument();
    expect(errorDescription).toBeInTheDocument();
  });
});

describe('server respond with a success response', () => {
  test('should component render with proper data', async () => {
    render(<CoinDetails />);

    const name = await screen.findByText(MOCK_COIN.id);
    const description = await screen.findByText(MOCK_COIN.description.en);
    const hash = await screen.findByText(MOCK_COIN.hashing_algorithm);
    const link = await screen.findByText(MOCK_COIN.links.homepage[0]);
    const price = await screen.findByText(
      MOCK_COIN.market_data.current_price.eur
    );
    const symbol = await screen.findByText(MOCK_COIN.symbol);

    expect(name).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(hash).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(symbol).toBeInTheDocument();
  });

  test('should navigate on back button click', async () => {
    render(<CoinDetails />);

    const backButton = await screen.findByText(/back/i);

    userEvent.click(backButton);

    expect(window.location.pathname).toBe(RoutePaths.MARKETS);
  });
});
