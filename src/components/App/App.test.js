import {render, screen} from '@testing-library/react';
import App from './App';

test('renders Jammming app', () => {
    render(<App/>);
    const linkElement = screen.getByText(/Jammming/i);
    expect(linkElement).toBeInTheDocument();
});
