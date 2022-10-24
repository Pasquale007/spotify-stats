import style from './Hero.module.css'

export default function Hero() {
    const phrase1 = "Die Musik drückt aus, was nicht gesagt werden kann und worüber zu schweigen unmöglich ist.";
    //const phrase1 = "Peace. Love.";
    const phrase2 = "~ Viktor Hugo";
    //const phrase2 = "Music";
    return (
        <div className={style.main}>
            <h1 id={style.catchingPhrase}>
                <b id={style.font}>{phrase1}</b>
                <br />
                <b>{phrase2}</b>
            </h1>
        </div>

    );
}