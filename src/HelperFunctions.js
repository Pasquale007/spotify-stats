import axios from "axios";
import { endpoint } from "./_defaultValues";

export default class HelperFunctions {

    static async fetchTopTracks({ limit }) {
        let promise = await axios.get(endpoint + "/me/top/tracks", {
            type: "tracks",
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
    static async fetchTopArtist({ limit }) {
        let promise = await axios.get(endpoint + "/me/top/artists", {
            type: "artists",
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
}