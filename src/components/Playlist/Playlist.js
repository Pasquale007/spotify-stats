
import { useEffect, useState } from 'react';
import style from './Playlist.module.css'
import spotify_icon from '../../assets/Spotify_Icon_RGB_Green.png'

export default function Playlist({ data }) {

    const [playlist, setPlaylist] = useState(data);

    useEffect(() => {
        console.log(playlist);
    }, [playlist]);

    function getImage() {
        let std = playlist?.images[1]?.url;
        if (std) {
            return std;
        }
        let image = playlist?.images[0]?.url;
        return image;
    }

    function click() {
        alert("Sorry. This function is currently not available");
    }

    return (
        <div className={style.main} onClick={click} alt="Spotify Logo">
            <img src={getImage()} width={"300px"} height={"300px"} />
            <div className={style.data}>
                <img src={spotify_icon} width={"100px"} />
                <hr></hr>
                <p>{playlist?.name}</p>
                <p>Owner: {playlist?.owner?.display_name}</p>
                <p>Total of {playlist?.tracks?.total} tracks</p>
                <p>Description:{playlist?.description}</p>
            </div>
        </div>
    );
}