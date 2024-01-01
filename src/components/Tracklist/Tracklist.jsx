import React from 'react';
import BasicCard from "../BasicCard/BasicCard";

const Tracklist = ({tracks, onAdd, onRemove, isRemovable}) => {

    const renderTrack = (track) => {
        return (
            <>
                <BasicCard key={track.id}
                           track={track}
                           onAdd={onAdd}
                           onRemove={onRemove}
                           isRemovable={isRemovable}/>
            </>
        );
    };

    return (
        <>
            {tracks.map(renderTrack)}
        </>
    );
};

export default Tracklist;