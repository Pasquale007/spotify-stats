import { useEffect, useState } from "react";
import DetailedArtists from "../../components/DetailedArtists/DetailedArtists.js";
import HelperFunctions from "../../HelperFunctions";
import style from './FollowedArtists.module.css'

export default function FollowedArtists() {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        async function fetchFollower() {
            let followedArtists = await HelperFunctions.fetchFollowedArtists();
            setArtists(followedArtists);
        }
        fetchFollower();
    }, []);

    return (
        <div className={style.root}>
            <h1>Your followed artists</h1>
            <div className={style.main}>
                {artists.map(artist => {
                    return (
                        <DetailedArtists key={artist.id} data={artist} />
                    )
                })}
            </div>

        </div>

    );
}