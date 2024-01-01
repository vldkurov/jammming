import React, {useState} from 'react';
import Tracklist from '../Tracklist/Tracklist';
import Grid from "@mui/material/Unstable_Grid2";
import {Button} from "@mui/material";

const usePlaylistController = (playlist, playlistName, onNameChange, onRemove) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(playlistName);

    const handleRemoveTrack = (track) => {
        playlist.filter((playlistTrack) => playlistTrack.id !== track.id);
        onRemove(track);
    };

    const handlePlaylistNameClick = () => {
        setIsEditing(true);
    };
    const handlePlaylistNameBlur = () => {
        setIsEditing(false);
        onNameChange(newName);
    };
    const handleNewNameChange = (event) => {
        setNewName(event.target.value);
    };

    return {
        isEditing,
        handlePlaylistNameClick,
        handlePlaylistNameBlur,
        handleNewNameChange,
        handleRemoveTrack,
        newName
    };
}

const Playlist = ({playlist, playlistName, onNameChange, onRemove, savePlaylist}) => {
    const {
        isEditing,
        handlePlaylistNameClick,
        handlePlaylistNameBlur,
        handleNewNameChange,
        handleRemoveTrack,
        newName
    } = usePlaylistController(playlist, playlistName, onNameChange, onRemove);

    const myStyle = {
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'red',
    };

    const headerStyle = {
        display: 'flex',
        justifyContent: 'flex-start'
    }

    const buttonStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 18,
    }

    return (
        <>
            <>
                <Grid container spacing={1}>
                    <Grid xs={6} style={{...headerStyle}}>
                        {isEditing ? (
                            <input
                                type="text"
                                placeholder="Enter Playlist Name"
                                value={newName}
                                onChange={handleNewNameChange}
                                onBlur={handlePlaylistNameBlur}
                            />
                        ) : (
                            <h2 onClick={handlePlaylistNameClick}>{playlistName}</h2>
                        )}
                    </Grid>
                    <Grid xs={6} style={{...buttonStyle}}>
                        <Button variant="contained" color="success" onClick={savePlaylist}>
                            Save to Spotify
                        </Button>
                    </Grid>
                </Grid>
            </>
            <Tracklist tracks={playlist} onRemove={handleRemoveTrack} isRemovable={true}/>
        </>
    );
};

export default Playlist;