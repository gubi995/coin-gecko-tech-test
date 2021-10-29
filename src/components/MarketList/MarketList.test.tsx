import { render, screen, waitFor } from 'test-utils/customRender';
import userEvent from '@testing-library/user-event';

import { Market } from 'types/Market';
import * as RoutePaths from 'constants/RoutePaths';

import MarketList from './MarketList';

const MOCK_MARKETS_PAGE1: Array<Market> = [
  {
    id: 'bitcoin',
    current_price: 222,
    high_24h: 999,
    low_24h: 888,
    image: 'https://imagepath.com/bitcoin',
    symbol: 'BC',
  },
  {
    id: 'ethereum',
    current_price: 333,
    high_24h: 444,
    low_24h: 555,
    image: 'https://imagepath.com/ethereum',
    symbol: 'ER',
  },
];

const MOCK_MARKETS_PAGE2: Array<Market> = [
  {
    id: 'dogecoin',
    current_price: 222,
    high_24h: 999,
    low_24h: 888,
    image: 'https://imagepath.com/dogecoin',
    symbol: 'BC',
  },
];

// Pagination
const fetchApi = jest.spyOn(global, 'fetch').mockImplementation((requestInfo) =>
  Promise.resolve({
    json: () => {
      const isFirstPage = requestInfo.toString().endsWith('page=1');

      return isFirstPage
        ? Promise.resolve(MOCK_MARKETS_PAGE1)
        : Promise.resolve(MOCK_MARKETS_PAGE2);
    },
  } as any)
);

describe('client is waiting for the response', () => {
  test('should show loading indicator', () => {
    render(<MarketList />);

    const loadingIndicator = screen.getByRole('progressbar');

    expect(loadingIndicator).toBeInTheDocument();
  });
});

describe('server respond with an error response', () => {
  test('should render the error message is provided', async () => {
    fetchApi.mockImplementationOnce(() =>
      Promise.reject({
        message: 'Server error',
      } as any)
    );

    render(<MarketList />);

    const errorTitle = await screen.findByText(
      /Sorry! We ran into a problem during data fetching/i
    );
    const errorDescription = await screen.findByText(/Server error/i);

    expect(errorTitle).toBeInTheDocument();
    expect(errorDescription).toBeInTheDocument();
  });

  test('should render the default error message', async () => {
    fetchApi.mockImplementationOnce(() => Promise.reject({} as any));

    render(<MarketList />);

    const errorTitle = await screen.findByText(
      /Sorry! We ran into a problem during data fetching/i
    );
    const errorDescription = await screen.findByText(/Unknown error/i);

    expect(errorTitle).toBeInTheDocument();
    expect(errorDescription).toBeInTheDocument();
  });
});

describe('server respond with a success response', () => {
  test('should list items to be rendered', async () => {
    render(<MarketList />);

    const listItems = await screen.findAllByRole('link');

    expect(listItems.length).toBe(MOCK_MARKETS_PAGE1.length);
  });

  test('should navigate to coin page', async () => {
    render(<MarketList />);

    const [firstListItem] = await screen.findAllByRole('link');

    firstListItem.click();

    const urlAfterNavigation = `${RoutePaths.COIN.replace(
      ':id',
      MOCK_MARKETS_PAGE1[0].id
    )}`;

    expect(window.location.pathname).toBe(urlAfterNavigation);
  });

  test('should pagination work', async () => {
    render(<MarketList />);

    const nextButton = await screen.findByText(/next/i);

    await waitFor(() => {
      userEvent.click(nextButton);
    });

    const secondPageListItems = await screen.findAllByRole('link');
    const dogeCoinItem = screen.getByText(/dogecoin/i);

    expect(secondPageListItems.length).toBe(MOCK_MARKETS_PAGE2.length);
    expect(dogeCoinItem).toBeInTheDocument();

    const previousButton = screen.getByText(/previous/i);

    await waitFor(() => {
      userEvent.click(previousButton);
    });

    const firstPageListItems = await screen.findAllByRole('link');
    const bitCoinItem = screen.getByText(/bitcoin/i);
    const ethereumItem = screen.getByText(/ethereum/i);

    expect(firstPageListItems.length).toBe(MOCK_MARKETS_PAGE1.length);
    expect(bitCoinItem).toBeInTheDocument();
    expect(ethereumItem).toBeInTheDocument();
  });
});
