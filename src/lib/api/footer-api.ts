import axios from 'axios';

export async function fetchFooterData() {
  try {
    const STRAPI_API_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;
    const endpoint = '/api/footer?populate=*';
    const response = await axios.get(`${STRAPI_API_URL}${endpoint}`);
    
    if (response.data) {
      return response.data;
    }
    
    // console.warn('Strapi response format might have changed. Expected { data: ... }');
    return null;

  } catch (error) {
    if (axios.isAxiosError(error)) {
      // console.error(`Axios error fetching footer data: ${error.message}`);
      throw new Error(`Could not connect to or fetch footer data: ${error.code}`);
    } else {
      // console.error('Unexpected error fetching footer data:', error);
      throw new Error('An unexpected error occurred while fetching footer data.');
    }
  }
}
