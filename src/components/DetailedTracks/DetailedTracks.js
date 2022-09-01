import { useEffect, useState } from "react";
import HelperFunctions from "../../HelperFunctions";
import style from './DetailedTracks.module.css'

import spotify_icon from '../../assets/Spotify_Icon_RGB_Green.png'

export default function DetailedTracks({ data }) {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        console.log(data);
        setTracks(data);
        HelperFunctions.getTrackInfoHref(data[0]);
    }, [])
    useEffect(() => {
        console.log(tracks);
    }, [tracks])

    function getArtists(artists) {
        let result = "";
        for (let i = 0; i < artists.length; i++) {
            result += artists[i].name + ", ";
        }
        return result.slice(0, result.length - 2);
    }

    return (
        <div>
            {data.map(track => {
                return (
                    <div>
                        <div key={track.id} className={style.infoBlock}>
                            <img src={track.album.images[1].url} />
                            <div className={style.detailedView}>
                                <img src={spotify_icon} width="100px" id={style.thumbnail}/>
                                <hr />
                                <p> Name: {track.name}</p>
                                <p> Album: {track.album.name}</p>
                                <p>Von:</p>
                                <p> {getArtists(track.album.artists)}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div >
    );
}