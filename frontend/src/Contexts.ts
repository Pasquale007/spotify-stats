import { createContext } from 'react';

let defaultPlaylist: Playlist = {
    id: -1,
    href: "",
    name: "Default Playlist",
    uri: "",
    type: "playlist",
    images: [],
    owner: {
        id: -1,
        name: "user",
    }
}

export const ActivePlaylistContext = createContext<Playlist>(defaultPlaylist);
