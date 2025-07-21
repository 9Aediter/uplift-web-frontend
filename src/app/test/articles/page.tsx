import { fetchNotionArticlesRaw } from '@/lib/api/articles-api';
import { getArticles } from '@/lib/store/article-store';
import { Article } from '@/types/article.d'; // Corrected import path

const TestArticlesPage = async () => {
  let processedArticles: Article[] | null = null;
  let processedError: string | null = null;
  let rawApiData: any | null = null;
  let rawApiError: string | null = null;

  try {
    processedArticles = await getArticles();
  } catch (error: any) {
    processedError = error.message || 'Unknown processed data error';
  }

  try {
    rawApiData = await fetchNotionArticlesRaw();
  } catch (error: any) {
    rawApiError = error.message || 'Unknown raw API error';
  }

  const renderJson = (data: any) => {
    return <pre className="p-4 bg-gray-800 text-white rounded-md text-sm whitespace-pre-wrap break-words">{JSON.stringify(data, null, 2)}</pre>;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Articles Data Test Page</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Column 1: Processed Data from Store */}
        <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">1. Processed Data (from getArticles)</h2>
          {processedError ? (
            <p className="text-red-500">Error: {processedError}</p>
          ) : processedArticles ? (
            <div>
              <p className="mb-2">Articles loaded: {processedArticles.length}</p>
              {renderJson(processedArticles)}
            </div>
          ) : (
            <p>No processed data available.</p>
          )}
        </div>

        {/* Column 2: Raw Data from API */}
        <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-lime-400">2. Raw Data (from fetchNotionArticlesRaw)</h2>
          {rawApiError ? (
            <p className="text-red-500">Error: {rawApiError}</p>
          ) : rawApiData ? (
            <div>
              <p className="mb-2">Raw items loaded: {rawApiData.results?.length || 0}</p>
              {renderJson(rawApiData)}
            </div>
          ) : (
            <p>No raw data available.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default TestArticlesPage;
