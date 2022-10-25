import { useState } from 'react';
import style from './ToggleSwitch.module.css'

export default function ToggleSwitch({ value, name }) {
    const [toggle, setToggle] = useState(value);

    return (
        <div className={style.switch} onClick={() => setToggle(!toggle)}>
            <input name={name} type="checkbox" id={style.box} checked={toggle} />
            <span class={style.slider}></span>
        </div >
    );
}