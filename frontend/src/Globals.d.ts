declare module "*.module.css";
declare module "*.css";
declare module "*.svg";
declare module "*.png";

interface Track {
    id: number,
    genres: Array<string>,
    popularity: number,
    available_markets: Array<any>,
    duration_ms: number,
    name: string,
    release_date: string,
    release_date_precision: string,
    total_tracks: number,
    type: string,
    album: Album,
    genres?: {
        length: number,
    },
    external_urls: external_urls,
    href: string,
    images: Array<Image>,
    restrictions?: restrictions,
}

interface Album {
    id: number,
    name: string,
    href: string,
    type: string,
    uri: string,
    available_markets: Array<string>,
    album_type: string,
    artists?: Array<Artist>,
    images: Array<Image>,
    tracks: Array<Track>,
    total_tracks: number,
    release_date: string,
    release_date_precision: string,
    restrictions?: restrictions,
}
interface Artist {
    display_name?: string,
    id?: number,
    href?: string,
    name?: string,
    popularity?: number,
    type?: string,
    images?: Array<Image>,
    uri?: string,
    external_urls?: external_urls,
    followers?: Follower,
    genres?: Array<string>,

}

interface Playlist {
    id: number,
    href: string,
    name?: string,
    images: Array<Image>,
    uri: string,
    type: string,
    tracks?: {
        href: string,
        items: Array<Track>,
        limit: integer,
        next: string,
        offset: integer,
        previous: string,
        total: integer,
    },
    follwers?: Follower,
    snapshot_id?: string,
    public?: boolean,
    primary_color?: any,
    owner: Artist,
    collaborative?: boolean,
    description?: string,
    external_urls?: external_urls,

}

interface Image {
    height: number,
    width: number,
    url: string,
}

interface external_urls {
    spotify?: string
}
interface restrictions {
    reason: string,
}

interface Follower {
    href?: string,
    total?: number
}