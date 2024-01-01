# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't
customize it when you are ready for it.

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved
here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved
here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved
here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved
here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved
here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved
here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)

#### git rm --cached .env

#### git rm --cached -r .idea

# Jammming App Component Documentation

Overview

The App component is the main container for the Jammming web application. It orchestrates the interaction between the
SearchBar, SearchResults, and Playlist components, allowing users to search for songs, create custom playlists, and save
them to their Spotify accounts.

Table of Contents

Prerequisites
Component Structure
State Variables
UseEffect
Error Handling
Methods
Rendering
Prerequisites

React
Spotify API Key
Component Structure

The App component comprises the following components:

SearchBar: Allows users to input search queries.
SearchResults: Displays search results and provides an option to add tracks to the playlist.
Playlist: Represents the user's custom playlist and provides options to edit the playlist name, remove tracks, and save
the playlist.
State Variables

searchResults: Represents the list of tracks obtained from the Spotify search.
playlist: Represents the user's custom playlist.
playlistName: Represents the name of the custom playlist.
UseEffect

The useEffect hook is utilized to ensure that the Spotify access token is obtained when the component mounts. This is
essential for making authenticated requests to the Spotify API.

Error Handling

The handleError function logs errors to the console for debugging purposes. It is invoked in case of errors during the
execution of asynchronous methods.

Methods

addTrackToPlaylist(track): Adds a track to the custom playlist if it is not already present.
removeTrackFromPlaylist(track): Removes a track from the custom playlist.
handlePlaylistNameChange(newName): Updates the playlist name based on user input.
savePlaylist(): Saves the custom playlist to the user's Spotify account by creating a new playlist, adding tracks to it,
and resetting the playlist state.
handleSearch(results): Updates the searchResults state based on the search query results.
Rendering

The render method returns JSX to create the overall layout of the Jammming app. It includes the SearchBar,
SearchResults, and Playlist components, along with a "Save to Spotify" button for users to export their playlists.

Styles
The component utilizes modular CSS for styling, and the styles are imported from the App.module.css file.