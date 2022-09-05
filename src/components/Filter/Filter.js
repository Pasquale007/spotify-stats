
import HelperFunctions from '../../HelperFunctions';
import style from './Filter.module.css'

export default function Filter({startTime, startItems, setTimeRange, setItems}) {
    return (
        <div id={style.filterBox}>
        <div id={style.setTime}>
            <label htmlFor="time">Set Time: </label>
            <select name="time" onChange={(e) => setTimeRange(e.target.value)} defaultValue={startTime}>
                <option value={HelperFunctions.time_ranges.short}>1 Month</option>
                <option value={HelperFunctions.time_ranges.medium}>6 Month</option>
                <option value={HelperFunctions.time_ranges.long}>All Time</option>
            </select>
        </div>
        <div id={style.setValue}>
            <label htmlFor="number">Show Items: </label>
            <input name="number" type="number" defaultValue={startItems} min='1' max='20' onChange={(e) => { setItems(e.target.value) }} />
        </div>
    </div>
    );
}