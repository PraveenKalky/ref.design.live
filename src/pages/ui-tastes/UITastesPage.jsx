import React, { useState, useEffect } from 'react';
import UITasteInput from './UITasteInput';
import UITasteCard from './UITasteCard';
import '../../components/card-grid/card-grid.css'; // For reusing card hover states
import './ui-tastes.css';
import { supabase } from '../../lib/supabase';

export default function UITastesPage({ savedItems, toggleSave }) {
  const [posts, setPosts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    // Initial fetch
    fetchPosts();

    // Subscribe to real-time changes so the page updates immediately when the Telegram bot inserts a row
    const subscription = supabase
      .channel('ui_tastes_changes')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'ui_tastes' }, (payload) => {
        setPosts((currentPosts) => [payload.new, ...currentPosts]);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  const fetchPosts = async () => {
    const { data, error } = await supabase
      .from('ui_tastes')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data || []);
      // Trigger migration for existing placeholders in the background
      if (data) {
        migratePlaceholders(data);
      }
    }
  };

  // Helper to migrate existing placeholders
  const migratePlaceholders = async (currentPosts) => {
    const placeholderUrl = 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356';
    const postsToMigrate = currentPosts.filter(p => p.media_url && p.media_url.includes(placeholderUrl));
    
    if (postsToMigrate.length === 0) return;

    for (const post of postsToMigrate) {
      try {
        const fetchUrl = `https://api.microlink.io?url=${encodeURIComponent(post.url)}`;
        const res = await fetch(fetchUrl);
        const json = await res.json();
        
        if (json.status === 'success' && json.data) {
          const mediaUrl = json.data.image?.url || json.data.screenshot?.url || post.media_url;
          const isVideo = !!json.data.video;
          const description = json.data.description || post.description;
          const username = json.data.title?.substring(0, 60) || post.username;

          // Update database
          const { error } = await supabase
            .from('ui_tastes')
            .update({
              media_url: mediaUrl,
              is_video: isVideo,
              description: description,
              username: username
            })
            .eq('id', post.id);

          if (!error) {
            // Update local state
            setPosts(prev => prev.map(p => p.id === post.id ? { ...p, media_url: mediaUrl, is_video: isVideo, description, username } : p));
          }
        }
      } catch (err) {
        console.error('Failed to migrate post:', post.id, err);
      }
    }
  };

  // Keep handleAddPost for manual additions via the UI if needed
  const handleAddPost = async (url, category) => {
    setIsFetching(true);
    
    // Determine platform
    let platform = 'Web';
    if (url.includes('dribbble.com')) platform = 'Dribbble';
    else if (url.includes('twitter.com') || url.includes('x.com')) platform = 'X';
    else if (url.includes('behance.net')) platform = 'Behance';
    else if (url.includes('instagram.com')) platform = 'Instagram';
    else if (url.includes('linkedin.com')) platform = 'LinkedIn';

    let mediaUrl = 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
    let isVideo = false;
    let description = `Manually added ${category} inspiration.`;
    let username = 'manual_upload';

    try {
      // Use Microlink API to fetch metadata
      const fetchUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}`;
      const res = await fetch(fetchUrl);
      const json = await res.json();
      
      if (json.status === 'success' && json.data) {
        mediaUrl = json.data.image?.url || json.data.screenshot?.url || mediaUrl;
        isVideo = !!json.data.video;
        description = json.data.description || description;
        username = json.data.title?.substring(0, 60) || username;
      }
    } catch (err) {
      console.error('Failed to fetch link metadata, using fallback details', err);
    }

    const { error } = await supabase
      .from('ui_tastes')
      .insert([
        { 
          url, 
          platform,
          username,
          description,
          media_url: mediaUrl,
          is_video: isVideo,
          category
        }
      ]);
      
    if (error) {
      console.error('Error adding post:', error);
    } else {
      // Re-fetch to ensure local state syncs up
      fetchPosts();
    }
    setIsFetching(false);
  };

  return (
    <div className="ui-tastes-page">
      <div className="ui-tastes-container">
        
        <UITasteInput onAddPost={handleAddPost} isFetching={isFetching} />

        {/* Future Architecture Placeholder for Filters/Sorting */}
        {/* <FilterBar /> */}

        <div className="ui-tastes-grid">
          {posts.map(post => (
            <div key={post.id} className="ui-tastes-grid-item">
              <UITasteCard 
                post={post} 
                isSaved={savedItems ? savedItems[post.id] : false}
                toggleSave={toggleSave}
              />
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
