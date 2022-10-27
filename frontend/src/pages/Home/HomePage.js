import style from './HomePage.module.css'
import HelperFunctions from '../../HelperFunctions';
import { useEffect, useState } from 'react';
import DetailedTracks from '../../components/DetailedTracks/DetailedTracks';
import Cluster from '../../components/Cluster/Cluster';
import Hero from '../../components/Hero/Hero';
import RotatingWords from '../../components/RotatingWords/RotatingWords';

export default function HomePage() {

    const updatingData = 5;
    const [loading, setLoading] = useState(false);
    const [recommendations, setRecommendations] = useState([]);
    const offer = ["Check your top Tracks", "Check your top Artists",
        "Check every of your playlist", "Edit your playlists", "Check your followed artists"];

    const whyUs = ["It's Free", "No configuration necessary", "Easy to use", "Simple design", "Easy connect via your spotify account", "Access all time history from spotify direct"];

    useEffect(() => {
        //get the element for infinitive loading
        let scrollElement = document.getElementById(style.infinitiveScrollPlaceholder)
        let observer = new IntersectionObserver(element => { loadContent() })
        observer.observe(scrollElement);
        loadContent();
    }, [])

    async function loadContent() {
        if (loading) {
            return;
        }
        setLoading(true);

        let newData = await HelperFunctions.fetchRecommendations(updatingData);
        setRecommendations((state) => { return [...state, ...newData] });
        setLoading(false);
    }

    return (
        <div className={style.root}>
            <section id="hero">
                <Hero />
            </section>
            <RotatingWords />
            <section id="offer">
                <div className={style.offer}>
                    <Cluster data={offer} />
                    <h2>What we offer you?</h2>
                </div>
                <div className={style.offer}>
                    <h2>Why should you use us?</h2>
                    <Cluster data={whyUs} />
                </div>
            </section>
            <section id="recommendations">
                <h1>Our suggestions for you:</h1>
                <div className={style.recommendations}>
                    {recommendations?.map((track) => {
                        return (
                            <DetailedTracks key={track.name + "_" + track.id} data={track} />
                        );
                    })}
                    <div id={style.infinitiveScrollPlaceholder}>
                    </div>
                </div>
            </section>
        </div >
    );
}