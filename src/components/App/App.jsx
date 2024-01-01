import React, {useEffect, useState} from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import styles from './App.module.css';
import Spotify from "../../utility/Spotify";

const App = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState('My Playlist');

    useEffect(() => {
        Spotify.getAccessToken();
    }, []);

    const handleError = (error, message) => {
        console.error(message, error);
    };

    const addTrackToPlaylist = (track) => {
        const isTrackInPlaylist = playlist.some((playlistTrack) => playlistTrack.id === track.id);
        if (!isTrackInPlaylist) {
            setPlaylist(prevPlaylist => [...prevPlaylist, track]);
        }
    };

    const removeTrackFromPlaylist = (track) => {
        const updatedPlaylist = playlist.filter((playlistTrack) => playlistTrack.id !== track.id);
        setPlaylist(updatedPlaylist);
    };

    const handlePlaylistNameChange = (newName) => {
        setPlaylistName(newName);
    };

    const savePlaylist = async () => {
        try {
            const userId = await Spotify.getUserId();
            if (!userId) throw new Error('User ID is missing.');

            const playlistId = await Spotify.createPlaylist(userId, playlistName);
            if (!playlistId) throw new Error('Failed to create playlist.');

            const trackUris = playlist.map(track => track.uri);

            await Spotify.addTracksToPlaylist(userId, playlistId, trackUris);
            console.log('Playlist saved successfully!');

            setPlaylist([]);
            setPlaylistName('New Playlist');
        } catch (error) {
            handleError(error, 'Error during playlist saving: ');
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