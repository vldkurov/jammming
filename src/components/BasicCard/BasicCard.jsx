import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


export default function BasicCard({track, onAdd, onRemove, isRemovable}) {
    const {name, artist, album} = track;

    const handleAdd = onAdd ? onAdd.bind(null, track) : undefined;
    const handleRemove = onRemove ? onRemove.bind(null, track) : undefined;

    return (
        <Card sx={{minWidth: 275, mb: 1}} name={name} artist={artist} album={album}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {name}
                </Typography>
                <Typography sx={{mb: 1.5}}>
                    {artist}
                </Typography>
                <Typography variant="body2">
                    {album}
                </Typography>
            </CardContent>
            <CardActions>
                {isRemovable ? <RemoveButton onClick={handleRemove}/> : <AddButton onClick={handleAdd}/>}
            </CardActions>
        </Card>
    );
}

const AddButton = ({onClick}) => (
    <Button size="small" onClick={onClick}>Add</Button>
);

const RemoveButton = ({onClick}) => (
    <Button size="small" onClick={onClick}>Delete</Button>
);