// src/components/App/App.js
import React, {useEffect, useState} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import styles from './App.module.css';
import Spotify from "../../Spotify";

const App = () => {


    const [searchResults, setSearchResults] = useState([]);

    const [playlist, setPlaylist] = useState([]);

    const [playlistName, setPlaylistName] = useState('My Playlist'); // State for the playlist name

    useEffect(() => {
        const token = Spotify.getAccessToken();
        // Use the access token for making Spotify API requests or other actions in your app
        console.log('Access Token:', token);
    }, []);

    const addTrackToPlaylist = (track) => {
        // Check if the track is already in the playlist
        const isTrackInPlaylist = playlist.some((playlistTrack) => playlistTrack.id === track.id);

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

    const savePlaylist = async () => {

        const userId = await Spotify.getUserId();

        if (!userId) {
            console.error('User ID is missing.');
            return;
        }

        const playlistId = await Spotify.createPlaylist(userId, playlistName);

        if (!playlistId) {
            console.error('Failed to create playlist.');
            return;
        }

        const trackUris = playlist.map(track => track.uri);

        try {
            await Spotify.addTracksToPlaylist(userId, playlistId, trackUris);
            console.log('Playlist saved successfully!');
            // Optionally, reset the playlist in your state or perform other actions.
            setPlaylist([]);
            setPlaylistName('New Playlist');
        } catch (error) {
            console.error('Error adding tracks to playlist:', error);
        }
        
    };

    const handleSearch = (results) => {
        setSearchResults(results);
    };

    return (
        <div className={styles.App}>
            <h1>Jammming</h1>
            <div className={styles['App-container']}>
                <SearchBar onSearch={handleSearch}/>
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
            <button className={styles['App-save-button']} onClick={savePlaylist}>
                Save to Spotify
            </button>
        </div>
    );
};

export default App;
