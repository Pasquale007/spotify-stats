
import { useEffect, useState } from 'react';
import style from './Playlist.module.css'

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
        console.log("do sth");
    }
    return (
        <div className={style.main} onClick={click}>
            <img src={getImage()} width={"300px"} height={"300px"} />
            <div className={style.data}>
                <h3>{playlist?.name}</h3>
                <h3>Description:{playlist?.description}</h3>
                <h3>Owner: {playlist?.owner?.display_name}</h3>
                <h3>Total of {playlist?.tracks?.total} tracks</h3>
            </div>
        </div>
    );
}