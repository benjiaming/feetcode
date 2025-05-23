import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Accordion from './Accordion';

const data = {
  HTML: 'HTML content',
  CSS: 'CSS content',
  JavaScript: 'JavaScript content',
};

describe('Accordion', () => {
  it('renders all section titles', () => {
    render(<Accordion data={data} />);
    expect(screen.getByText('HTML')).toBeInTheDocument();
    expect(screen.getByText('CSS')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('shows content when a section is clicked', () => {
    render(<Accordion data={data} />);
    fireEvent.click(screen.getByText('HTML'));
    expect(screen.getByText('HTML content')).toBeVisible();
  });

  it('hides content when the same section is clicked again', () => {
    render(<Accordion data={data} />);
    const htmlTitle = screen.getByText('HTML');
    fireEvent.click(htmlTitle);
    expect(screen.getByText('HTML content')).toBeVisible();
    fireEvent.click(htmlTitle);
    expect(screen.getByText('HTML content')).not.toBeVisible();
  });

  it('only shows one section at a time', () => {
    render(<Accordion data={data} />);
    fireEvent.click(screen.getByText('HTML'));
    expect(screen.getByText('HTML content')).toBeVisible();
    fireEvent.click(screen.getByText('CSS'));
    expect(screen.getByText('CSS content')).toBeVisible();
    expect(screen.getByText('HTML content')).not.toBeVisible();
  });
});