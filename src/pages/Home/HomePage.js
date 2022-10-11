import style from './HomePage.module.css'
import HelperFunctions from '../../HelperFunctions.js';
import { useEffect, useState } from 'react';
import DetailedTracks from '../../components/DetailedTracks/DetailedTracks';
import Cluster from '../../components/Cluster/Cluster';

export default function HomePage() {

    const [visibleData, setVisibleData] = useState(5);
    const [timeRange, setTimeRange] = useState(HelperFunctions.time_ranges.medium);
    const [recommendations, setRecommendations] = useState([]);

    const rotatingWords = ["understanding", "checking", "controlling", "editing", "comparing"];
    const offer = ["Check your top Tracks", "Check your top Artists",
        "Check every of your playlist", "Edit your playlists", "Check your followed artists"];

    const whyUs = ["It's Free", "No configuration necessary", "Easy to use", "Simple design", "Easy connect via your spotify account", "Access all time history from spotify direct"];

    useEffect(() => {
        //get the element for infinitive loading
        let scrollElement = document.getElementById(style.infinitiveScrollPlaceholder)
        let observer = new IntersectionObserver(element => { loadContent() })
        observer.observe(scrollElement)
    }, [])

    useEffect(() => {
        async function recommendations() {
            let recommendations = await HelperFunctions.fetchRecommendations(visibleData);
            setRecommendations(recommendations);
        }
        recommendations();
    }, [visibleData, timeRange])

    async function loadContent() {
        let newData = await HelperFunctions.fetchRecommendations(visibleData);
        setRecommendations(recommendations => [...recommendations, ...newData])
    }

    return (
        <div className={style.root}>
            <div className={style.rotatingWords}>
                <h1>Are you intested in </h1>
                <div className={style.words}>
                    {rotatingWords.map(word => {
                        return (
                            <div className={style.rotatingSpan}><h1>{word}</h1></div>
                        );
                    })}
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
                    { console.log(track) }
                    return (
                        < DetailedTracks key={track.name + "_" + track.id} data={track} />
                    );
                })}
                <div id={style.infinitiveScrollPlaceholder}>
                    <p>asdf</p>
                </div>
            </div>
        </div >
    );
}