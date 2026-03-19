import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

window.scrollTo = jest.fn();

const getDateInput = () => document.getElementById('date');
const getTimeSelect = () => document.getElementById('time');

const fillBaseReservationForm = () => {
  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: 'Alex Chen' },
  });
  fireEvent.change(screen.getByLabelText(/^email$/i), {
    target: { value: 'alex@example.com' },
  });
  fireEvent.change(screen.getByLabelText(/phone number/i), {
    target: { value: '09012345678' },
  });
  fireEvent.change(screen.getByLabelText(/guests/i), {
    target: { value: '2 guests' },
  });
  fireEvent.change(screen.getByLabelText(/seating preference/i), {
    target: { value: 'Indoor dining room' },
  });
};

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
  expect(
    screen.getByRole('heading', {
      level: 1,
      name: /little lemon/i,
    })
  ).toBeInTheDocument();
});

test('loads available times from the API based on the selected date', () => {
  window.location.hash = '#/reservations';
  render(<App />);

  const timeSelect = getTimeSelect();
  expect(timeSelect).toBeDisabled();

  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-21' },
  });

  expect(window.fetchAPI).toHaveBeenCalled();
  expect(screen.getByRole('option', { name: '17:30' })).toBeInTheDocument();
  expect(screen.getByRole('option', { name: '19:00' })).toBeInTheDocument();
  expect(timeSelect).not.toBeDisabled();
});

test('date input does not allow selecting a past date', () => {
  window.location.hash = '#/reservations';
  render(<App />);

  const dateInput = getDateInput();
  const today = new Date();
  const expectedMin = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  expect(dateInput).toHaveAttribute('min', expectedMin);
});

test('shows no times available when the API returns an empty list', () => {
  window.location.hash = '#/reservations';
  render(<App />);

  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-25' },
  });

  expect(getTimeSelect()).toBeDisabled();
  expect(
    screen.getByRole('option', { name: /no times available/i })
  ).toBeInTheDocument();
});

test('replaces previous time options when the selected date changes', () => {
  window.location.hash = '#/reservations';
  render(<App />);

  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-21' },
  });
  expect(screen.getByRole('option', { name: '19:00' })).toBeInTheDocument();

  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-22' },
  });

  expect(screen.getByRole('option', { name: '18:00' })).toBeInTheDocument();
  expect(screen.queryByRole('option', { name: '19:00' })).not.toBeInTheDocument();
});

test('clears the selected time when it becomes unavailable after changing the date', () => {
  window.location.hash = '#/reservations';
  render(<App />);

  const timeSelect = getTimeSelect();

  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-21' },
  });
  fireEvent.change(timeSelect, {
    target: { value: '19:00' },
  });
  expect(timeSelect).toHaveValue('19:00');

  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-22' },
  });

  expect(timeSelect).toHaveValue('');
});

test('shows an error when the name contains numbers or symbols', () => {
  window.location.hash = '#/reservations';
  render(<App />);

  fillBaseReservationForm();
  fireEvent.change(screen.getByLabelText(/full name/i), {
    target: { value: 'Alex123!' },
  });
  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-21' },
  });
  fireEvent.change(getTimeSelect(), {
    target: { value: '19:00' },
  });

  fireEvent.click(
    screen.getByRole('button', {
      name: /confirm reservation/i,
    })
  );

  expect(
    screen.getByText(/name can only contain letters and spaces/i)
  ).toBeInTheDocument();
});

test('shows an error when the phone number is not exactly 11 digits', () => {
  window.location.hash = '#/reservations';
  render(<App />);

  fillBaseReservationForm();
  fireEvent.change(screen.getByLabelText(/phone number/i), {
    target: { value: '09012-3456' },
  });
  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-21' },
  });
  fireEvent.change(getTimeSelect(), {
    target: { value: '19:00' },
  });

  fireEvent.click(
    screen.getByRole('button', {
      name: /confirm reservation/i,
    })
  );

  expect(
    screen.getByText(/phone number must contain exactly 11 digits/i)
  ).toBeInTheDocument();
});

