export interface LastFmRecentTracksResponse {
  recenttracks: RecentTracks;
}

interface RecentTracks {
  track: Track[];
  "@attr": {
    user: string;
    totalPages: string;
    page: string;
    perPage: string;
    total: string;
  };
}

interface Track {
  artist: ArtistOrAlbum;
  streamable: string;
  image: TrackImage[];
  mbid: string;
  album: ArtistOrAlbum;
  name: string;
  url: string;
  date?: TrackDate; // now playing tracks do not have a date
}

interface ArtistOrAlbum {
  mbid: string;
  "#text": string;
}

interface TrackImage {
  size: "small" | "medium" | "large" | "extralarge";
  "#text": string;
}

interface TrackDate {
  uts: string;
  "#text": string;
}