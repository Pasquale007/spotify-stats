import style from './CurrentlyPlaying.module.css'
import { useEffect, useState } from 'react';
import HelperFunctions from '../../HelperFunctions';

export default function CurrentlyPlaying() {
    const [track, setTrack] = useState<Track>();

    useEffect(() => {
        fetchCurrentSong();
    }, []);

    async function fetchCurrentSong() {
        let currentSong: Track | undefined = await HelperFunctions.fetchCurrentSong();
        setTrack(currentSong);
    }

    return (

        <div>
            <h1>Current Song: {track?.name}</h1>
        </div>
    );
}