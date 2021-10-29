import { render, screen } from '@testing-library/react';

import Skeleton from './Skeleton';

test('should show skeleton when the component is loading', () => {
  render(
    <Skeleton isLoading>
      <span>Text</span>
    </Skeleton>
  );

  const loading = screen.getByRole('progressbar');
  const text = screen.queryByText(/text/i);

  expect(loading).toBeInTheDocument();
  expect(text).not.toBeInTheDocument();
});

test('should show text when the component is not loading', () => {
  render(
    <Skeleton isLoading={false}>
      <span>Text</span>
    </Skeleton>
  );

  const loading = screen.queryByRole('progressbar');
  const text = screen.getByText(/text/i);

  expect(loading).not.toBeInTheDocument();
  expect(text).toBeInTheDocument();
});
