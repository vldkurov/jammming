import React from 'react';
import BasicCard from "../BasicCard/BasicCard";

const Tracklist = ({tracks, onAdd, onRemove, isRemovable}) => {

    return (
        <>
            {tracks.map(track =>
                <BasicCard key={track.id}
                           track={track}
                           onAdd={onAdd}
                           onRemove={onRemove}
                           isRemovable={isRemovable}/>
            )}
        </>
    );
};

export default Tracklist;