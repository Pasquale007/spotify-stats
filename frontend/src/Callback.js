import { useEffect } from 'react';
import axios from 'axios';
import { endpoint, REDIRECT_URI, AUTH_ENDPOINT, CLIENT_ID, CLIENT_SECRET, me } from './_defaultValues'
import Hero from './components/Hero/Hero';

export default function Callback() {
    const querystring = require('querystring');
    var errorMessage = "";

    useEffect(() => {
        //if user denied the request
        if (window.location.href.split("?error=")[1]) {
            let error = window.location.href.split("?error=")[1];
            error = error.split("&")[0];
            errorMessage = "An error occurred. Please try again. Error: ";
            exit(error);
        }

        let props = window.location.href.split("code=")[1];
        let code = props.split("&state=")[0];
        let state = props.split("&state=")[1];

        //if not equal -> reject. Wrong request
        if (state !== sessionStorage.getItem("state")) {
            console.log("Not same state. Error -> Break!");
            return;
        }

        requestData(code);
    }, [])

    function exit(error) {
        alert(errorMessage + error);
        window.location.href = me;
    }

    async function requestData(givenCode) {
        let data = {
            code: givenCode,
            redirect_uri: REDIRECT_URI,
            grant_type: 'authorization_code',
        };
        let client_credentials = CLIENT_ID + ':' + CLIENT_SECRET;
        let headers = {
            'Authorization': 'Basic ' + btoa(client_credentials),
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        axios.post(AUTH_ENDPOINT + "/api/token", querystring.stringify(data), { headers })
            .then(response => {
                console.log("Valid request");
                assignData(response.data);
            }).catch(err => {
                console.log("Error!");
                console.log(err.response);
            });
    }

    function assignData(data) {
        sessionStorage.setItem("accessToken", data.access_token);
        sessionStorage.setItem("refreshToken", data.refresh_token);
        sessionStorage.setItem("tokenType", data.token_type);
        fetchUserInfos();
    }

    const fetchUserInfos = async (e) => {
        const { data } = await axios.get(endpoint + "/me", {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')} `,
            },
        })
        sessionStorage.setItem('user', JSON.stringify(data));

        //navigate back to home
        window.location.href = me;
    }

    return (
        <div style={{ marignLeft: "auto" }}>
            <Hero phrasetop="Pending..." phraselow=" " />
        </div>
    );
}