import { useEffect } from 'react';
import axios from 'axios';
import { endpoint, REDIRECT_URI, AUTH_ENDPOINT, CLIENT_ID, CLIENT_SECRET } from './_defaultValues'

export default function Callback() {
    const querystring = require('querystring');

    useEffect(() => {
        let props = window.location.href.split("code=")[1];
        let code = props.split("&state=")[0];
        let state = props.split("&state=")[1];

        //if not equal -> reject. Wron request
        if (state !== sessionStorage.getItem("state")) {
            console.log("Not same state. Error -> Break!");
            return;
        }

        //if user denied the request
        if (!code) {
            console.log("User didn't accept the request. No access Token available");
            return;
        }
        requestData(code);
        //requestDataByCode();
    }, [])

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
        console.log(sessionStorage.getItem('user'));

        //navigate back to home
        window.location.href = "http://localhost:3000";
    }

    return (
        <h1 style={{ textAlign: 'center' }}>
            Pending...
        </h1>
    );
}