import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { vi } from 'vitest';

vi.mock('react-d3-tree', () => ({
  __esModule: true,
  default: ({ data }: any) => (
    <div data-testid="tree">{JSON.stringify(data)}</div>
  ),
}));

describe('Invert Binary Tree App', () => {
  it('renders the tree root node', () => {
    render(<App />);
    const treeDiv = screen.getByTestId('tree');
    const treeData = JSON.parse(treeDiv.textContent!);
    expect(treeData.name).toBe('A');
  });

  it('renders all initial nodes', () => {
    render(<App />);
    const treeDiv = screen.getByTestId('tree');
    const treeData = JSON.parse(treeDiv.textContent!);
    // Check root and children names
    expect(treeData.name).toBe('A');
    expect(treeData.children.map((c: any) => c.name)).toEqual(['B', 'C']);
  });

  it('renders the invert button', () => {
    render(<App />);
    expect(screen.getByRole('button', { name: /invert tree/i })).toBeInTheDocument();
  });

  it('inverts the tree when the button is clicked', () => {
    render(<App />);
    fireEvent.click(screen.getByRole('button', { name: /invert tree/i }));
    const treeDiv = screen.getByTestId('tree');
    const treeData = JSON.parse(treeDiv.textContent!);
    // After invert, children order should be ['C', 'B']
    expect(treeData.children.map((c: any) => c.name)).toEqual(['C', 'B']);
  });
});