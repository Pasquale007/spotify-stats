import style from './HomePage.module.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { endpoint } from '../../_defaultValues'

import Track from '../../components/Track/Track';
import DisplayGroup from '../../components/DisplayGroup/DisplayGroup';


export default function HomePage() {
    const [topTracks, setTopTracks] = useState([]);
    const [topArtists, setTopArtists] = useState([]);

    useEffect(() => {
        fetchTopTracks();
        fetchTopArtists();
    }, [])

    useEffect(() => {
        console.log("Tracks reloaded");
    }, [topTracks])

    function fetchTopTracks() {
        axios.get(endpoint + "/me/top/tracks", {
            type: "tracks",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
            .then(response => { setTopTracks(response.data.items); })
            .catch(err => console.log(err));
    }

    function fetchTopArtists() {
        axios.get(endpoint + "/me/top/artists", {
            type: "artists",
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
            .then(response => { setTopArtists(response.data.items) })
            .catch(err => console.log(err));
    }

    return (
        <div className={style.root}>
            <h1>Home</h1>
            <div className={style.main}>
                <DisplayGroup myData={topTracks} number={5} title={"Deine Top Tracks"} fontColor="white" linkToMore="/tracks"/>
                <DisplayGroup myData={topArtists} number={5} title={"Deine Top Künstler"} fontColor="white" linkToMore="/creator" />
            </div>
        </div >
    );
}