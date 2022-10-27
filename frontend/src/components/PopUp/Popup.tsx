import React, { useContext, useEffect, useState, useRef } from "react";
import { ActivePlaylistContext } from "../../Contexts";
import HelperFunctions from "../../HelperFunctions";
import ToggleSwitch from "../Switch/ToggleSwitch";
import style from './Popup.module.css'

export default function Popup() {
    const refName = useRef<HTMLInputElement>(null);
    const refDesc = useRef<HTMLTextAreaElement>(null);
    const playlist = useContext<Playlist>(ActivePlaylistContext);

    useEffect(() => {
        console.log(playlist);
    }, [playlist]);

    useEffect(() => {
        if (playlist && playlist.id !== -1) {
            let userName = JSON.parse(sessionStorage.getItem("user")!).display_name;
            if (playlist.owner.display_name === userName) {
                open();
            } else {
                alert("You dont have permission to edit this playlist.")
            }

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
    async function handleSubmit() {
        let data: any = {
            name: refName?.current?.value || "",
            description: refDesc?.current?.value || "",
            public: playlist.public,
            collaborative: playlist.collaborative,
        }
        HelperFunctions.updatePlaylist(playlist.id, data).then((e) => {
            close();
            console.log(e);
            // window.location.reload();
        }).catch(e => { console.log("Error"); console.log(e) });
    }

    return (
        <div id={style.root}>
            <h2 id={style.close} onClick={close}>X</h2>
            <div className={style.formInput} >
                <label htmlFor="name">
                    Name*:
                    <input name="name" type="text" ref={refName} defaultValue={playlist?.name} required></input>
                </label>
                <label htmlFor="desc">
                    Description:
                    <textarea name="desc" id={style.textarea} ref={refDesc} defaultValue={playlist?.description}></textarea>
                </label>
                <label htmlFor="public">
                    Public:
                    <ToggleSwitch name="public" />
                </label>
                <label htmlFor="collaborative">
                    Collaborative:
                    <ToggleSwitch name="collaborative" />
                </label>
                <input type="submit" value="Submit" onClick={handleSubmit} />
                <p>* are required</p>
            </div>
        </div>
    );
}