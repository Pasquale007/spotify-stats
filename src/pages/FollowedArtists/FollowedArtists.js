import { useEffect, useState } from "react";
import DetailedArtists from "../../components/DetailedArtists/DetailedArtists";
import HelperFunctions from "../../HelperFunctions";
import style from './FollowedArtists.module.css'

export default function FollowedArtists() {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        async function fetchFollower() {
            let followedArtists = await HelperFunctions.fetchFollowedArtists(5);
            setArtists(followedArtists);
        }
        fetchFollower();
    }, []);

    return (
        <div className={style.main}>
            {artists.map(artist => {
                return (
                    <DetailedArtists key={artist.id} data={artist} />
                )
            })}
        </div>
    );
}