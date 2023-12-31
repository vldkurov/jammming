// src/components/Track/Track.js
import React from 'react';
import styles from './Track.module.css';

const Track = ({track, onAdd, onRemove, isRemovable}) => {
    return (
        <div className={styles.Track}>
            <div className={styles['Track-information']}>
                <h3>{track.name}</h3>
                <p>{track.artist} | {track.album}</p>
            </div>
            {isRemovable ? (
                <button className={styles['Track-action']} onClick={() => onRemove(track)}>
                    -
                </button>
            ) : (
                <button className={styles['Track-action']} onClick={() => onAdd(track)}>
                    +
                </button>
            )}
        </div>
    );
};

export default Track;
