import axios from 'axios';

// The base URL for your Strapi API
const STRAPI_API_URL = 'http://localhost:1337';

/**
 * Fetches all "softwares" from the Strapi API and returns the raw data.
 * @returns A promise that resolves to the raw data array from Strapi (e.g., response.data.data).
 */
export const fetchAllProducts = async (): Promise<any[]> => {
  const endpoint = '/api/softwares?populate=image';
  console.log(`Fetching raw data from Strapi: ${STRAPI_API_URL}${endpoint}`);

  try {
    const response = await axios.get(`${STRAPI_API_URL}${endpoint}`);
    
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data; // Return the raw array of softwares
    }
    
    console.warn('Strapi response format might have changed. Expected { data: [...] }');
    return [];

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error(`Axios error fetching from Strapi: ${error.message}`);
      throw new Error(`Could not connect to or fetch from Strapi: ${error.code}`);
    } else {
      console.error('Unexpected error fetching from Strapi:', error);
      throw new Error('An unexpected error occurred while fetching from Strapi.');
    }
  }
};