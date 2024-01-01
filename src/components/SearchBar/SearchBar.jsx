import React, {useState} from 'react';
import styles from './SearchBar.module.css';
import Spotify from "../../utility/Spotify";

const SearchBar = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const performSearch = async () => {
        if (searchTerm.trim() === '') return;
        try {
            const results = await Spotify.search(searchTerm);
            setSearchTerm('');
            // Pass the search results to the parent component
            onSearch(results);
        } catch (error) {
            console.error("Failed to perform the search:", error);
        }
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        const wasSuccessful = await performSearch();
        wasSuccessful && console.log('Search successful');
    };

    return (
        <div data-testid="search-bar" className={styles.SearchBar}>
            <input
                type="text"
                placeholder="Enter A Song, Album, or Artist"
                value={searchTerm}
                onChange={handleSearchChange}
            />
            <button className={styles['SearchBar-button']} onClick={handleSearchSubmit}>
                SEARCH
            </button>
        </div>
    );
};

export default SearchBar;