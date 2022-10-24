import { useEffect, useState } from 'react';
import Playlist from '../../components/Playlist/Playlist';
import Popup from '../../components/PopUp/Popup';
import HelperFunctions from '../../HelperFunctions';
import style from './Playlists.module.css'

export default function Playlists() {
    const [playlists, setPlaylists] = useState([]);
    const [activePlaylist, setActivePlaylist] = useState(undefined);
    const [visible, setVisible] = useState("none");


    useEffect(() => {
        async function fetchUserPlaylists() {
            let data = await HelperFunctions.fetchUserPlaylists();
            setPlaylists(data);
        }

        fetchUserPlaylists();
    }, []);

    return (
        <div className={style.main}>
            <div id={style.flyingBlock} style={{ "display": { visible } }}>
                <Popup data={activePlaylist} />
            </div>
            {playlists.map(playlist => {
                return (
                    <div key={playlist.id} onClick={e => setActivePlaylist(playlist)}>
                        <Playlist data={playlist} popUpId={style.flyingBlock} />
                    </div>
                );
            })}
        </div>
    );
}