import React, { useEffect } from "react";
import style from './Popup.module.css'

export default function Popup({ activePlaylist }) {
    useEffect(() => {
        console.log(activePlaylist)
    }, [])

    function close() {
        let element = document.getElementsByClassName(style.root)[0];
        element.setAttribute("style", "transform: translateX(-300vh)");
    }

    return (
        <div className={style.root}>
            <h2 id={style.close} onClick={close}>X</h2>
            {activePlaylist?.name}
        </div>
    );
}