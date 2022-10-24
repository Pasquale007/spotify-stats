
import { useState } from 'react';
import style from './Playlist.module.css'
import spotify_icon from '../../assets/Spotify_Icon_RGB_Green.png'
import popUpStyle from '../PopUp/Popup.module.css'

export default function Playlist({ data, popUpId }) {

    const [playlist, setPlaylist] = useState(data);

    function handleClick() {

        //  let data = await HelperFunctions.getPlaylistTracks(playlist.id);
        let element = document.getElementById(popUpId);
        //element.setAttribute("style", "animation:" + popUpStyle.flyIn + " 5s ease-out;");
        element.setAttribute("style", "transform: translateX(0px)");
        element.setAttribute("style", "transform: scale(150%,150%)");
    }

    function getImage() {
        let std = playlist?.images[1]?.url;
        if (std) {
            return std;
        }
        let image = playlist?.images[0]?.url;
        return image;
    }

    return (
        <div className={style.main} alt="Spotify Logo" onClick={handleClick} >
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