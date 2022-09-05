import { useState } from 'react';
import style from './DetailedArtists.module.css'

import spotify_icon from '../../assets/Spotify_Icon_RGB_Green.png'
import Rating from 'react-rating';

import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoMusicalNotes } from "react-icons/io5";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

export default function DetailedArtists({ data }) {
    const [artist, setArtist] = useState(data);

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
        window.open(artist?.external_urls?.spotify).focus();
    }

    return (
        <OverlayTrigger
            key={'right'}
            placement={'right'}
            overlay={
                <Tooltip>
                    Open in spotify
                </Tooltip>
            }>

            <div className={style.infoBlock} onClick={click}>

                <svg width="0" height="0">
                    <linearGradient id="gradient" x1="0%" x2="100%">
                        <stop stopColor="var(--primary-color)" offset="0%" />
                        <stop stopColor="transparent" offset="100%" />
                    </linearGradient>
                </svg>
                <img src={artist?.images[1]?.url} />
                <div className={style.detailedView}>
                    <img src={spotify_icon} width="100px" id={style.thumbnail} />
                    <hr />
                    <p> Name: {artist?.name}</p>
                    <p> Followers: {artist?.followers?.total}</p>
                    <p> Genres: {getGenre(artist?.genres)}</p>
                    <Rating
                        className={style.rating}
                        fractions={10}
                        initialRating={(artist?.popularity / 20)}
                        emptySymbol={<IoMusicalNotesOutline size="30" style={{ stroke: "var(--primary-color)" }} />}
                        fullSymbol={<IoMusicalNotes size="30" style={{ fill: "var(--primary-color)" }} />}
                        readonly
                    />
                </div>
            </div >
        </OverlayTrigger>
    );
}