import {render, screen} from '@testing-library/react';
import SearchBar from './SearchBar';

test('renders SearchBar component', () => {
    render(<SearchBar/>);
    const searchBarElement = screen.getByTestId('search-bar');
    expect(searchBarElement).toBeInTheDocument();
});
