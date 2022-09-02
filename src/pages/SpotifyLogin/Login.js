import style from './Login.module.css'
import { AUTH_ENDPOINT, CLIENT_ID, REDIRECT_URI_ENCODED, RESPONSE_TYPE } from '../../_defaultValues'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image'

import SpotifyLogo from '../../assets/Spotify_Logo_RGB_Green.png'

export default function SpotifyLoginPage() {
    const scopes = 'user-top-read user-read-private user-read-currently-playing user-read-recently-played user-read-playback-state user-modify-playback-state';

    function loggedIn() {
        var state = generateRandomString(16);
        sessionStorage.setItem("state", state);
        let authEnpoint = AUTH_ENDPOINT + "/authorize";
        const loginUrl = `${authEnpoint}?client_id=${CLIENT_ID}&show_dialog=${true}&redirect_uri=${REDIRECT_URI_ENCODED}&scope=${scopes}&response_type=${RESPONSE_TYPE}&state=${sessionStorage.getItem("state")}`;
        return loginUrl
    }

    return (
        <div className={style.main}>
            <h1 id={style.headline}>Login to your Spotify account to access the full data</h1>
            <div className={style.loginBox}>
                <Button id={style.loginButton} size="lg" href={loggedIn()} variant='dark'>
                    <Image src={SpotifyLogo} id={style.logoImage} />
                </Button>
            </div>
        </div>
    );

    function generateRandomString(length) {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;

    }
}