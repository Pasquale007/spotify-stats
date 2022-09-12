import { useEffect, useState } from 'react';
import DetailedTracks from '../../components/DetailedTracks/DetailedTracks';
import Filter from '../../components/Filter/Filter';
import HelperFunctions from '../../HelperFunctions';
import style from './Mix.module.css';


export default function Mix() {
    const [recommendations, setRecommendations] = useState([]);
    const [genres, setGenres] = useState("");
    const [artists, setArtists] = useState("");
    const [tracks, setTracks] = useState("");
    const [items, setItems] = useState(5);
    const [time, setTime] = useState(HelperFunctions.time_ranges.medium);

    let timer;
    useEffect(() => {
        timer = setTimeout(recommendations, 5000);

        async function recommendations() {
            let recommendations = await HelperFunctions.fetchRecommendations(items, "", "", genres);
            setRecommendations(recommendations);
        }
    }, [genres, artists, tracks, items]);

    useEffect(() => {
        console.log(recommendations);
    }, [recommendations]);

    return (
        <div className={style.main}>
            <h1>Make your own mix</h1>
            <label htmlFor="genres">Genres:</label>
            <input name='genres' onChange={e => { clearTimeout(timer); setGenres(e.target.value) }}></input>
            <Filter startItems={items} startTime={time} setTimeRange={setTime} setItems={setItems} />
            <div className={style.items}>
                {recommendations.map(recommentation => {
                    return (
                        <DetailedTracks data={recommentation} key={recommentation.id} />
                    );
                })}
            </div>
        </div>
    );
}