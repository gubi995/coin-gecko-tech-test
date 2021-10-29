import { render, RenderOptions } from '@testing-library/react';
import { FC, ReactElement } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

const AllTheProviders: FC = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>{children}</Router>
    </QueryClientProvider>
  );
};

const customRender = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
