// frontend/services/apiService.ts

import axios from "axios";

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

interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

// user registeration api endpoint  
const registerUser = async (
  userData: NewRegisterUserData
): Promise<{ message: string }> => {
  try {
    const response = await axios.post<{ message: string }>(
      `${API_URL}/api/users/register`,
      userData
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      axiosError.response?.data?.message || "Error registering user"
    );
  }
};

// user login api endpoint 
const loginUser = async (
  userData: LoginUserData
): Promise<{ message: string }> => {
  try {
    const response = await axios.post<{ message: string }>(
      `${API_URL}/api/users/login`,
      userData
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(axiosError.response?.data?.message || "Error login user");
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
    const axioError = error as AxiosError;
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
    const axiosError = error as AxiosError;
    throw new Error(
      axiosError.response?.data?.message || "Error retrieving MP3 URL"
    );
  }
};


export { registerUser, loginUser, searchSongs, getSongMp3 };
