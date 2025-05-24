import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import FileExplorer from './FileExplorer';

const data = [
	{
		id: 1,
		name: 'Documents',
		children: [
			{ id: 2, name: 'Resume.pdf' },
			{ id: 3, name: 'CoverLetter.docx' },
		],
	},
	{
		id: 4,
		name: 'Notes.txt',
	},
];

describe('FileExplorer', () => {
	it('renders root folders and files', () => {
		render(<FileExplorer data={data} />);
		expect(screen.getByRole('button', { name: /Documents/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Notes.txt/i })).toBeInTheDocument();
	});

	it('expands and collapses folders on click', async () => {
		render(<FileExplorer data={data} />);
		expect(screen.queryByRole('button', { name: /Resume.pdf/i })).not.toBeInTheDocument();
		fireEvent.click(screen.getByRole('button', { name: /Documents/ }));
		expect(screen.getByRole('button', { name: /Resume.pdf/i })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /CoverLetter.docx/i })).toBeInTheDocument();

		fireEvent.click(screen.getByRole('button', { name: /Documents/ }));
		expect(screen.queryByRole('button', { name: /Resume.pdf/i })).not.toBeInTheDocument();
	});

	it('sorts folders and files alphabetically', () => {
		const unsorted = [
			{ id: 1, name: 'Zeta.txt' },
			{ id: 2, name: 'Alpha.txt' },
			{ id: 3, name: 'Beta.txt' },
		];
		render(<FileExplorer data={unsorted} />);
		const items = screen.getAllByRole('listitem');
		expect(items[0]).toHaveTextContent('Alpha.txt');
		expect(items[1]).toHaveTextContent('Beta.txt');
		expect(items[2]).toHaveTextContent('Zeta.txt');
	});

	it('calls onClick with file node when a file is clicked', () => {
		const handleClick = vi.fn();
		render(<FileExplorer data={data} onClick={handleClick} />);
		// Expand Documents to show files
		fireEvent.click(screen.getByRole('button', { name: /Documents/ }));
		// Click on Resume.pdf
		fireEvent.click(screen.getByRole('button', { name: /Resume.pdf/ }));
		expect(handleClick).toHaveBeenCalledWith(
			expect.objectContaining({ id: 2, name: 'Resume.pdf' })
		);
		// Click on Notes.txt (root file)
		fireEvent.click(screen.getByRole('button', { name: /Notes.txt/ }));
		expect(handleClick).toHaveBeenCalledWith(
			expect.objectContaining({ id: 4, name: 'Notes.txt' })
		);
	});
});