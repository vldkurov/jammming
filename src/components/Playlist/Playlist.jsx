// src/components/Playlist/Playlist.js
import React, {useState} from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

const Playlist = ({playlist, playlistName, onNameChange, onRemove}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState(playlistName);

    const handleRemoveTrack = (track) => {
        // Implement the logic to remove a track from the playlist
        const updatedPlaylist = playlist.filter((playlistTrack) => playlistTrack.id !== track.id);
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

    return (
        <div className={styles.Playlist}>
            <div className={styles['Playlist-header']}>
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
            </div>
            <Tracklist tracks={playlist} onRemove={handleRemoveTrack} isRemovable={true}/>
        </div>
    );
};

export default Playlist;
