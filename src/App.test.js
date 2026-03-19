import { render, screen } from '@testing-library/react';
import App from './App';

window.scrollTo = jest.fn();

test('renders the Little Lemon hero heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', {
    level: 1,
    name: /little lemon/i,
  });
  expect(headingElement).toBeInTheDocument();
});
