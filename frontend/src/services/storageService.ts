import { Storage } from '@ionic/storage';

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

export { setItem, getItem, removeItem, clearStorage };
