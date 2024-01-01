import React, {useEffect, useState} from 'react';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from "../../utility/Spotify";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import SearchAppBar from "../SearchAppBar/SearchAppBar";
// import {Grid} from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';
import Box from "@mui/material/Box";


const App = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [playlist, setPlaylist] = useState([]);
    const [playlistName, setPlaylistName] = useState('My Playlist');

    useEffect(() => {
        document.body.style.backgroundColor = "#9adcfb"

        return () => {
            document.body.style.backgroundColor = null; // revert to previous style on component unmounting
        }
    }, []);

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

        <>
            <SearchAppBar onSearch={handleSearch}/>
            <Box sx={{flexGrow: 1, paddingX: 1}}>
                <Grid container spacing={1}>
                    <Grid xs={6}>
                        <SearchResults searchResults={searchResults} onAdd={addTrackToPlaylist}/>
                    </Grid>
                    <Grid xs={6}>
                        <Playlist
                            playlist={playlist}
                            playlistName={playlistName}
                            onNameChange={handlePlaylistNameChange}
                            onRemove={removeTrackFromPlaylist}
                            savePlaylist={savePlaylist}
                        />
                    </Grid>
                </Grid>
            </Box>


        </>

    );
};

export default App;