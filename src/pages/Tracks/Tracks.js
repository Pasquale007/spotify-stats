import { useEffect, useState } from 'react';
import style from './Tracks.module.css'

import HelperFunctions from '../../HelperFunctions.js'
import DetailedTracks from '../../components/DetailedTracks/DetailedTracks';
import Filter from '../../components/Filter/Filter';
export default function Tracks() {

    const [tracks, setTracks] = useState([]);
    const [genres, setGenres] = useState([]);
    const [visibleData, setVisibleData] = useState(5);
    const [timeRange, setTimeRange] = useState(HelperFunctions.time_ranges.medium);

    useEffect(() => {
        fetchTracks();
    }, [visibleData, timeRange]);

    useEffect(() => {
        let list = [];
        for (let i = 0; i < tracks.length; i++) {
            for (let j = 0; j < tracks[i].genres.length; j++) {
                let genre = tracks[i].genres[j];
                if (list.find(e => e.name === genre)) {
                    for (let index in list) {
                        if (list[index].name === genre) {
                            list[index].number += 1;
                        }
                    }
                } else {
                    let element = {
                        name: genre,
                        number: 1
                    }
                    list.push(element);
                }
            }
        }
        list.sort((a, b) => {
            return b.number - a.number;
        });
        setGenres(list);
    }, [tracks]);

    async function fetchData(data) {
        for (let i = 0; i < data.length; i++) {
            let result = await HelperFunctions.getArtistsGenres(data[i]);
            data[i].genres = result;
        }
    }

    async function fetchTracks() {
        let data = await HelperFunctions.fetchTopTracks(visibleData, timeRange);
        await fetchData(data);
        setTracks(data);
    }

    return (
        <div className={style.main}>
            <h1>Tracks</h1>
            <Filter startTime={timeRange} setTimeRange={setTimeRange} startItems={visibleData} setItems={setVisibleData} />
            <h3>Genres:</h3>
            <div className={style.genres}>
                {genres.map(genre => {
                    return (
                        <div>
                            <p>{genre.name}: {genre.number}</p>
                        </div>
                    );
                }
                )}
            </div>

            <div className={style.flex}>
                {tracks.map(track => {
                    return (
                        <DetailedTracks key={track.id} data={track} />
                    )
                })}
            </div>
        </div>
    );
}   