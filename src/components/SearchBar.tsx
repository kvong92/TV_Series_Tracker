import React, { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { BiSearch } from 'react-icons/bi';

export const SearchBar: React.FC = () => {
  const [location, setLocation] = useSearchParams();
  const [query, setQuery] = useState<string>(location.get('search') || '');

  async function onSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (query.length > 0) {
     location.set('search', query);
     location.delete('genre');
     location.delete('page');

      setLocation(location);
      return;
    }
    location.delete('search');
    setLocation(location);
  }

  return (
    <form className="py-9 w-full h-full" onSubmit={onSearch}>
        <button type='submit' className="rounded-full p-3 focus:outline-none text-black absolute">
          <BiSearch />
        </button>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Type to search..."
          className="rounded-full pl-10 w-full h-full px-3 py-2 bg-inherit border border-gray-300 shadow-sm focus:outline-none focus:border-blue-400 bg-white"
        />
    </form>
  );
};

export default SearchBar;
