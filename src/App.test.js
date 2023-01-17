import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App component', () => {
  render(<App />);
  
  expect(screen.getByText(/No Games Scheduled/i)).toBeInTheDocument();
  expect(screen.getByText(/California/i)).toBeInTheDocument();
});
