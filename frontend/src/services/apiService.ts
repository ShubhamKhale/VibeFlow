// frontend/services/apiService.ts

import axios from "axios";

const API_URL = "http://localhost:5000";

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

interface SearchQuery {
  query: string;
}

interface GenreQuery {
  genre: string;
}

interface AxiosError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

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

const searchSongs = async ({ query }: SearchQuery): Promise<any> => {
  try {
    const response = await axios.get(
      `https:/deezerdevs-deezer.p.rapidapi.com/search?q=${query}`,
      {
        headers: {
          "x-rapidapi-host": "",
          App: "default-application_6800181",
          "x-rapidapi-key":
            "5308e2dc59msh2b085f72894e96bp19f4cejsn5f19c142a161",
          Accept: "application/json",
          "Content-Type": "",
          "x-rapidapi-ua": "RapidAPI-Playground",
        },
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      axiosError.response?.data?.message || "Error searching song"
    );
  }
};

const getGenres = async ({ genre }: GenreQuery): Promise<any> => {
  try {
    const response = await axios.get(
      `
https://deezerdevs-deezer.p.rapidapi.com/genre/${genre}}`,
      {    
        headers: {
          "x-rapidapi-host": "",
          App: "default-application_6800181",
          "x-rapidapi-key":
            "5308e2dc59msh2b085f72894e96bp19f4cejsn5f19c142a161",
          Accept: "application/json",
          "Content-Type": "",
          "x-rapidapi-ua": "RapidAPI-Playground",
        },
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(
      axiosError.response?.data?.message || "Error searching song"
    );
  }
};

export { registerUser, loginUser, searchSongs, getGenres };
