import { useState } from "react";

type props = {
    myTrack: any,
    fontColor: string,
}

export default function Track({ myTrack, fontColor }: props) {
    const [track, setTrack] = useState(myTrack);

    return (
        <div key={myTrack.id}>
            <p style={{ color: fontColor }}>{track.name}</p>
        </div>
    );

}