import style from './HomePage.module.css'
import DisplayGroup from '../../components/DisplayGroup/DisplayGroup';
import HelperFunctions from '../../HelperFunctions.js';

import { useEffect, useState } from 'react';

export default function HomePage() {
    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);
    const [visibleData, setVisibleData] = useState(5);

    useEffect(() => {
        fetchTopTracks();
        fetchTopArtists();
    }, [visibleData])

    async function fetchTopTracks() {
        let topTracks = await HelperFunctions.fetchTopTracks(visibleData);
        setTopTracks(topTracks);
    }

    async function fetchTopArtists() {
        let topArtists = await HelperFunctions.fetchTopArtist(visibleData);
        setTopArtists(topArtists);
    }

    return (
        <div className={style.root}>
            <h1>Home</h1>
            <div id={style.setValue}>
                <label>Show Items: </label>
                <input type="number" defaultValue={visibleData} min='1' max='50' onChange={(e) => { setVisibleData(e.target.value) }} />
            </div>
            <div className={style.main}>
                <DisplayGroup myData={topTracks} title={"Deine Top Tracks"} fontColor="white" linkToMore="/tracks" />
                <DisplayGroup myData={topArtists} title={"Deine Top Künstler"} fontColor="white" linkToMore="/creator" />
            </div>
        </div >
    );
}