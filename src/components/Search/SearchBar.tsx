import React, { useRef, useState } from 'react';
import instance from '../../services/API';

export const SearchBar: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!inputRef.current) return;

    const value = inputRef.current.value;
    if (value === '') return;
    setItems(prev => [...prev, value]);
    inputRef.current.value = '';
  }

  async function onSearch() {
    try {
      const response = await instance.get('/search/', {
        params: {
          query: query,
        },
      });

      const movies = response.data.results;
      // Assuming you want to display the movie titles
      const movieTitles = movies.map((movie: any) => movie.title);
      setItems(movieTitles);
    } catch (error) {
      console.error('Error searching for movies:', error);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-4">
      <div className="mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Search for a movie"
          className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-400"
        />
        <button onClick={onSearch} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded focus:outline-none">
          Search
        </button>
      </div>
      <form onSubmit={onSubmit} className="mb-4">
        New Item: <input ref={inputRef} type="text" className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-400" />
        <button type="submit" className="mt-2 bg-green-500 text-white px-4 py-2 rounded focus:outline-none">
          Add
        </button>
      </form>
      <h3 className="text-lg font-semibold mb-2">Items</h3>
      <div className="flex flex-wrap">
        {filteredItems.map(item => (
          <div key={item} className="px-3 py-2 m-1 bg-gray-200 rounded">{item}</div>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
