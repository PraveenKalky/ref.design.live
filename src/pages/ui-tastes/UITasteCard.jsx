import React from 'react';
import { Bookmark, Play } from 'lucide-react';

export default function UITasteCard({ post, isSaved, toggleSave }) {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className="taste-card">
      <div 
        className="taste-card-media-wrapper"
        onClick={() => window.open(post.url, '_blank')}
      >
        {imageError ? (
          <div className="taste-card-fallback-media">
            <span>{post.platform ? post.platform[0] : 'U'}</span>
            <small>Media not available</small>
          </div>
        ) : (
          <img 
            src={post.media_url} 
            alt={post.description || post.username} 
            className="taste-card-image" 
            onError={() => setImageError(true)}
          />
        )}
        
        {post.is_video && (
          <div className="taste-card-video-indicator">
            <Play fill="white" size={20} />
          </div>
        )}

        <div className="taste-card-overlay">
          <div className="card-actions">
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                if(toggleSave) toggleSave(post.id); 
              }}
              className={`card-action-btn card-action-save ${isSaved ? 'saved' : ''}`}
            >
              <Bookmark 
                strokeWidth={2} 
                size={18} 
                className={isSaved ? 'save-icon-filled' : ''} 
              /> 
              {isSaved ? 'Saved' : 'Save'}
            </button>
          </div>
        </div>
      </div>
      
      <div className="taste-card-meta">
        <div className="taste-card-header">
          <span className="taste-card-username">@{post.username}</span>
          <span className="taste-card-platform">{post.platform}</span>
        </div>
        {post.description && (
          <p className="taste-card-description">{post.description}</p>
        )}
      </div>
    </div>
  );
}
