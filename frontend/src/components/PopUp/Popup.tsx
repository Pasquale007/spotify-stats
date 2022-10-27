import { AxiosResponse } from "axios";
import React, { useContext, useEffect, useState } from "react";
import { ActivePlaylistContext } from "../../Contexts";
import HelperFunctions from "../../HelperFunctions";
import ToggleSwitch from "../Switch/ToggleSwitch";
import style from './Popup.module.css'

export default function Popup() {
    const [editable, setEditable] = useState<boolean>(false);
    const playlist = useContext<Playlist>(ActivePlaylistContext);

    useEffect(() => {
        let popup = document.getElementById(style.root);
        if (editable === false) {
            //sth like this
            // popup.style.pointerEvents = "none";
        }
    }, [editable])

    useEffect(() => {
        if (playlist && playlist.id !== -1) {
            let userName = JSON.parse(sessionStorage.getItem("user")!).display_name;
            if (playlist.owner.display_name === userName) {
                setEditable(true);
            } else {
                setEditable(false);
            }
            open();
        }
    }, [playlist])

    function open() {
        let element: HTMLElement = document.getElementById(style.root)!;
        element.style.transform = "translateX(0vh)"
        element.style.transform = "scale(150%,150%)"
    }

    function close() {
        let element: HTMLElement = document.getElementById(style.root)!;
        element.style.transform = "translateX(-300vh)"
    }

    //Wird nicht aufgerufen
    async function submit() {
        console.log("Error. Not implemented yet. Sorry");
        let response: AxiosResponse = await HelperFunctions.updatePlaylist(playlist.id);
        console.log(response);
        close();
    }

    return (
        <div id={style.root}>
            <h2 id={style.close} onClick={close}>X</h2>
            <form className={style.formInput} onSubmit={e => submit}>
                <label htmlFor="name">
                    Name*:
                    <input name="name" type="text" defaultValue={playlist?.name} required></input>
                </label>
                <label htmlFor="desc">
                    Description:
                    <textarea name="desc" id={style.textarea} defaultValue={playlist?.description}></textarea>
                </label>
                <label htmlFor="public">
                    Public:
                    <ToggleSwitch value={playlist?.public || false} name="public" />

                </label>
                <label htmlFor="collab">
                    Collaborative:
                    <ToggleSwitch value={playlist?.collaborative || false} name="collab" />
                </label>
                <input type="submit" value="Submit" />
                <p>* are required</p>
            </form>
        </div>
    );
}