import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import JobBoard from './JobBoard';

const mockJobIds = [1, 2, 3, 4, 5, 6, 7, 8];
const mockJob = (id: number) => ({
  id,
  url: `https://example.com/job/${id}`,
  title: `Job Title ${id}`,
  by: `user${id}`,
  time: 1716400000 + id * 1000,
});

beforeEach(() => {
  // @ts-ignore
  global.fetch = vi.fn()
    // First call: job IDs
    .mockResolvedValueOnce({
      status: 200,
      json: async () => mockJobIds,
    })
    // Subsequent calls: job details
    .mockImplementation((req: any) => {
      const url = typeof req === 'string' ? req : req.url;
      const idMatch = url && url.match(/item\/(\d+)\.json/);
      if (idMatch) {
        const id = Number(idMatch[1]);
        return Promise.resolve({
          status: 200,
          json: async () => mockJob(id),
        });
      }
      return Promise.resolve({ status: 404, json: async () => ({}) });
    });
});

afterEach(() => {
  vi.clearAllMocks();
});

it('renders loading initially', async () => {
  await waitFor(() => {
    render(<JobBoard />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  })
});

it('renders jobs after fetch', async () => {
  render(<JobBoard />);
  await waitFor(() => {
    expect(screen.getByText(/Job Title 1/)).toBeInTheDocument();
    expect(screen.getByText(/Job Title 6/)).toBeInTheDocument();
  });
});

it('loads more jobs when "Load more" is clicked', async () => {
  render(<JobBoard />);
  // Wait for initial jobs
  await waitFor(() => {
    expect(screen.getByText(/Job Title 1/)).toBeInTheDocument();
  });

  // Click "Load more"
  fireEvent.click(screen.getByText(/load more/i));

  // Wait for more jobs to appear
  await waitFor(() => {
    expect(screen.getByText(/Job Title 7/)).toBeInTheDocument();
    expect(screen.getByText(/Job Title 8/)).toBeInTheDocument();
  });
});