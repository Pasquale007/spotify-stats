import { useEffect, useState } from 'react';
import Playlist from '../../components/Playlist/Playlist';
import HelperFunctions from '../../HelperFunctions';
import style from './Playlists.module.css'

export default function Playlists() {

    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        async function fetchUserPlaylists() {
            let data = await HelperFunctions.fetchUserPlaylists();
            setPlaylists(data);
        }

        fetchUserPlaylists();
    }, []);

    return (
        <div className={style.main}>
            {playlists.map(playlist => {
                return (
                    <Playlist key={playlist.id} data={playlist} />
                );
            })}


        </div>
    );
}