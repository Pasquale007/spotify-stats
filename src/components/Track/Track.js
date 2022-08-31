import { useEffect, useState } from "react";

export default function Track({ myTrack, fontColor }) {
    const [track, setTrack] = useState([]);

    useEffect(() => {
        setTrack(myTrack);
    }, []);

    return (
        <div>
            <p style={{ color: fontColor }}>{track.name}</p>
        </div>
    );

}