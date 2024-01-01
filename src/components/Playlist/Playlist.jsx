import React, {useState} from 'react';
import Tracklist from '../Tracklist/Tracklist';
import styles from './Playlist.module.css';

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

const Playlist = ({playlist, playlistName, onNameChange, onRemove}) => {
    const {
        isEditing,
        handlePlaylistNameClick,
        handlePlaylistNameBlur,
        handleNewNameChange,
        handleRemoveTrack,
        newName
    } = usePlaylistController(playlist, playlistName, onNameChange, onRemove);

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