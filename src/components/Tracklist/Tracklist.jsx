import React from 'react';
import Track from '../Track/Track';
import styles from './Tracklist.module.css';

const Tracklist = ({tracks, onAdd, onRemove, isRemovable}) => {

    const renderTrack = (track) => {
        return (
            <Track
                key={track.id}
                track={track}
                onAdd={onAdd}
                onRemove={onRemove}
                isRemovable={isRemovable}
            />
        );
    };

    return (
        <div className={styles.Tracklist}>
            {tracks.map(renderTrack)}
        </div>
    );
};

export default Tracklist;