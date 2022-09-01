import { useEffect, useState } from 'react';
import style from './Tracks.module.css'

import HelperFunctions from '../../HelperFunctions'
export default function Tracks(props) {

    const [tracks, setTracks] = useState([]);

    useEffect(() => {
        HelperFunctions.fetchTopTracks(20);
    });
    return (
        <div className={style.main}>
            <h1>Tracks</h1>

            <div className={style.content}>




            </div>
        </div>
    );
}   