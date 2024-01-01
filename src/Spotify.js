const Client_ID = process.env.REACT_APP_SPOTIFY_CLIENT_ID
const redirectUri = process.env.REACT_APP_REDIRECT_URI


const Spotify = {
    accessToken: '', // Store the access token
    expiresIn: 0, // Store the expiration time in seconds

    getAccessToken() {
        if (this.accessToken) {
            return this.accessToken; // Return the access token if it's already set
        }

        // Check if the access token is in the URL
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {
            this.accessToken = accessTokenMatch[1];
            this.expiresIn = Number(expiresInMatch[1]);

            // Clear parameters from the URL to avoid issues with expired access tokens
            window.history.pushState('Access Token', null, '/');

            // Set a timer to refresh the token before it expires
            setTimeout(() => (this.accessToken = ''), this.expiresIn * 1000);

            return this.accessToken;
        } else {
            // Redirect the user to the Spotify authorization page
            const scope = 'user-read-private user-read-email playlist-modify-private'; // Add additional scopes as needed
            window.location = `https://accounts.spotify.com/authorize?client_id=${Client_ID}&redirect_uri=${redirectUri}&scope=${scope}&response_type=token`;
        }
    },

    search(term) {
        const accessToken = this.getAccessToken();

        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (!data.tracks) {
                    return [];
                }

                return data.tracks.items.map((track) => ({
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                }));
            });
    },

    getUserId: async function () {
        const accessToken = this.getAccessToken();

        if (!accessToken) {
            console.error('Access token is missing.');
            return null;
        }

        try {
            const response = await fetch('https://api.spotify.com/v1/me', {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                return data.id;
            } else {
                console.error('Failed to fetch user ID:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error fetching user ID:', error);
            return null;
        }
    },

    createPlaylist: async function (userId, playlistName) {
        const accessToken = this.getAccessToken();

        if (!accessToken) {
            console.error('Access token is missing.');
            return null;
        }

        try {
            const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: playlistName,
                    description: 'Custom playlist created with Jammming',
                    public: false,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                return data.id; // Return the ID of the created playlist
            } else {
                console.error('Failed to create playlist:', response.statusText);
                return null;
            }
        } catch (error) {
            console.error('Error creating playlist:', error);
            return null;
        }
    },

    addTracksToPlaylist: async function (userId, playlistId, trackUris) {
        const accessToken = this.getAccessToken();

        if (!accessToken) {
            console.error('Access token is missing.');
            return;
        }

        try {
            await fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    uris: trackUris,
                }),
            });
        } catch (error) {
            console.error('Error adding tracks to playlist:', error);
        }
    },


};

export default Spotify;
