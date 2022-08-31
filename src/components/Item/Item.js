import { Link } from 'react-router-dom';

import style from './Item.module.css'

function Item({ content, link }) {

    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <div className={style.main}>
                <p>{content}</p>
            </div>
        </Link>
    )
}

export default Item;