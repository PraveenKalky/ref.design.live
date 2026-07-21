import React, { useState } from 'react';
import { Link } from 'lucide-react';

export default function UITasteInput({ onAddPost, isFetching }) {
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('Landing Pages');

  const categories = [
    'Landing Pages', 'Dashboard', 'Mobile App', 'Forms', 
    'Authentication', 'E-commerce', 'Fintech', 'SaaS', 
    'Portfolio', 'Animation', 'Motion', 'Navigation', 
    'Components', 'Typography', 'AI', 'Miscellaneous'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url.trim()) return;
    onAddPost(url, category);
    setUrl(''); // Clear input after submission
  };

  return (
    <div className="ui-tastes-input-section">
      <form onSubmit={handleSubmit} className="ui-tastes-input-wrapper">
        <Link size={20} color="#888888" />
        <input 
          type="url" 
          className="ui-tastes-url-input" 
          placeholder="Paste post URL (Dribbble, X, Behance, etc.)" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        
        <select 
          className="ui-tastes-category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        
        <button 
          type="submit" 
          className="ui-tastes-add-btn"
          disabled={isFetching || !url.trim()}
        >
          {isFetching ? 'Fetching...' : '+ Add Post'}
        </button>
      </form>
    </div>
  );
}
