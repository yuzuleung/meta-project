import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

window.scrollTo = jest.fn();

beforeEach(() => {
  window.location.hash = '#/';
});

test('renders the Little Lemon hero heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', {
    level: 1,
    name: /little lemon/i,
  });
  expect(headingElement).toBeInTheDocument();
});

test('reservation button enables only after completion and shows invalid field errors', () => {
  window.location.hash = '#/reservations';
  render(<App />);

  const submitButton = screen.getByRole('button', {
    name: /confirm reservation/i,
  });

  expect(submitButton).toBeDisabled();

  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: 'Alex Chen' },
  });
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: 'invalid-email' },
  });
  fireEvent.change(screen.getByLabelText(/phone number/i), {
    target: { value: '+81 90 1234 5678' },
  });
  fireEvent.change(screen.getByLabelText(/guests/i), {
    target: { value: '2 guests' },
  });
  fireEvent.change(screen.getByLabelText(/^date$/i), {
    target: { value: '2026-03-21' },
  });
  fireEvent.change(screen.getByLabelText(/^time$/i), {
    target: { value: '19:00' },
  });
  fireEvent.change(screen.getByLabelText(/seating preference/i), {
    target: { value: 'Indoor dining room' },
  });
  fireEvent.change(screen.getByLabelText(/special requests/i), {
    target: { value: 'Window seat please.' },
  });

  expect(submitButton).toBeEnabled();

  fireEvent.click(submitButton);

  expect(
    screen.getByText(/please enter a valid email address/i)
  ).toBeInTheDocument();
});
