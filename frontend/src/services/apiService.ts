import axios, {AxiosError} from "axios";
import Playlist from "../pages/Playlist";

const API_URL = "http://localhost:8080";

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
	email:    string;         
	mobile:   string;        
	// recentlyplayedsongs            
	// playlists                 
	// favouritesongs             
	// savedsongs          []string           
	// createdat           time.Time          
}

interface UserResponse {
  "statuscode": string;
	"message":    string;
	"mongodoc": User;
}

interface UserErrorResponse {
  "statuscode": string;
	"message":    string;
}

// Define the structure of a song
interface Song {
  songname: string;
  songurl: string;
  songartist: string;
}

interface TopAlbumns{
	albumnid: string; 
	albumntitle:  string;             
	albumnimg:    string;         
	albumnurl:    string;            
	albumnsongs:  Song[];            
}

interface TopAlbumnsResponse{
  statuscode: string,
	message:    string,
	mongodocs:  TopAlbumns,
}

interface TopAlbumnsErrorResponse{
  statuscode: string,
	message:    string,
	mongodocs:  string,
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
  mongodocs: NewReleaseSong[];
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
}

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
}

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
): Promise<{ statuscode: number, message: string, mongodoc: object }> => {
  try {
    const response = await axios.post<{ statuscode: number, message: string, mongodoc: object }>(
      `${API_URL}/login-user`,
      userData
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ statuscode: number, message: string }>;
    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message = axiosError.response?.data?.message || 'Error creating user';

    throw { statuscode, message };
  }
}

// Function to create a new user in MongoDB
const createUser = async (
  userData: NewRegisterUserData
): Promise<{ statuscode: number, message: string, userID: string }> => {
  try {
    const response = await axios.post<{ statuscode: number, message: string; userID: string }>(
      `${API_URL}/create-user`,
      userData
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<{ statuscode: number; message: string; userID: string }>;
    
    // Extract necessary fields or use fallback values
    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message = axiosError.response?.data?.message || 'Error creating user';
    const userID = axiosError.response?.data?.userID || '';
   
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
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<TopAlbumnsErrorResponse>;

    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message = axiosError.response?.data?.message || "error fetching top albumns";
    const mongodocs = axiosError.response?.data?.mongodocs || "";

    throw { statuscode, message, mongodocs };
  }
}

// Function to fetch top genres from mongoDB
const getTopGenres = async (): Promise<TopGenresSongResponse> => {
  try {
    const response = await axios.get<TopGenresSongResponse>(
      `${API_URL}/get/top-genres`
    );
    return response.data
  } catch (error) {
    const axiosError = error as AxiosError<TopGenresSongResponse>;

    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message = axiosError.response?.data?.message || 'error fetching top genres';
    const mongodos: Genres[] = axiosError.response?.data?.mongodocs || [];

    throw { statuscode, message, mongodos };
  }
}

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
    const message = axiosError.response?.data?.message || 'error fetching new release songs';
    const mongodos: NewReleaseSong[] = axiosError.response?.data?.mongodocs || [];

    throw { statuscode, message, mongodos };
  }
}

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
    const message = axiosError.response?.data?.message || 'error fetching trending playlists';
    const mongodocs: PlaylistData[] = axiosError.response?.data?.mongodocs || [];
   
    // Throw a structured error object
    throw { statuscode, message, mongodocs };
  }
}

const getUserDoc = async (id: string): Promise<UserResponse> => {
  try {
    const response = await axios.get<UserResponse>(
      `${API_URL}/get/userbyid/${id}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<UserErrorResponse>;

    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message = axiosError.response?.data?.message || 'error fetching user document';
    
    throw {statuscode, message}
  }
}

// Function to fetch trending playlist from mongoDB 
const getTrendingPlaylist = async (id: string): Promise<TrendingPlaylistResponse> => {
  try {
    const response = await axios.get<TrendingPlaylistResponse>(
      `${API_URL}/get/trending-playlist/${id}`
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<TrendingPlaylistResponse>;
    
    // Extract necessary fields or use fallback values
    const statuscode = axiosError.response?.data?.statuscode || 500;
    const message = axiosError.response?.data?.message || 'error fetching trending playlists';
    const mongodoc: PlaylistData | null = axiosError.response?.data?.mongodoc || null;
   
    // Throw a structured error object
    throw { statuscode, message, mongodoc };
  }
}


export { searchSongs, getSongMp3, createUser, loginUser, getTrendingPlaylists, getTrendingPlaylist, getNewReleaseSongs, getTopGenres, getTopAlbumns, getUserDoc, searchJioSaavnSongs };