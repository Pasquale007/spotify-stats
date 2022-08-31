import style from './Logout.module.css'
import { useEffect } from 'react';

export default function SpotifyLoginPage() {
    //listens to incomming data as callback
    useEffect(() => {
        sessionStorage.setItem('accessToken', "");
        sessionStorage.setItem('user', JSON.stringify({}))
        window.location.href = "http://localhost:3000";
    }, [])

    return (
        <div className={style.main}>
            <h1 id={style.heading}>You've been logged out</h1>
        </div>
    );

}