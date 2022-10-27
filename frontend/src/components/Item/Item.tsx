import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import style from './Item.module.css'

type props = {
    content: string,
    link: string
}

function Item({ content, link }: props) {

    return (
        <Link to={link} style={{ textDecoration: 'none' }}>
            <div className={style.main}>
                <p>{content}</p>
            </div>
        </Link>
    )
}

export default Item;