import React from 'react';
import styles from './Track.module.css';

const Track = ({track, onAdd, onRemove, isRemovable}) => {
    const {name, artist, album} = track;

    const handleAdd = onAdd ? onAdd.bind(null, track) : undefined;
    const handleRemove = onRemove ? onRemove.bind(null, track) : undefined;

    return (
        <>
            <TrackInformation name={name} artist={artist} album={album}/>
            {isRemovable ? <RemoveButton onClick={handleRemove}/> : <AddButton onClick={handleAdd}/>}
        </>
    );
};

const TrackInformation = ({name, artist, album}) => (
    <div className={styles['Track-information']}>
        <h3>{name}</h3>
        <p>{artist} | {album}</p>
    </div>
);

const AddButton = ({onClick}) => (
    <button className={styles['Track-action']} onClick={onClick}>+</button>
);

const RemoveButton = ({onClick}) => (
    <button className={styles['Track-action']} onClick={onClick}>-</button>
);

export default Track;