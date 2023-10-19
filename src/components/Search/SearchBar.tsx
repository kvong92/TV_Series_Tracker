import React, { useRef, useState } from 'react';

export const SearchBar: React.FC = () => {
  const [items, setItems] = useState<string[]>([]);
  const [query, setQuery] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!inputRef.current) return;

    const value = inputRef.current.value;
    if (value === '') return;
    setItems(prev => [...prev, value]);
    inputRef.current.value = '';
  }

  return (
    <div>
      <div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Search for a movie"
        />
        <button>Search</button>
      </div>
      <form onSubmit={onSubmit}>
        New Item: <input ref={inputRef} type="text" />
        <button type="submit">Add</button>
      </form>
      <h3>Items</h3>
      {filteredItems.map(item => (
        <div key={item}>{item}</div>
      ))}
    </div>
  );
};

export default SearchBar;
