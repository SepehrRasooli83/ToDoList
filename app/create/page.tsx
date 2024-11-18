'use client'

import { useState } from "react";

export default function Create() {
  const [number, setNumber] = useState<number | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async () => {
    if (number === null || desc === null) {
      setError("Please provide both number and description.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Send POST request to the API
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number,
          description: desc,
        }),
      });

      // Handle the response
      if (!response.ok) {
        throw new Error('Failed to create todo');
      }

      // Clear the form
      setNumber(null);
      setDesc(null);
      alert("Todo created successfully!");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Something went wrong.";
  setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Todo</h2>
      
      <div className="mb-4">
        <input
          type="number"
          placeholder="Please enter the number of the Todo..."
          value={number ?? ''}
          onChange={(e) => setNumber(Number(e.target.value))}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-4">
        <textarea
          placeholder="Write the description..."
          value={desc ?? ''}
          onChange={(e) => setDesc(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
        />
      </div>
      
      <div className="mb-4 flex justify-center">
        <button 
          type="button" 
          onClick={handleSubmit}
          disabled={isLoading}
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating..." : "Create"}
        </button>
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}
