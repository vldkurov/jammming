import React from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './SearchResults.module.css';

export default function SearchResults({searchResults, onAdd}) {
    return (
        <div className={styles.SearchResults}>
            <h2>Results</h2>
            <Tracklist tracks={searchResults} onAdd={onAdd} isRemovable={false}/>
        </div>
    );
}