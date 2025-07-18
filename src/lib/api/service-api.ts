import axios from 'axios';

// The base URL for your Strapi API
// const STRAPI_API_URL = 'http://localhost:1337'; // Moved to .env.local
const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

/**
 * Fetches all "services" from the Strapi API and returns the raw data.
 * @returns A promise that resolves to the raw data array from Strapi (e.g., response.data.data).
 */
export const fetchAllServices = async (): Promise<any[]> => {
  const endpoint = '/api/services';
  // console.log(`Fetching raw data from Strapi: ${STRAPI_API_URL}${endpoint}`);

  try {
    const response = await axios.get(`${STRAPI_API_URL}${endpoint}`);
    
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data; // Return the raw array of services
    }
    
    // console.warn('Strapi response format might have changed. Expected { data: [...] }');
    return [];

  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.error(`Axios error fetching from Strapi: ${error.message}`);
      throw new Error(`Could not connect to or fetch from Strapi: ${error.code}`);
    } else {
      // console.error('Unexpected error fetching from Strapi:', error);
      throw new Error('An unexpected error occurred while fetching from Strapi.');
    }
  }
};