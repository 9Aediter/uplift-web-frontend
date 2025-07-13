import axios from 'axios';

const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

/**
 * Fetches all "softwares" from the Strapi API.
 * @returns A promise that resolves to the raw data array from Strapi (e.g., response.data.data).
 */
export const fetchAllSoftwares = async (): Promise<any[]> => {
  const endpoint = '/api/softwares?populate=*';

  try {
    const response = await axios.get(`${STRAPI_API_URL}${endpoint}`);
    
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data; // Return the raw array of softwares
    }
    
    // console.warn('Strapi response format might have changed. Expected { data: [...] }');
    return [];

  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.error(`Axios error fetching all softwares: ${error.message}`);
      throw new Error(`Could not connect to or fetch all softwares: ${error.code}`);
    } else {
      // console.error('Unexpected error fetching all softwares:', error);
      throw new Error('An unexpected error occurred while fetching all softwares.');
    }
  }
};

/**
 * Fetches a single "software" from the Strapi API by its slug.
 * @param slug The slug of the software to fetch.
 * @returns A promise that resolves to the raw data object from Strapi (e.g., response.data.data[0]) or null if not found.
 */
export const fetchSoftwareBySlug = async (slug: string): Promise<any | null> => {
  const endpoint = `/api/softwares?filters[slug][$eq]=${slug}&populate=*`;

  try {
    const response = await axios.get(`${STRAPI_API_URL}${endpoint}`);
    
    if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
      return response.data.data[0]; // Return the first item found
    }
    
    // console.warn(`Software with slug '${slug}' not found or Strapi response format changed.`);
    return null;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.error(`Axios error fetching software by slug '${slug}': ${error.message}`);
      throw new Error(`Could not connect to or fetch software by slug: ${error.code}`);
    } else {
      // console.error('Unexpected error fetching software by slug:', error);
      throw new Error('An unexpected error occurred while fetching software by slug.');
    }
  }
};
