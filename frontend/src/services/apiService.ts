import axios, { Axios, AxiosError } from "axios";
import { Song } from "../App";
// import Playlist from "../pages/Playlist";

// const API_URL = "http://localhost:8080";
const API_URL = "https://vibeflow-backend.onrender.com";
    
interface NewRegisterUserData {
  username: string;
  password: string;
  email: string;
  mobile: string;
}

interface LoginUserData {
  username: string;
  password: string;
}

interface User {
  mongoid: string;
  username: string;
  password: string;
  email: string;
  mobile: string;
  // recentlyplayedsongs
  // playlists
  // favouritesongs
  // savedsongs          []string
  // createdat           time.Time
}

interface UserResponse {
  statuscode: string;
  message: string;
  mongodoc: User;
}

interface UserErrorResponse {
  statuscode: string;
  message: string;
}

// Define the structure of a song
// interface Song {
//   songname: string;
//   songurl: string;
//   songartist: string;
// }

interface TopAlbumns {
  albumnid: string;
  albumntitle: string;
  albumnimg: string;
  albumnurl: string;  
  albumnsongs: Song[];
}

interface TopAlbumnsResponse {
  statuscode: string;
  message: string;
  mongodocs: TopAlbumns;
}

interface TopAlbumnsErrorResponse {
  statuscode: string;
  message: string;
  mongodocs: string;
}

// Define the structure of a playlist
interface PlaylistData {
  _id: string;
  playlistname: string;
  playlisturl: string;
  playlistimage: string;
  playlistartist: string;
  playlistsongs: Song[];
}

interface NewReleaseSong {
  _id: string;
  songname: string;
  songurl: string;
  songimage: string;
  songartist: string;
}

interface TrendingPlaylistsResponse {
  statuscode: number;
  message: string;
  mongodocs: PlaylistData[];
}

interface TrendingPlaylistResponse {
  statuscode: number;
  message: string;
  mongodoc: PlaylistData;
}

interface NewReleaseSongResponse {
  statuscode: number;
  message: string;  
  mongodocs: Song[];
}

interface GenreSong {
  songname: string;
  songimg: string;
  songurl: string;
  songartist: string;
}

interface Genres {
  _id: string;
  genresname: string;
  genresimg: string;
  genresurl: string;
  genressongs: GenreSong[];
}

interface TopGenresSongResponse {
  statuscode: number;
  message: string;
  mongodocs: Genres[];
}

// Interface for expected error data
interface ErrorResponse {
  statuscode?: number;
  message?: string;
  userID?: string;
}

interface FavouriteSong {
  album_id: string;
  album_url: string;
  encrypted_media_url: string;
  has_lyrics: string;
  lyrics: string;
  primary_artists: string;
  primary_artists_id: string;
  song_audio_preview: string;
  song_audio_url: string;
  song_id: string;
  song_image_url: string;
  song_name: string;
  vcode: string;
}

type Playlist = {
  PlaylistName: string;
  PlaylistImg: string;
  PlaylistSongs: {
    songname: string;
    artist: string;
    url: string;
  }[];
};

type FetchPlaylistsResponse = {
  statuscode: number;
  message: string;
  playlists: Playlist[];
};

type FetchPlaylistRespone = {
  statuscode: number;
  message: string;
  playlistsongs: FavouriteSong[];  
}      
   
interface AddSongToPlaylistResponse {
  statuscode: number;
  message: string;
}

const getSongSuggestions = async (query: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/get/song-suggestions`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "Error getting song suggestions"
    );  
  }
}

const searchJioSaavnSongs = async (query: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/get/jiosaavn/songs`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "Error searching songs"
    );
  }
};

// search songs on the basis of query
const searchSongs = async (query: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/songs/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    const axioError = error as AxiosError<ErrorResponse>;
    throw new Error(
      axioError.response?.data?.message || "Error searaching songs"
    );
  }
};

