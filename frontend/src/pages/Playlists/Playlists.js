import { useEffect, useState } from 'react';
import Playlist from '../../components/Playlist/Playlist';
import Popup from '../../components/PopUp/Popup';
import { ActivePlaylistContext } from '../../Contexts';
import HelperFunctions from '../../HelperFunctions';
import style from './Playlists.module.css'

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(undefined);

    useEffect(() => {
        async function fetchUserPlaylists() {
            let data = await HelperFunctions.fetchUserPlaylists();
            setPlaylists(data);
        }
        fetchUserPlaylists();
    }, []);

    return (
        <div className={style.main}>
            <ActivePlaylistContext.Provider value={selectedPlaylist}>
                <Popup />
            </ActivePlaylistContext.Provider>
            {playlists.map(playlist => {
                return (
                    <div key={playlist.id} onClick={() => setSelectedPlaylist(playlist)}>
                        <Playlist data={playlist} />
                    </div>
                );
            })}

        </div>
    );
}