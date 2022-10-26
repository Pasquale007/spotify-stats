declare module "*.module.css";
declare module "*.svg";
declare module "*.png";

interface Track {
    genres: Array<string>,
    id: number,
    popularity: number,
    available_markets: Array<any>,
    duration_ms: number,
    name: string,
    release_date: string,
    release_date_precision: string,
    total_tracks: number,
    type: string,
    uri: string,
    album: {
        name: string,
        album_type: string,
        artists: Array<Artist>,
        images: Array<Image>,
    },
    genres?: {
        length: number,
    },
    available_markets: Array<string>,
    external_urls: {
        spotify: string
    },
    href: string,
    images: Array<Image>
}

interface Artist {
    display_name?: string,
    id: number,
    href: string,
    name?: string,
    type: string,
    uri: string,
    external_urls: {
        spotify: string
    },

}

interface Playlist {
    id: number,
    href: string,
    name: string,
    images: Array<Image>,
    uri: string,
    type: string,
    tracks: {
        href: string,
        total: number,
    },
    snapshot_id: string,
    public: boolean,
    primary_color: any,
    owner: Artist,
    collaborative: boolean,
    description: string,
    external_urls:
    {
        spotify: string
    },

}

interface Image {
    height: number,
    width: number,
    url: string,
}