"use client"
import React, { useEffect, useState } from 'react';
import { fetchAllSoftwares } from '@/lib/api/software-api';

const TestSoftwarePage = () => {
  const [softwareData, setSoftwareData] = useState<any[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAllSoftwares();
        setSoftwareData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="p-4">Loading software data...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Test Software Data (Raw API)</h1>
      <div className="p-4 rounded-md text-sm overflow-auto">
        <pre>{JSON.stringify(softwareData, null, 2)}</pre>
      </div>
    </div>
  );
};

export default TestSoftwarePage;
