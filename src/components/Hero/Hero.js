import style from './Hero.module.css'

export default function Hero() {
    const phrase1 = " Music connects.";
    const phrase2 = " Let's connect together.";
    return (
        <div className={style.main}>
            <h1 id={style.catchingPhrase}>
                <b>{phrase1}</b>
                <br />
                <b>{phrase2}</b>
            </h1>
        </div>

    );
}