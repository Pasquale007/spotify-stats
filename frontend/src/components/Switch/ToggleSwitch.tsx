import { useContext, useEffect, useState } from 'react';
import { ActivePlaylistContext } from '../../Contexts';
import style from './ToggleSwitch.module.css'

type props = {
    name: string,
}

export default function ToggleSwitch({ name }: props) {
    const [toggle, setToggle] = useState<boolean>(false);
    const playlist = useContext<Playlist>(ActivePlaylistContext);

    useEffect(() => {
        if (!playlist) {
            return;
        }
        setToggle(getElement() || false);
    }, [playlist]);

    function getElement() {
        switch (name) {
            case "public":
                return playlist.public
            case "collaborative":
                return playlist.collaborative
        }
    }
    //TODO geht schöner
    function changeValue() {
        switch (name) {
            case "public":
                if (playlist.collaborative) {
                    alert("Collaburativ on Public playlist isn't allowed. Please remove collaburativ befor continue")
                    return;
                }
                playlist.public = !toggle;
                setToggle(!toggle);
                break;
            case "collaborative":
                if (playlist.public) {
                    alert("Collaburativ on Public playlist isn't allowed. Please set Playlist to private to allow collaburativ")
                    return;
                }
                playlist.collaborative = !toggle;
                setToggle(!toggle);
                break;
        }
    }
    return (
        <div className={style.switch} onClick={() => { changeValue() }}>
            <input name={name} type="checkbox" id={style.box} checked={toggle} />
            <span className={style.slider}></span>
        </div >
    );
}