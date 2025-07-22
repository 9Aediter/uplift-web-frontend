import React from 'react';
import { getServiceById } from '@/lib/actions/serviceActions';

const TestServiceDetailActionPage = async () => {
  const testId = 'web-development'; // Hardcoded ID for testing
  const testLocale = 'th'; // Hardcoded locale for testing

  let serviceData: any | null = null;
  let error: string | null = null;

  try {
    serviceData = await getServiceById(testLocale, testId);
  } catch (e: any) {
    error = e.message || 'Unknown error fetching service data';
  }

  const renderJson = (data: any) => {
    return <pre className="p-4 bg-gray-800 text-white rounded-md text-sm whitespace-pre-wrap break-words">{JSON.stringify(data, null, 2)}</pre>;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Service Detail Action Test Page</h1>
      <div className="grid grid-cols-1 gap-8">
        <div className="p-6 bg-gray-800/50 rounded-lg border border-gray-700">
          <h2 className="text-2xl font-semibold mb-4 text-cyan-400">Service Data from getServiceById</h2>
          {error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : serviceData ? (
            <div>
              <p className="mb-2">Service loaded: {serviceData.title} (ID: {serviceData.slug})</p>
              {renderJson(serviceData)}
            </div>
          ) : (
            <p>No service data found for ID: {testId} in locale: {testLocale}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestServiceDetailActionPage;
