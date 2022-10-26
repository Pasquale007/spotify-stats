
import { time_ranges } from '../../HelperFunctions';
import style from './Filter.module.css';

type props = {
    startTime: string,
    startItems: number,
    setTimeRange: Function,
    setItems: Function,
}

export default function Filter({ startTime, startItems, setTimeRange, setItems }: props) {

    return (
        <div id={style.filterBox}>
            <div id={style.setTime}>
                <label htmlFor="time">Set Time: </label>
                <select name="time" onChange={(e) => setTimeRange(e.target.value)} defaultValue={startTime}>
                    <option value={time_ranges.short}>1 Month</option>
                    <option value={time_ranges.medium}>6 Month</option>
                    <option value={time_ranges.long}>All Time</option>
                </select>
            </div>
            <div id={style.setValue}>
                <label htmlFor="number">Show Items: </label>
                <input name="number" type="number" defaultValue={startItems} min='1' max='50' onChange={(e) => { setItems(e.target.value) }} />
            </div>
        </div>
    );
}