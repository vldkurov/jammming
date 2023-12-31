// src/components/App/App.js
import React, {useState} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import styles from './App.module.css';

const App = () => {
    const [searchResults, setSearchResults] = useState([
        {id: '1', name: 'Song 1', artist: 'Artist 1', album: 'Album 1'},
        {id: '2', name: 'Song 2', artist: 'Artist 2', album: 'Album 2'},
        // Add more track objects as needed
    ]);

    const [playlist, setPlaylist] = useState([
        {id: '3', name: 'Playlist Song 1', artist: 'Playlist Artist 1', album: 'Playlist Album 1'},
        // Add more playlist track objects as needed
    ]);

    const [playlistName, setPlaylistName] = useState('My Playlist'); // State for the playlist name

    const addTrackToPlaylist = (track) => {
        // Check if the track is already in the playlist
        const isTrackInPlaylist = playlist.some((playlistTrack) => playlistTrack.id === track.id);

        // If the track is not in the playlist, add it
        if (!isTrackInPlaylist) {
            setPlaylist((prevPlaylist) => [...prevPlaylist, track]);
        }
    };

    const removeTrackFromPlaylist = (track) => {
        // Implement the logic to remove a track from the playlist
        const updatedPlaylist = playlist.filter((playlistTrack) => playlistTrack.id !== track.id);
        setPlaylist(updatedPlaylist);
    };

    const handlePlaylistNameChange = (newName) => {
        setPlaylistName(newName);
    };

    return (
        <div className={styles.App}>
            <h1>Jammming</h1>
            <div className={styles['App-container']}>
                <SearchBar/>
                <div className={styles['App-search-results']}>
                    <SearchResults searchResults={searchResults} onAdd={addTrackToPlaylist}/>
                </div>
                <div className={styles['App-playlist']}>
                    <Playlist
                        playlist={playlist}
                        playlistName={playlistName}
                        onNameChange={handlePlaylistNameChange}
                        onRemove={removeTrackFromPlaylist}
                    />
                </div>
            </div>
            <button className={styles['App-save-button']}>Save to Spotify</button>
        </div>
    );
};

export default App;
