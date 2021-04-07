// Dependencies
import { render, screen } from '@testing-library/react';

// Components
import Header from './Header';

test('renders learn react link', () => {
    render(<Header />);
    const linkElement = screen.getByText(/React Stock Market/i);
    expect(linkElement).toBeInTheDocument();
});
