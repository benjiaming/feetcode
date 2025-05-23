import { screen, fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom'

import Todo from './Todo';

describe('Todo App', () => {
  it('renders initial tasks', () => {
    render(<Todo />);
    expect(screen.getByText(/Walk the dog/)).toBeInTheDocument();
    expect(screen.getByText(/Water the plants/)).toBeInTheDocument();
    expect(screen.getByText(/Wash the dishes/)).toBeInTheDocument();
  });

  it('adds a new task', () => {
    render(<Todo />)
    fireEvent.change(screen.getByPlaceholderText(/Add your task/), { target: { value: 'Read a book' } });
    fireEvent.click(screen.getByText(/Submit/));
    expect(screen.getByText(/Read a book/)).toBeInTheDocument();
  });

  it('completes a task', () => {
    render(<Todo />)
    const completeButtons = screen.getAllByText(/Complete/);
    fireEvent.click(completeButtons[0]);
    
    expect(screen.getByText(/Completed/i)).toBeInTheDocument();
  });

  it('deletes a task', () => {
    render(<Todo />)
    const deleteButtons = screen.getAllByText(/Delete/);
    fireEvent.click(deleteButtons[0]);
    expect(screen.queryByText(/Walk the dog/)).not.toBeInTheDocument();
  });

  it('toggles show completed', () => {
    render(<Todo />)
    // Complete all tasks
    for (let i = 0; i < 3; i++) {
      fireEvent.click(screen.getAllByRole('button', { name: /Complete/} )[0]);
    }
    // Table should not show when not showing completed
    expect(screen.queryByText(/Todo tasks/)).not.toBeInTheDocument();
    // Toggle show completed
    fireEvent.click(screen.getByLabelText(/Show completed/));
    expect(screen.getByText(/Todo tasks/)).toBeInTheDocument();
  });
});