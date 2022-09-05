import style from './HomePage.module.css'
import DisplayGroup from '../../components/DisplayGroup/DisplayGroup';
import HelperFunctions from '../../HelperFunctions.js';

import { useEffect, useState } from 'react';
import Filter from '../../components/Filter/Filter';

export default function HomePage() {

    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [visibleData, setVisibleData] = useState(5);
    const [timeRange, setTimeRange] = useState(HelperFunctions.time_ranges.medium);

    useEffect(() => {
        async function fetchTopTracks() {
            let topTracks = await HelperFunctions.fetchTopTracks(visibleData, timeRange);
            setTopTracks(topTracks);
        }

        async function fetchTopArtists() {
            let topArtists = await HelperFunctions.fetchTopArtists(visibleData, timeRange);
            setTopArtists(topArtists);
        }

        fetchTopTracks();
        fetchTopArtists();
    }, [visibleData, timeRange])

    return (
        <div className={style.root}>
            <h1>Home</h1>
            <Filter startTime={timeRange} setTimeRange={setTimeRange} startItems={visibleData} setItems={setVisibleData} />
            <div className={style.main}>
                <DisplayGroup className={style.displayGroup} myData={topTracks} title={"Your Top Tracks"} fontColor="white" linkToMore="/tracks" />
                <DisplayGroup className={style.displayGroup} myData={topArtists} title={"Your Top Künstler"} fontColor="white" linkToMore="/artists" />
            </div>
        </div >
    );
}