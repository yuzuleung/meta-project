import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

window.scrollTo = jest.fn();

beforeEach(() => {
  window.location.hash = '#/';
  window.fetchAPI = jest.fn((date) => {
    const isoDate = date.toISOString().slice(0, 10);

    if (isoDate === '2026-03-21') {
      return ['17:30', '19:00', '20:30'];
    }

    if (isoDate === '2026-03-22') {
      return ['18:00'];
    }

    return [];
  });
  window.submitAPI = jest.fn(() => true);
});

afterEach(() => {
  delete window.fetchAPI;
  delete window.submitAPI;
});

test('renders the Little Lemon hero heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', {
    level: 1,
    name: /little lemon/i,
  });
  expect(headingElement).toBeInTheDocument();
});

test('loads available times from the API based on the selected date', () => {
  window.location.hash = '#/reservations';
  render(<App />);

  const timeSelect = screen.getByLabelText(/^time$/i);
  expect(timeSelect).toBeDisabled();

  fireEvent.change(screen.getByLabelText(/^date$/i), {
    target: { value: '2026-03-21' },
  });

  expect(window.fetchAPI).toHaveBeenCalled();
  expect(screen.getByRole('option', { name: '17:30' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: '19:00' })).toBeInTheDocument();
  expect(timeSelect).not.toBeDisabled();
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

test('submits the reservation through the API and navigates to confirmation page', () => {
  window.location.hash = '#/reservations';
  render(<App />);

  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: 'Alex Chen' },
  });
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: 'alex@example.com' },
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
    target: { value: 'None' },
  });

  fireEvent.click(
    screen.getByRole('button', {
      name: /confirm reservation/i,
    })
  );

  expect(window.submitAPI).toHaveBeenCalledWith({
    fullName: 'Alex Chen',
    email: 'alex@example.com',
    phone: '+81 90 1234 5678',
    guests: '2 guests',
    date: '2026-03-21',
    time: '19:00',
    seating: 'Indoor dining room',
    requests: 'None',
  });
  expect(
    screen.getByRole('heading', { name: /your reservation is confirmed/i })
  ).toBeInTheDocument();
  expect(window.location.hash).toBe('#/confirmed-booking');
});
