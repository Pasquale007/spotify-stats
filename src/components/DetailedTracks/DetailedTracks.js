import { useState } from "react";
import style from './DetailedTracks.module.css'
import spotify_icon from '../../assets/Spotify_Icon_RGB_Green.png'

import { me } from '../../_defaultValues'

export default function DetailedTracks({ data }) {
    const [track, setTrack] = useState(data);

    function getArtists(artists) {
        let result = "";
        for (let i = 0; i < artists.length; i++) {
            result += artists[i].name + ", ";
        }
        return result.slice(0, result.length - 2);
    }

    function getGenre(genres) {
        if (!genres || genres.length === 0) {
            return "---";
        }
        let result = "";
        for (let i = 0; i < genres.length; i++) {
            let genre = genres[i];
            if (result.includes(", " + genre + ",")) {
                continue;
            }
            result += genre + ", ";
        }

        return result.slice(0, result.length - 2);
    }

    function click() {
        console.log(track.id);
        window.location.href = me + "/details/" + track.id;
    }

    return (
        <div className={style.infoBlock} onClick={click} >
            <img src={track.album.images[1].url} />
            <div className={style.detailedView}>
                <img src={spotify_icon} width="100px" id={style.thumbnail} />
                <hr />
                <p> Name: {track.name}</p>
                <p> Album: {track.album.name}</p>
                <p>Von:</p>
                <p> {getArtists(track.album.artists)}</p>
                <p> Genres: {getGenre(track.genres)}</p>
            </div>
        </div >
    );
}