import style from './HomePage.module.css'
import DisplayGroup from '../../components/DisplayGroup/DisplayGroup';
import HelperFunctions from '../../HelperFunctions.js';

import { useEffect, useState } from 'react';

export default function HomePage() {

    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [visibleData, setVisibleData] = useState(5);
    const [timeRange, setTimeRange] = useState(HelperFunctions.time_ranges.medium);

    useEffect(() => {
        fetchTopTracks();
        fetchTopArtists();
    }, [visibleData, timeRange])

    async function fetchTopTracks() {
        let topTracks = await HelperFunctions.fetchTopTracks(visibleData, timeRange);
        setTopTracks(topTracks);
    }

    async function fetchTopArtists() {
        let topArtists = await HelperFunctions.fetchTopArtist(visibleData, timeRange);
        setTopArtists(topArtists);
    }

    return (
        <div className={style.root}>
            <h1>Home</h1>
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
            <div className={style.main}>
                <DisplayGroup myData={topTracks} title={"Deine Top Tracks"} fontColor="white" linkToMore="/tracks" />
                <DisplayGroup myData={topArtists} title={"Deine Top Künstler"} fontColor="white" linkToMore="/creator" />
            </div>
        </div >
    );
}