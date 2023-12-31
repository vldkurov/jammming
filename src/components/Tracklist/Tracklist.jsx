// src/components/Tracklist/Tracklist.js
import React from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css';

const Tracklist = ({tracks, onAdd, onRemove, isRemovable}) => {
    return (
        <div className={styles.Tracklist}>
            {tracks.map((track) => (
                <Track
                    key={track.id}
                    track={track}
                    onAdd={onAdd}
                    onRemove={onRemove}
                    isRemovable={isRemovable}
                />
            ))}
        </div>
    );
};

export default Tracklist;
