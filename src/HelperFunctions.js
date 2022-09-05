import axios from "axios";
import querystring from 'querystring';
import { AUTH_ENDPOINT, CLIENT_ID, CLIENT_SECRET, endpoint } from "./_defaultValues";

//automatically fetching the newe token with refresh token if the accessToken expires
axios.interceptors.response.use((response) => {
    return response;
},
    function (error) {
        const originalRequest = error.config;
        if (!(error.response.status === 401 && !originalRequest._retry)) {
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
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        if (promise) {
            return promise.data.items;
        }
        return [];
    }

    static async fetchTopArtists(limit, range = HelperFunctions.time_ranges.medium) {
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

    /*TODO: Make it work*/
    static async fetchRecommendations(limit = 50) {
        //artists
        let topArtists = await HelperFunctions.fetchTopArtists(2);
        let artists = "";
        for (let i = 0; i < topArtists.length; i++) {
            artists += topArtists[i].id + ",";
        }
        artists = artists.substring(0, artists.length - 1);

        //tracks
        let topTracks = await HelperFunctions.fetchTopTracks(2);
        let tracks = "";
        for (let i = 0; i < topTracks.length; i++) {
            tracks += topTracks[i].id + ",";
        }
        tracks = tracks.substring(0, tracks.length - 1);

        //genres
        for (let i = 0; i < topTracks.length; i++) {
            let result = await HelperFunctions.getArtistsGenres(topTracks[i]);
            topTracks[i].genres = result;
        }
        let list = [];
        for (let i = 0; i < topTracks.length; i++) {
            for (let j = 0; j < topTracks[i].genres.length; j++) {
                let genre = topTracks[i].genres[j];
                if (list.find(e => e.name === genre)) {
                    for (let index in list) {
                        if (list[index].name === genre) {
                            list[index].number += 1;
                        }
                    }
                } else {
                    let element = {
                        name: genre,
                        number: 1
                    }
                    list.push(element);
                }
            }
        }
        let genres = "";
        for (let i = 0; i < list.length; i++) {
            genres += list[i].name + ",";
        }
        genres = genres.substring(0, genres.length - 1);

        console.log(artists);
        console.log(genres.substring(0, genres.indexOf(",")));
        console.log(tracks);

        let data = {
            seed_artists: artists,
            seed_genres: genres,
            seed_tracks: ",",
            limit: limit,
        }
        let promise = await axios.get(endpoint + "/recommendations?" + querystring.stringify(data), {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        if (promise) {
            return promise.data.tracks;
        }
        return [];
    }

    static async fetchFollowedArtists(limit = 50) {
        let data = {
            type: 'artist',
            limit: limit,
        }
        let promise = await axios.get(endpoint + "/me/following?" + querystring.stringify(data), {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        });
        if (promise) {
            return promise.data.artists.items;
        }
        return [];
    }

    static async fetchUserPlaylists(limit = 50) {
        let data = {
            limit: limit,
        }
        let promise = await axios.get(endpoint + "/me/playlists?" + querystring.stringify(data), {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        });
        if (promise) {
            return promise.data.items;
        }
        return [];
    }


    static async getTrackInfo(track) {
        let promise = await axios.get(endpoint + "/tracks/" + track.id, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        if (promise) {
            return promise.data.items;
        }
        return [];
    }

    static async getTrackInfoHref(track) {
        let promise = await axios.get(track.href, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        if (promise) {
            return promise.data.items;
        }
        return [];
    }


    static async getArtistsGenres(track) {
        let genres = [];
        for (let i = 0; i < track.artists.length; i++) {
            let promise = await axios.get(track.artists[i].href, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })
            genres = genres.concat(promise.data.genres);
        }
        return genres;
    }
}