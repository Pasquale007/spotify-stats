import axios from "axios";
import querystring from 'querystring';
import { AUTH_ENDPOINT, CLIENT_ID, CLIENT_SECRET, endpoint } from "./_defaultValues";

//automatically fetching the newe token with refresh token if the accessToken expires
axios.interceptors.response.use((response) => {
    return response;
},
    function (error) {
        console.log("Auth expires");
        const originalRequest = error.config;
        if (!(error.response.status === 401 && !originalRequest._retry)) {
            console.log("isRetry");
            return;
        }
        originalRequest._retry = true;
        let data = {
            refresh_token: sessionStorage.getItem("refreshToken"),
            grant_type: 'refresh_token',
        };
        let client_credentials = CLIENT_ID + ':' + CLIENT_SECRET;
        let headers = {
            'Authorization': 'Basic ' + btoa(client_credentials),
            'Content-Type': 'application/x-www-form-urlencoded',
        };
        return axios.post(AUTH_ENDPOINT + "/api/token", querystring.stringify(data), { headers })
            .then(response => {
                if (response.status !== 200) {
                    return;
                }
                sessionStorage.setItem("accessToken", response.data.access_token);
                sessionStorage.setItem("tokenType", response.data.token_type);
                originalRequest.headers.Authorization = 'Bearer ' + sessionStorage.getItem("accessToken");
                return axios(originalRequest);
            }).catch(err => {
                console.log("Error!");
                console.log(err.response);
            });
    });

export default class HelperFunctions {
    static time_ranges = {
        short: "short_term",
        medium: "medium_term",
        long: "long_term",
    }

    static async fetchTopTracks(limit, range = HelperFunctions.time_ranges.medium) {
        let data = {
            limit: limit,
            time_range: range,
        }
        let promise = await axios.get(endpoint + "/me/top/tracks?" + querystring.stringify(data), {
            limit: limit,
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        if (promise) {
            return promise.data.items;
        }
        return [];
    }

    static async fetchTopArtist(limit, range = HelperFunctions.time_ranges.medium) {
        let data = {
            limit: limit,
            time_range: range,
        }
        let promise = await axios.get(endpoint + "/me/top/artists?" + querystring.stringify(data), {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        if (promise) {
            return promise.data.items;
        }
        return [];
    }
}