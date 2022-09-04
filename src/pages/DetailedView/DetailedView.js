import axios from "axios";
import { useEffect, useState } from "react";
import Rating from "react-rating";
import { useParams } from "react-router-dom";
import { endpoint } from "../../_defaultValues";
import style from "./DetailedView.module.css";

import { IoMusicalNotesOutline } from "react-icons/io5";
import { IoMusicalNotes } from "react-icons/io5";
import { AiFillClockCircle } from "react-icons/ai";

export default function DetailedView() {
    const [track, setTrack] = useState({});
    const { id } = useParams();
    const rating = track?.popularity / 20;
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        console.log(track)

    }, [track]);

    function getAvailableCountries() {
        const maxCountriesDisplayed = 5;
        if (track?.available_markets?.length > maxCountriesDisplayed) {
            return track?.available_markets?.slice(0, maxCountriesDisplayed).join(", ") + " and " + (track?.available_markets.length - 5) + " more";
        }
        return track?.available_markets?.join(", ");
    }

    async function fetchData() {
        await axios.get(endpoint + "/tracks/" + id)
            .then(response => { setTrack(response.data) })
            .catch(err => { console.log(err) });
    }

    function getDuration() {
        let durationInMs = track.duration_ms;
        let durationInM = durationInMs / 1000 / 60;
        return (Math.round(durationInM * 100) / 100) + "min";
    }

    function openInNewTab() {
        window.open(track?.external_urls?.spotify, '_blank').focus();
    }

    return (
        <div className={style.main}>
            <h1>"{track?.name}" from album: "{track?.album?.name}"</h1>
            <img src={track?.album?.images[0]?.url} />
            <hr></hr>
            <Rating
                fractions={10}
                initialRating={rating}
                emptySymbol={<IoMusicalNotesOutline size="70" />}
                fullSymbol={<IoMusicalNotes size="70" />}
                readonly
            />
            <h2>Available Countries: {getAvailableCountries()}</h2>
            <h2>Artists:</h2>
            <div className={style.artists}>
                {track?.artists?.map(artist => {
                    return (
                        <h3 key={artist.id}>- {artist.name}</h3>
                    );
                })}
            </div>
            <h2>Release Date: {track?.album?.release_date}</h2>
            <h2>Type: {track?.album?.album_type}: {track?.album?.total_tracks}</h2>
            <h2>{<AiFillClockCircle />}: {getDuration()}</h2>
            <h2 id={style.openInSpotifyLink} onClick={openInNewTab}>Open in Spotify</h2>
        </div>
    );
}