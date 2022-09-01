import { useEffect, useState } from 'react';
import style from './Tracks.module.css'

import HelperFunctions from '../../HelperFunctions.js'
import DisplayGroup from '../../components/DisplayGroup/DisplayGroup';
export default function Tracks() {

    const [tracks, setTracks] = useState([]);
    let visibleData = 20;

    useEffect(() => {
        fetchTracks();
    }, []);

    useEffect(() => {
    }, [tracks]);


    async function fetchTracks() {
        let data = await HelperFunctions.fetchTopTracks(visibleData);
        setTracks(data);
    }

    return (
        <div className={style.main}>
            <h1>Tracks</h1>

            <div className={style.content}>
                <DisplayGroup myData={tracks} title={"Deine Top Tracks"} fontColor="white" linkToMore="/tracks" />
            </div>
        </div>
    );
}   