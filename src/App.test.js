import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import App from './App';

describe('Calculator Functionality', () => {
  test('displays numbers when buttons are pressed', () => {
    render(<App />);
    const button1 = screen.getByRole('button', { name: /1/i });
    const button2 = screen.getByRole('button', { name: /2/i });

    fireEvent.click(button1);
    fireEvent.click(button2);

    expect(screen.getByText('12')).toBeInTheDocument();
  });

  test('performs addition correctly', () => {
    render(<App />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('+'));
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  test('handles division by zero with ERROR', () => {
    render(<App />);
    fireEvent.click(screen.getByText('1'));
    fireEvent.click(screen.getByText('/'));
    fireEvent.click(screen.getByText('0'));
    fireEvent.click(screen.getByText('='));
    expect(screen.getByText('ERROR')).toBeInTheDocument();
  });

  test('limits display to 9 characters', () => {
    render(<App />);
    // Assuming pressing 1 ten times
    for (let i = 0; i < 10; i++) {
      fireEvent.click(screen.getByText('1'));
    }
    // Check only 9 characters are shown
    expect(screen.getByText('111111111')).toBeInTheDocument();
    expect(screen.queryByText('1111111111')).not.toBeInTheDocument();
  });

  test('changes display from positive to negative when +/- is pressed', () => {
    render(<App />);
    fireEvent.click(screen.getByText('5'));
    fireEvent.click(screen.getByText('+/-'));
    expect(screen.getByText('-5')).toBeInTheDocument();
  });
});
