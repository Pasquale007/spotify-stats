
import { useEffect, useState } from 'react';
import DetailedArtists from '../../components/DetailedArtists/DetailedArtists';
import Filter from '../../components/Filter/Filter';
import HelperFunctions from '../../HelperFunctions';
import style from './Artists.module.css'

export default function Artists() {

    const [artists, setArtists] = useState([]);
    const [visibleData, setVisibleData] = useState(5);
    const [timeRange, setTimeRange] = useState(HelperFunctions.time_ranges.medium);

    useEffect(() => {
        fetchArtists();
    }, [visibleData, timeRange]);

    async function fetchArtists() {
        let data = await HelperFunctions.fetchTopArtists(visibleData, timeRange);
        setArtists(data);
    }

    return (
        <div className={style.main}>
            <h1>Artists</h1>
            <Filter startTime={timeRange} setTimeRange={setTimeRange} startItems={visibleData} setItems={setVisibleData} />
            <div className={style.content}>
                {artists.map(artist => {
                    return (
                        <DetailedArtists key={artist.id} data={artist} />
                    )
                })}
            </div>
        </div>
    );
} 