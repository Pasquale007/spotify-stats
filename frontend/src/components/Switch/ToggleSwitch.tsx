import { useState } from 'react';
import style from './ToggleSwitch.module.css'

type props = {
    value: boolean,
    name: string,
}

export default function ToggleSwitch({ value, name }: props) {
    const [toggle, setToggle] = useState(value);

    return (
        <div className={style.switch} onClick={() => setToggle(!toggle)}>
            <input name={name} type="checkbox" id={style.box} checked={toggle} />
            <span className={style.slider}></span>
        </div >
    );
}