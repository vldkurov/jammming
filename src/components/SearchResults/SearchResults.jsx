import React from 'react';
import Tracklist from '../Tracklist/Tracklist';

export default function SearchResults({searchResults, onAdd}) {
    return (
        <>
            <h2>Results</h2>
            <Tracklist tracks={searchResults} onAdd={onAdd} isRemovable={false}/>
        </>
    );
}