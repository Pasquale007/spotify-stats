import style from './HomePage.module.css'
import DisplayGroup from '../../components/DisplayGroup/DisplayGroup';
import HelperFunctions from '../../HelperFunctions.js';

import { useEffect, useState } from 'react';
import Filter from '../../components/Filter/Filter';
import DetailedTracks from '../../components/DetailedTracks/DetailedTracks';

export default function HomePage() {

    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [visibleData, setVisibleData] = useState(5);
    const [timeRange, setTimeRange] = useState(HelperFunctions.time_ranges.medium);
    const [recommendations, setRecommendations] = useState([]);

    useEffect(() => {
        async function fetchTopTracks() {
            let topTracks = await HelperFunctions.fetchTopTracks(visibleData, timeRange);
            setTopTracks(topTracks);
        }

        async function fetchTopArtists() {
            let topArtists = await HelperFunctions.fetchTopArtists(visibleData, timeRange);
            setTopArtists(topArtists);
        }

        async function recommendations() {
            let recommendations = await HelperFunctions.fetchRecommendations(visibleData, timeRange);
            console.log(recommendations);
            setRecommendations(recommendations);
        }
        fetchTopTracks();
        fetchTopArtists();
        recommendations();
    }, [visibleData, timeRange])

    return (
        <div className={style.root}>
            <h1>Home</h1>
            <Filter startTime={timeRange} setTimeRange={setTimeRange} startItems={visibleData} setItems={setVisibleData} />
            <div className={style.main}>
                <DisplayGroup className={style.displayGroup} myData={topTracks} title={"Your Top Tracks"} fontColor="white" linkToMore="/tracks" />
                <DisplayGroup className={style.displayGroup} myData={topArtists} title={"Your Top Künstler"} fontColor="white" linkToMore="/artists" />
            </div>
            <h1>Our suggestions for you:</h1>
            <div className={style.recommendations}>
                {recommendations?.map((track) => {
                    return (
                        <DetailedTracks key={track.id} data={track} />
                    );
                })}
            </div>
        </div >
    );
}