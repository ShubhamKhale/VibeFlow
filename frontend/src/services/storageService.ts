import { Storage } from '@ionic/storage';
import { Song } from '../App';

// Create a storage instance and initialize
const storage = new Storage();
await storage.create(); // Ensure storage is ready before using it

// Save data
const setItem = async (key: string, value: any): Promise<void> => {
  try {
    await storage.set(key, value);
  } catch (error) {
    console.error(`Error setting item ${key}:`, error);
  }
};    

// Retrieve data
const getItem = async (key: string): Promise<any> => { // Change return type to `any`
  try {
    return await storage.get(key); // Return the value directly
  } catch (error) {
    console.error(`Error getting item ${key}:`, error);
  }
};

// Remove data
const removeItem = async (key: string): Promise<void> => {
  try {
    await storage.remove(key);
  } catch (error) {
    console.error(`Error removing item ${key}:`, error);
  }
};

// Clear all data
const clearStorage = async (): Promise<void> => {
  try {
    await storage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

// Function to add a song ID (ensuring uniqueness)
const addFavouriteSongId = async (songId: string): Promise<void> => {
  try {
    const existingIds: string[] = (await storage.get("favourite_songs_ids")) || [];
    
    if (!existingIds.includes(songId)) {
      existingIds.push(songId);
      await storage.set("favourite_songs_ids", existingIds);
    }
  } catch (error) {
    console.error("Error adding favourite song ID:", error);
  }
};

// Function to remove a song ID (when un-favorited)
const removeFavouriteSongId = async (songId: string): Promise<void> => {
  try {
    let existingIds: string[] = (await storage.get("favourite_songs_ids")) || [];
    
    existingIds = existingIds.filter(id => id !== songId);
    await storage.set("favourite_songs_ids", existingIds);
  } catch (error) {
    console.error("Error removing favourite song ID:", error);
  }
};

// Function to check if a song ID is in favourites
const isSongFavourite = async (songId: string): Promise<boolean> => {
  try {
    const existingIds: string[] = (await storage.get("favourite_songs_ids")) || [];
    return existingIds.includes(songId);
  } catch (error) {
    console.error("Error checking favourite song ID:", error);
    return false;
  }
};

// Function to get all favourite song IDs
const getFavouriteSongIds = async (): Promise<string[]> => {
  try {
    return (await storage.get("favourite_songs_ids")) || [];
  } catch (error) {
    console.error("Error getting favourite song IDs:", error);
    return [];
  }
};

// Function to clear all favourites
const clearFavouriteSongs = async (): Promise<void> => {
  try {
    await storage.remove("favourite_songs_ids");
  } catch (error) {
    console.error("Error clearing favourite songs:", error);
  }
};

// Save a song for offline playback
const saveSongOffline = async (song: Song): Promise<void> => {
  try {
    const existingSongs: Song[] = (await storage.get("offline_songs")) || [];
    const songExists = existingSongs.some(s => s.song_id === song.song_id);

    if (!songExists) {
      existingSongs.push(song);
      await storage.set("offline_songs", existingSongs);
    }
  } catch (error) {
    console.error("Error saving song offline:", error);
  }
};

// Remove a song from offline storage
const removeOfflineSong = async (songId: string): Promise<void> => {
  try {
    let existingSongs: Song[] = (await storage.get("offline_songs")) || [];
    existingSongs = existingSongs.filter(song => song.song_id !== songId);
    await storage.set("offline_songs", existingSongs);
  } catch (error) {
    console.error("Error removing offline song:", error);
  }
};

// Check if a song is saved offline
const isSongOffline = async (songId: string): Promise<boolean> => {
  try {
    const existingSongs: Song[] = (await storage.get("offline_songs")) || [];
    return existingSongs.some(song => song.song_id === songId);
  } catch (error) {
    console.error("Error checking offline song:", error);
    return false;
  }
};

// Get all offline saved songs
const getOfflineSongs = async (): Promise<Song[]> => {
  try {
    return (await storage.get("offline_songs")) || [];
  } catch (error) {
    console.error("Error getting offline songs:", error);
    return [];
  }
};

// Clear all offline songs
const clearOfflineSongs = async (): Promise<void> => {
  try {
    await storage.remove("offline_songs");
  } catch (error) {
    console.error("Error clearing offline songs:", error);
  }
};



export { setItem, getItem, removeItem, clearStorage, addFavouriteSongId, removeFavouriteSongId, isSongFavourite, getFavouriteSongIds, clearFavouriteSongs, saveSongOffline, removeOfflineSong, isSongOffline, getOfflineSongs, clearOfflineSongs };