// get song's mp3 url
const getSongMp3 = async (songUrl: string): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/songs/scrape-mp3`, {
      songUrl,
    });

    return response.data.mp3Url;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;
    throw new Error(
      axiosError.response?.data?.message || "Error retrieving MP3 URL"
    );
  }
};

// Function to login a existing user
const loginUser = async (
  userData: LoginUserData
): Promise<{ statuscode: number; message: string; mongodoc: object }> => {
  try {
    const response = await axios.post<{
      statuscode: number;
      message: string;
      mongodoc: object;
    }>(`${API_URL}/login-user`, userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      statuscode: number;
      message: string;
    }>;
    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message = axiosError.response?.data?.message || "Error creating user";

    throw { statuscode, message };
  }
};

// Function to create a new user in MongoDB
const createUser = async (
  userData: NewRegisterUserData
): Promise<{ statuscode: number; message: string; userID: string }> => {
  try {
    const response = await axios.post<{
      statuscode: number;
      message: string;
      userID: string;
    }>(`${API_URL}/create-user`, userData);
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      statuscode: number;
      message: string;
      userID: string;
    }>;

    // Extract necessary fields or use fallback values
    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message = axiosError.response?.data?.message || "Error creating user";
    const userID = axiosError.response?.data?.userID || "";

    // Throw a structured error object
    throw { statuscode, message, userID };
  }
};

// Function to fetch top albumns from mongoDB
const getTopAlbumns = async (): Promise<TopAlbumnsResponse> => {
  try {
    const response = await axios.get<TopAlbumnsResponse>(
      `${API_URL}/get/topalbumns`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<TopAlbumnsErrorResponse>;

    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message =
      axiosError.response?.data?.message || "error fetching top albumns";
    const mongodocs = axiosError.response?.data?.mongodocs || "";

    throw { statuscode, message, mongodocs };
  }
};

// Function to fetch top genres from mongoDB
const getTopGenres = async (): Promise<TopGenresSongResponse> => {
  try {
    const response = await axios.get<TopGenresSongResponse>(
      `${API_URL}/get/top-genres`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<TopGenresSongResponse>;

    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message =
      axiosError.response?.data?.message || "error fetching top genres";
    const mongodos: Genres[] = axiosError.response?.data?.mongodocs || [];

    throw { statuscode, message, mongodos };
  }
};

// Function to fetch new release songs from mongoDB
const getNewReleaseSongs = async (): Promise<NewReleaseSongResponse> => {
  try {
    const response = await axios.get<NewReleaseSongResponse>(
      `${API_URL}/get/new-release-songs`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<NewReleaseSongResponse>;

    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message =   
      axiosError.response?.data?.message || "error fetching new release songs";
    const mongodos: Song[] =
      axiosError.response?.data?.mongodocs || [];

    throw { statuscode, message, mongodos };
  }
};

// Function to fetch trending playlists from mongoDB
const getTrendingPlaylists = async (): Promise<TrendingPlaylistsResponse> => {
  try {
    const response = await axios.get<TrendingPlaylistsResponse>(
      `${API_URL}/get/trending-playlists`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<TrendingPlaylistsResponse>;

    // Extract necessary fields or use fallback values
    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message =
      axiosError.response?.data?.message || "error fetching trending playlists";
    const mongodocs: PlaylistData[] =
      axiosError.response?.data?.mongodocs || [];

    // Throw a structured error object
    throw { statuscode, message, mongodocs };
  }
};

const getUserDoc = async (id: string): Promise<UserResponse> => {
  try {
    const response = await axios.get<UserResponse>(
      `${API_URL}/get/userbyid/${id}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<UserErrorResponse>;

    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message =
      axiosError.response?.data?.message || "error fetching user document";

    throw { statuscode, message };
  }
};

