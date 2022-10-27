
import { useState } from 'react';
import style from './Playlist.module.css'
import spotify_icon from '../../assets/Spotify_Icon_RGB_Green.png'

type props = {
    data: Playlist
}

export default function Playlist({ data }: props) {
    const [playlist, setPlaylist] = useState<Playlist>(data);

    function getImage() {
        let image: string = playlist.images[1]?.url || playlist.images[0].url;
        return image;
    }

    return (
        <div className={style.main}>
            <img src={getImage()} width={"300px"} height={"300px"} alt="Spotify Logo" />
            <div className={style.data}>
                <img src={spotify_icon} width={"100px"} />
                <hr></hr>
                <p>{playlist.name}</p>
                <p>Owner: {playlist.owner?.display_name}</p>
                <p>Total of {playlist.tracks?.total} tracks</p>
                <p>Description:{playlist.description}</p>
            </div>
        </div>
    );
}