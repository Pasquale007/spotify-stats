import style from './HomePage.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpoint } from '../../_defaultValues'

import Track from '../../components/Track/Track';
import DisplayGroup from '../../components/DisplayGroup/DisplayGroup';
import HelperFunctions from '../../HelperFunctions';


export default function HomePage() {
    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);

    useEffect(() => {
        fetchTopTracks();
        fetchTopArtists();
    }, [])

    async function fetchTopTracks() {
        let topTracks = await HelperFunctions.fetchTopTracks(5);
        setTopTracks(topTracks);
    }

    async function fetchTopArtists() {
        let topArtists = await HelperFunctions.fetchTopArtist(5);
        setTopArtists(topArtists);
    }

    return (
        <div className={style.root}>
            <h1>Home</h1>
            <div className={style.main}>
                <DisplayGroup myData={topTracks} number={5} title={"Deine Top Tracks"} fontColor="white" linkToMore="/tracks" />
                <DisplayGroup myData={topArtists} number={5} title={"Deine Top Künstler"} fontColor="white" linkToMore="/creator" />
            </div>
        </div >
    );
}