// Function to fetch trending playlist from mongoDB
const getTrendingPlaylist = async (
  id: string
): Promise<TrendingPlaylistResponse> => {
  try {
    const response = await axios.get<TrendingPlaylistResponse>(
      `${API_URL}/get/trending-playlist/${id}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<TrendingPlaylistResponse>;

    // Extract necessary fields or use fallback values
    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message =
      axiosError.response?.data?.message || "error fetching trending playlists";
    const mongodoc: PlaylistData | null =
      axiosError.response?.data?.mongodoc || null;

    // Throw a structured error object
    throw { statuscode, message, mongodoc };
  }
};

// Function to remove a song to the user's favourites
const removeSongFromFavourites = async (
  userId: string,
  song: FavouriteSong
): Promise<UserResponse> => {
  try {
    const response = await axios.patch<UserResponse>(
      `${API_URL}/songs/remove-song-to-favourites`,
      {
        user_id: userId,
        song: song,
      }
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<UserErrorResponse>;
    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message =
      axiosError.response?.data?.message || "Error removing song to favourites";

    throw { statuscode, message };
  }
};

// Function to add a song to the user's favourites
const addSongToFavourites = async (
  userId: string,
  song: FavouriteSong
): Promise<UserResponse> => {
  try {
    const response = await axios.patch<UserResponse>(
      `${API_URL}/songs/add-song-to-favourites`,
      {
        user_id: userId,
        song: song,
      }
    );

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<UserErrorResponse>;
    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message =
      axiosError.response?.data?.message || "Error adding song to favourites";

    throw { statuscode, message };
  }
};

// Function to fetch favorite songs from the backend
const getFavouriteSongs = async (
  songIds: string[]
): Promise<FavouriteSong[]> => {
  try {
    const response = await axios.post<{
      statuscode: number;
      songs: FavouriteSong[];
    }>(`${API_URL}/get/favourite-songs`, { song_ids: songIds });

    return response.data.songs;
  } catch (error) {
    const axiosError = error as AxiosError<{
      statuscode: number;
      message: string;
    }>;

    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message =
      axiosError.response?.data?.message || "Error fetching favourite songs";

    throw { statuscode, message };
  }
};

const createPlaylist = async (
  UserID: string,
  PlaylistName: string
): Promise<{ statuscode: number; message: string }> => {
  try {
    const response = await axios.post<{
      statuscode: number;
      message: string;
    }>(`${API_URL}/create-playlist`, { user_id: UserID, playlist_name: PlaylistName });
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{
      statuscode: number;
      message: string;
    }>;

    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message =
      axiosError.response?.data?.message || "Error creating playlist";

    throw { statuscode, message };
  }
};

const fetchPlaylist = async (
  UserID: string | undefined,
  PlaylistName: string | undefined  
): Promise<FetchPlaylistRespone> => {
    
  console.log("UserID :- ", UserID)
  console.log("PlaylistName :- ", PlaylistName)  

  try {
    const response = await axios.get<FetchPlaylistRespone>(
      `${API_URL}/get/playlist`,
      {   
        params: { 
          user_id: UserID,
          playlist_name: PlaylistName
        }        
      }
    );
    console.log("response :- ", response.data);     
    return response.data;  
  } catch (error) {
    const axiosError = error as AxiosError<FetchPlaylistRespone>;

    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message =
      axiosError.response?.data?.message || "Error fetching playlists";
   
    throw { statuscode, message, playlistsongs: [] };
  }
};


const fetchPlaylists = async (
  UserID: string
): Promise<FetchPlaylistsResponse> => {
  try {
    const response = await axios.post<FetchPlaylistsResponse>(
      `${API_URL}/get/playlists`,
      { user_id: UserID }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<FetchPlaylistsResponse>;

    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message =
      axiosError.response?.data?.message || "Error fetching playlists";

    throw { statuscode, message, playlists: [] };
  }
};  

const addSongToPlaylist = async (
  UserID: string,
  PlaylistName: string,
  Song: FavouriteSong
): Promise<AddSongToPlaylistResponse> => {  

  try {      
    const response = await axios.patch<AddSongToPlaylistResponse>(`${API_URL}/songs/add-song-to-playlist`, {
      user_id: UserID,    
      playlist_name: PlaylistName,
      song: Song,
    });   
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<AddSongToPlaylistResponse>;
    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message = axiosError.response?.data?.message || "Error adding song to playlist";
    throw { statuscode, message };
  }
};

export {
  searchSongs,
  getSongMp3,
  createUser,
  loginUser,
  getTrendingPlaylists,
  getTrendingPlaylist,
  getNewReleaseSongs,
  getTopGenres,
  getTopAlbumns,
  getUserDoc,
  searchJioSaavnSongs,
  addSongToFavourites,
  removeSongFromFavourites,
  getFavouriteSongs,
  createPlaylist,
  fetchPlaylists,
  addSongToPlaylist,
  fetchPlaylist,
  getSongSuggestions
};
