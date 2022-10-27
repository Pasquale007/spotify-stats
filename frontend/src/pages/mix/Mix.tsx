import { useEffect, useState } from 'react';
import DetailedTracks from '../../components/DetailedTracks/DetailedTracks';
import Filter from '../../components/Filter/Filter';
import HelperFunctions, { time_ranges } from '../../HelperFunctions';
import style from './Mix.module.css';
import { TagsInput } from "react-tag-input-component";
import Alert from 'react-bootstrap/Alert';

const defaultTracks: Track[] = [];
export default function Mix() {
    const [recommendations, setRecommendations] = useState<Array<Track>>(defaultTracks);
    const [genres, setGenres] = useState([]);
    const [artists, setArtists] = useState("");
    const [tracks, setTracks] = useState("");
    const [items, setItems] = useState(5);
    const [time, setTime] = useState(time_ranges.medium);
    const [showAlert, setShowAlert] = useState(false);
    //TODO: increase
    const maxGenres = 1;

    let timer: ReturnType<typeof setTimeout>;

    useEffect(() => {
        timer = setTimeout(recommendations, 3000);

        async function recommendations() {
            let recommendations = await HelperFunctions.fetchRecommendations(items, "", "", genres.join(","));
            setRecommendations(recommendations);
        }
    }, [genres, artists, tracks, items]);

    useEffect(() => {
        console.log(recommendations);
    }, [recommendations]);

    function validate(e: any) {
        if (genres.length >= maxGenres) {
            setShowAlert(true);
            return false;
        }
        return true;
    }

    function setAlert() {
        if (showAlert) {
            return (
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    sorry the maximum amount of tags has ben reached. Remove other tags to add new ones
                </Alert>
            )
        }
    }
    return (
        <div className={style.main}>

            <h1>Make your own mix</h1>
            {setAlert()}
            <div className={style.tagInput}>
                <label htmlFor="genres">Genres:</label>
                <TagsInput
                    value={genres}
                    beforeAddValidate={e => validate(e)}
                    onChange={(e: any) => {
                        clearTimeout(timer);
                        setGenres(e);
                    }}
                    name="genres"
                    placeHolder="pop, rock, ..."
                />
            </div>
            <p>press enter to add new tag. Current max: {maxGenres}</p>
            <Filter startItems={items} startTime={time} setTimeRange={setTime} setItems={setItems} />
            <div className={style.items}>
                {recommendations.map(recommentation => {
                    return (
                        <DetailedTracks data={recommentation} key={recommentation.id} />
                    );
                })}
            </div>
        </div>
    );
}