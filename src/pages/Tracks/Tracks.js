import { useEffect, useState } from 'react';
import style from './Tracks.module.css'

import HelperFunctions from '../../HelperFunctions.js'
import DetailedTracks from '../../components/DetailedTracks/DetailedTracks';
export default function Tracks() {

    const [tracks, setTracks] = useState([]);
    let visibleData = 20;

    useEffect(() => {
        fetchTracks();
    }, []);

    async function fetchTracks() {
        let data = await HelperFunctions.fetchTopTracks(visibleData);
        setTracks(data);
    }

    return (
        <div className={style.main}>
            <h1>Tracks</h1>
            <div className={style.content}>
                <DetailedTracks data={tracks} />
            </div>
        </div>
    );
}   