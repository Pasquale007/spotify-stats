import React, { useContext, useEffect, useState } from "react";
import { ActivePlaylistContext } from "../../Contexts";
import ToggleSwitch from "../Switch/ToggleSwitch";
import style from './Popup.module.css'

export default function Popup() {
    const [editable, setEditable] = useState(false);
    const playlist = useContext(ActivePlaylistContext);

    useEffect(() => {
        if (playlist) {
            let playlistName = JSON.parse(sessionStorage.getItem("user")).display_name;
            if (playlist.owner.display_name === playlistName) {
                setEditable(true);
            } else {
                setEditable(false);
            }
            open();
        }
    }, [playlist])

    function open() {
        let element = document.getElementById(style.root);
        console.log(playlist)
        element.setAttribute("style", "transform: translateX(0vh)");
        element.setAttribute("style", "transform: scale(150%,150%)");
    }

    function close() {
        let element = document.getElementById(style.root);
        element.setAttribute("style", "transform: translateX(-300vh)");
    }

    //Wird nicht aufgerufen
    function submit() {
        console.log("Error. Not implemented yet. Sorry");
        close();
    }

    return (
        <div id={style.root}>
            <h2 id={style.close} onClick={close}>X</h2>
            <form className={style.formInput} onSubmit={e => submit}>
                <label htmlFor="name">
                    Name:
                    <input name="name" type="text" defaultValue={playlist?.name}></input>
                </label>
                <label htmlFor="desc">
                    Description:
                    <textarea name="desc" id={style.textarea} defaultValue={playlist?.description}></textarea>
                </label>
                <label htmlFor="public">
                    Public:
                    <ToggleSwitch value={playlist?.public} name="public" />

                </label>
                <label htmlFor="collab">
                    Collaborative:
                    <ToggleSwitch value={playlist?.collaborative} name="collab"/>
                </label>

                <input type="submit" value="Submit" />

            </form>

        </div>
    );
}