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
    function getFollowers() {
        let follower = artist?.followers?.total;
        follower = follower.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return follower;

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

            <div className={style.main} onClick={click}>
                <img src={artist?.images[1]?.url}  max-width="100%"/>
                <div className={style.data}>
                    <img src={spotify_icon} width="100px" id={style.thumbnail} />
                    <hr />
                    <p> Name: {artist?.name}</p>
                    <p> Followers: {getFollowers()}</p>
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