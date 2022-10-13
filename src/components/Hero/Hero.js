import RotatingWords from '../RotatingWords/RotatingWords';
import style from './Hero.module.css'

export default function Hero() {

    return (
        <div className={style.main}>
            <h1 id={style.catchingPhrase}>
                Music connects. <br /> Let's connect together.
            </h1>
        </div>

    );
}