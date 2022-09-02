import { useEffect, useState } from 'react';
import style from './Tracks.module.css'

import HelperFunctions from '../../HelperFunctions.js'
import DetailedTracks from '../../components/DetailedTracks/DetailedTracks';
export default function Tracks() {

    const [tracks, setTracks] = useState([]);
    const [visibleData, setVisibleData] = useState(5);
    const [timeRange, setTimeRange] = useState(HelperFunctions.time_ranges.medium);

    useEffect(() => {
        fetchTracks();
    }, [visibleData, timeRange]);

    async function fetchData(data) {
        for (let i = 0; i < data.length; i++) {
            let result = await HelperFunctions.getArtistsGenres(data[i]);
            data[i].genres = result;
        }
    }

    async function fetchTracks() {
        let data = await HelperFunctions.fetchTopTracks(visibleData, timeRange);
        await fetchData(data);
        setTracks(data);
    }

    return (
        <div className={style.main}>
            <h1>Tracks</h1>
            <div id={style.filterBox}>
                <div id={style.setTime}>
                    <label htmlFor="time">Set Time: </label>
                    <select name="time" onChange={(e) => setTimeRange(e.target.value)} defaultValue={HelperFunctions.time_ranges.medium}>
                        <option value={HelperFunctions.time_ranges.short}>1 Month</option>
                        <option value={HelperFunctions.time_ranges.medium}>6 Month</option>
                        <option value={HelperFunctions.time_ranges.long}>All Time</option>
                    </select>
                </div>
                <div id={style.setValue}>
                    <label htmlFor="number">Show Items: </label>
                    <input name="number" type="number" defaultValue={visibleData} min='1' max='20' onChange={(e) => { setVisibleData(e.target.value) }} />
                </div>
            </div>
            <div className={style.content}>
                {tracks.map(track => {
                    return (
                        <DetailedTracks key={track.id} data={track} />
                    );
                })}
            </div>
        </div>
    );
}   