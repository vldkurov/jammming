import React, {useState} from 'react';
import styles from './SearchBar.module.css';
import Spotify from "../../Spotify";

const SearchBar = ({onSearch}) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (searchTerm.trim() !== '') {
            Spotify.search(searchTerm).then((results) => {
                // Pass the search results to the parent component
                onSearch(results);
            });
        }
    };

    return (
        <div className={styles.SearchBar}>
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
