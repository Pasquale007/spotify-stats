
import style from './RotatingWords.module.css'

export default function RotatingWords() {
    const rotatingWords = ["understanding", "checking", "controlling", "editing", "comparing"];

    return (
        <div className={style.rotatingWords}>
            <h1>Are you intested in </h1>
            <div className={style.words}>
                {rotatingWords.map(word => {
                    return (
                        <div className={style.rotatingSpan}><h1>{word}</h1></div>
                    );
                })}
            </div>
            <h1> your spotify behavior?</h1>
        </div>
    );
}