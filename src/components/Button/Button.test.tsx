import { render, screen } from '@testing-library/react';

import Button from './Button';

test('should render with default style', () => {
  render(<Button>Submit</Button>);

  const button = screen.getByText(/submit/i);

  expect(button).toHaveClass('component');
});

test('should render with additional style', () => {
  render(<Button className="test">Submit</Button>);

  const button = screen.getByText(/submit/i);

  expect(button).toHaveClass('component', 'test');
});
