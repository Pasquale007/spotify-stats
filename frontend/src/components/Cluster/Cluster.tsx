
import { useState } from 'react';
import style from './Cluster.module.css'
import note from '../../assets/icons/note.svg'

type props = {
    data: Array<string>
}

export default function Cluster({ data }: props) {
    const [cluster, setCluster] = useState<Array<string>>(data);

    return (
        <div className={style.main}>
            <div className={style.cluster}>
                {cluster.map(field => {
                    return (
                        <div key={field} className={style.box}>
                            <img src={note} width={"75px"} height={"75px"} />
                            <div className={style.dataField} >
                                <h4>{field}</h4>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div >
    );
}