test('special requests is optional and the form can submit without it', () => {
  window.location.hash = '#/reservations';
  render(<App />);

  fillBaseReservationForm();
  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-21' },
  });
  fireEvent.change(getTimeSelect(), {
    target: { value: '19:00' },
  });

  const submitButton = screen.getByRole('button', {
    name: /confirm reservation/i,
  });

  expect(submitButton).toBeEnabled();
  fireEvent.click(submitButton);

  expect(window.submitAPI).toHaveBeenCalledWith({
    fullName: 'Alex Chen',
    email: 'alex@example.com',
    phone: '09012345678',
    guests: '2 guests',
    date: '2026-03-21',
    time: '19:00',
    seating: 'Indoor dining room',
    requests: '',
  });
  expect(
    screen.getByRole('heading', { name: /your reservation is confirmed/i })
  ).toBeInTheDocument();
});

test('reservation button enables only after required fields are completed and shows invalid field errors', () => {
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
    target: { value: '09012345678' },
  });
  fireEvent.change(screen.getByLabelText(/guests/i), {
    target: { value: '2 guests' },
  });
  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-21' },
  });
  fireEvent.change(getTimeSelect(), {
    target: { value: '19:00' },
  });
  fireEvent.change(screen.getByLabelText(/seating preference/i), {
    target: { value: 'Indoor dining room' },
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

  fillBaseReservationForm();
  fireEvent.change(screen.getByLabelText(/special requests/i), {
    target: { value: 'Window seat please.' },
  });
  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-21' },
  });
  fireEvent.change(getTimeSelect(), {
    target: { value: '19:00' },
  });

  fireEvent.click(
    screen.getByRole('button', {
      name: /confirm reservation/i,
    })
  );

  expect(window.submitAPI).toHaveBeenCalledWith({
    fullName: 'Alex Chen',
    email: 'alex@example.com',
    phone: '09012345678',
    guests: '2 guests',
    date: '2026-03-21',
    time: '19:00',
    seating: 'Indoor dining room',
    requests: 'Window seat please.',
  });
  expect(
    screen.getByRole('heading', { name: /your reservation is confirmed/i })
  ).toBeInTheDocument();
  expect(window.location.hash).toBe('#/confirmed-booking');
});

test('shows an error and does not navigate when submitAPI returns false', () => {
  window.location.hash = '#/reservations';
  window.submitAPI = jest.fn(() => false);
  render(<App />);

  fillBaseReservationForm();
  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-21' },
  });
  fireEvent.change(getTimeSelect(), {
    target: { value: '19:00' },
  });

  fireEvent.click(
    screen.getByRole('button', {
      name: /confirm reservation/i,
    })
  );

  expect(window.submitAPI).toHaveBeenCalled();
  expect(window.location.hash).toBe('#/reservations');
  expect(
    screen.getByText(
      /we could not complete your reservation\. please choose another time and try again\./i
    )
  ).toBeInTheDocument();
});

test('falls back safely when fetchAPI is unavailable', () => {
  window.location.hash = '#/reservations';
  delete window.fetchAPI;
  render(<App />);

  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-21' },
  });

  expect(getTimeSelect()).toBeDisabled();
  expect(
    screen.getByRole('option', { name: /no times available/i })
  ).toBeInTheDocument();
});

test('falls back safely when submitAPI is unavailable', () => {
  window.location.hash = '#/reservations';
  delete window.submitAPI;
  render(<App />);

  fillBaseReservationForm();
  fireEvent.change(getDateInput(), {
    target: { value: '2026-03-21' },
  });
  fireEvent.change(getTimeSelect(), {
    target: { value: '19:00' },
  });

  fireEvent.click(
    screen.getByRole('button', {
      name: /confirm reservation/i,
    })
  );

  expect(window.location.hash).toBe('#/reservations');
  expect(
    screen.getByText(
      /we could not complete your reservation\. please choose another time and try again\./i
    )
  ).toBeInTheDocument();
});
