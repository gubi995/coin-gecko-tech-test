import { render, screen } from '@testing-library/react';

import ErrorCard from './ErrorCard';

test('should render the title and the description', () => {
  const props = { title: 'Title', description: 'Description' };

  render(<ErrorCard {...props} />);

  const title = screen.getByText(/title/i);
  const description = screen.getByText(/description/i);

  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});
