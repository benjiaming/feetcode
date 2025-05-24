import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TicTacToe } from './TicTacToe';

describe('TicTacToe', () => {
  it('renders the board and player turn', () => {
    render(<TicTacToe matrix_size={3} />);
    expect(screen.getByText('Player X:')).toBeInTheDocument();
    // Should render 9 cells for 3x3
    expect(screen.getAllByRole('button')).toHaveLength(9);
  });

  it('alternates turns between X and O', () => {
    render(<TicTacToe matrix_size={3} />);
    const cells = screen.getAllByRole('button');
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent('X');
    expect(screen.getByText('Player O:')).toBeInTheDocument();
    fireEvent.click(cells[1]);
    expect(cells[1]).toHaveTextContent('O');
    expect(screen.getByText('Player X:')).toBeInTheDocument();
  });

  it('prevents overwriting a cell', () => {
    render(<TicTacToe matrix_size={3} />);
    const cells = screen.getAllByRole('button');
    fireEvent.click(cells[0]);
    fireEvent.click(cells[0]);
    expect(cells[0]).toHaveTextContent('X');
  });

  it('detects a win and highlights the winning line', () => {
    render(<TicTacToe matrix_size={3} />);
    const cells = screen.getAllByRole('button');
    // X O X
    // O X
    // 
    fireEvent.click(cells[0]); // X
    fireEvent.click(cells[3]); // O
    fireEvent.click(cells[1]); // X
    fireEvent.click(cells[4]); // O
    fireEvent.click(cells[2]); // X wins
    expect(screen.getByText('X wins!')).toBeInTheDocument();
    // Winning cells should have lightblue background
    const winningCells = [cells[0], cells[1], cells[2]];
    winningCells.forEach(cell => {
      expect(cell).toHaveStyle({ backgroundColor: 'rgb(173, 216, 230)' });
    });
  });

  it('shows restart button and resets the game', () => {
    render(<TicTacToe matrix_size={3} />);
    const cells = screen.getAllByRole('button');
    fireEvent.click(cells[0]);
    fireEvent.click(cells[3]);
    fireEvent.click(cells[1]);
    fireEvent.click(cells[4]);
    fireEvent.click(cells[2]); // X wins
    const restartBtn = screen.getByText('Restart');
    expect(restartBtn).toBeInTheDocument();
    fireEvent.click(restartBtn);
    // All cells should be empty
    screen.getAllByRole('button').forEach(cell => {
      expect(cell).toHaveTextContent('');
    });
    expect(screen.getByText('Player X:')).toBeInTheDocument();
  });
});