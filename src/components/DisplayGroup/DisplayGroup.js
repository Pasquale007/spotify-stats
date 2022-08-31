import { useEffect, useState } from "react";
import Track from "../Track/Track";
import style from './DisplayGroup.module.css'
import { Link } from 'react-router-dom';

export default function DisplayGroup({ myData, number, title, fontColor, linkToMore }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        setData(myData);
    }, []);

    return (
        <div className={style.main}>
            <h2 style={{ color: fontColor }}>{title}</h2>
            <hr style={{ color: fontColor }}></hr>
            {myData.slice(0, number).map(element => {
                return (
                    <div>
                        <div key={element.id} className={style.infoBlock}>
                            <Track myTrack={element} fontColor={fontColor} />
                        </div>
                        <hr style={{ color: fontColor }}></hr>
                    </div>
                );
            })}
            <Link
                className={style.link}
                to={{
                    pathname: linkToMore,
                }}>
                <p style={{ color: fontColor }} id={style.more}>. . .</p>
            </Link>
        </div>
    );
}