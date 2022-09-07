import { useState } from "react";

export default function Track({ myTrack, fontColor }) {
    const [track, setTrack] = useState(myTrack);

    return (
        <div key={myTrack.id}>
            <p style={{ color: fontColor }}>{track.name}</p>
        </div>
    );

}