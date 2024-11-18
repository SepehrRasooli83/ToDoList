'use client'

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todo', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }

        const data = await response.json();
        setTodos(data);
      } catch (err) {
        setError("Failed to fetch todos");
      }
    };

    fetchTodos();
  }, []);  // Empty dependency array ensures this only runs on client mount

  return (
    <>
      <div className="p-5">
        <button className="px-4 py-2 text-white bg-green-500 border-2 border-green-500 rounded hover:bg-green-600">
          <Link href="/create">Create New</Link>
        </button>
      </div>

      <div className="p-2">
        {error && <div className="text-red-500">{error}</div>}

        <table className="w-full border border-collapse border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Number</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((item) => (
              <tr key={item.number} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">{item.number}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.description}
                  <div className="flex gap-2 mt-2">
                    <button className="px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600">
                      Delete
                    </button>
                    <button className="px-3 py-1 text-white bg-orange-500 rounded hover:bg-orange-600">
                      <Link href={`/edit/${item.number}`}>Edit</Link>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
