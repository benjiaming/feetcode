import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import DataTable, { type Label } from './DataTable';

const users = [
  { id: 1, name: 'Alice', age: 30, occupation: 'Engineer' },
  { id: 2, name: 'Bob', age: 25, occupation: 'Designer' },
  { id: 3, name: 'Charlie', age: 35, occupation: 'Manager' },
  { id: 4, name: 'Diana', age: 28, occupation: 'Developer' },
  { id: 5, name: 'Eve', age: 32, occupation: 'Analyst' },
  { id: 6, name: 'Frank', age: 40, occupation: 'CEO' },
];

const labels: Label[] = [
  { label: 'ID', key: 'id' },
  { label: 'Name', key: 'name' },
  { label: 'Age', key: 'age' },
  { label: 'Occupation', key: 'occupation' },
];

describe('DataTable', () => {
  it('renders table with caption and headers', () => {
    render(<DataTable users={users} caption="Test Users" labels={labels} />);
    expect(screen.getByText('Test Users')).toBeInTheDocument();
    labels.forEach(({ label }) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  it('shows correct number of rows per page', () => {
    render(<DataTable users={users} caption="Test Users" labels={labels} />);
    // 5 rows per page by default
    expect(screen.getAllByRole('row')).toHaveLength(6); // 1 header + 5 rows
  });

  it('changes rows per page when select is changed', () => {
    render(<DataTable users={users} caption="Test Users" labels={labels} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '15' } });
    // All users should be visible (6 users + 1 header)
    expect(screen.getAllByRole('row')).toHaveLength(7);
  });

  it('navigates pages with Prev/Next buttons', () => {
    render(<DataTable users={users} caption="Test Users" labels={labels} />);
    // Page 1: users 1-5
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Frank')).not.toBeInTheDocument();

    // Go to next page
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Frank')).toBeInTheDocument();
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();

    // Go back to previous page
    fireEvent.click(screen.getByText('Prev'));
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.queryByText('Frank')).not.toBeInTheDocument();
  });

  it('disables Prev button on first page and Next button on last page', () => {
    render(<DataTable users={users} caption="Test Users" labels={labels} />);
    expect(screen.getByText('Prev')).toBeDisabled();
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText('Next')).toBeDisabled();
  });

  it('shows correct page number', () => {
    render(<DataTable users={users} caption="Test Users" labels={labels} />);
    expect(screen.getByText(/Page 1 of 2/)).toBeInTheDocument();
    fireEvent.click(screen.getByText('Next'));
    expect(screen.getByText(/Page 2 of 2/)).toBeInTheDocument();
  });
});