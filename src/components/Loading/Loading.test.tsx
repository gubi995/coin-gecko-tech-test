import { render, screen } from '@testing-library/react';

import Loading from './Loading';

test('should render with default style', () => {
  render(<Loading />);

  const loading = screen.getByRole('progressbar');

  expect(loading).toHaveClass('component');
});

test('should render with additional style', () => {
  render(<Loading className="test" />);

  const loading = screen.getByRole('progressbar');

  expect(loading).toHaveClass('component', 'test');
});
