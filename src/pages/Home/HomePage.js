import style from './HomePage.module.css'
import HelperFunctions from '../../HelperFunctions.js';
import { useEffect, useState } from 'react';
import DetailedTracks from '../../components/DetailedTracks/DetailedTracks';
import Cluster from '../../components/Cluster/Cluster';

export default function HomePage() {

    const [visibleData, setVisibleData] = useState(5);
    const [timeRange, setTimeRange] = useState(HelperFunctions.time_ranges.medium);
    const [recommendations, setRecommendations] = useState([]);

    const offer = ["Check your top Tracks", "Check your top Artists",
        "Check every of your playlist", "Edit your playlists", "Check your followed artists"];

    const whyUs = ["It's Free", "Easy to use", "Simple design", "Easy connect via your spotify account"];

    useEffect(() => {
        async function recommendations() {
            let recommendations = await HelperFunctions.fetchRecommendations(visibleData, timeRange);
            setRecommendations(recommendations);
        }
        recommendations();
    }, [visibleData, timeRange])

    return (
        <div className={style.root}>
            <div className={style.rotatingWords}>
                <h1>Are you intested in </h1>
                <div className={style.words}>
                    <span className={style.rotatingSpan}><h1>understanding</h1></span>
                    <span className={style.rotatingSpan}><h1>checking</h1></span>
                    <span className={style.rotatingSpan}><h1>controlling</h1></span>
                    <span className={style.rotatingSpan}><h1>editing</h1></span>
                    <span className={style.rotatingSpan}><h1>comparing</h1></span>
                </div>
                <h1> your spotify behavior?</h1>
            </div>
            <div className={style.offer}>
                <Cluster data={offer} />
                <h2>What we offer you?</h2>
            </div>
            <div className={style.offer}>
                <h2>Why should you use us?</h2>
                <Cluster data={whyUs} />
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