import * as React from 'react';
import {useState} from 'react';
import {alpha, styled} from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import Spotify from "../../utility/Spotify";

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
}));

export default function SearchAppBar({onSearch}) {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const performSearch = async () => {
        if (searchTerm.trim() === '') return;
        try {
            const results = await Spotify.search(searchTerm);
            setSearchTerm('');
            // Pass the search results to the parent component
            onSearch(results);
        } catch (error) {
            console.error("Failed to perform the search:", error);
        }
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        const wasSuccessful = await performSearch();
        wasSuccessful && console.log('Search successful');
    };

    const handleKeyDown = async (event) => {
        if (event.key === 'Enter') {
            await handleSearchSubmit(event);
        }
    };

    return (
        <Box data-testid="search-bar" sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        textAlign='left'
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        Jammming
                    </Typography>
                    <Search onClick={handleSearchSubmit} onKeyDown={handleKeyDown}>
                        <SearchIconWrapper>
                            <SearchIcon/>
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{'aria-label': 'search'}}
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Search>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
