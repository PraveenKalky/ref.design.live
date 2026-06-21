import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

const LS_KEY = 'dv-saved-fonts';

const lsGet = () => {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); }
  catch { return {}; }
};
const lsSet = (val) => localStorage.setItem(LS_KEY, JSON.stringify(val));

/**
 * Returns saved font IDs for the current user and a toggleSave function.
 * - Logged in  → reads/writes Supabase `saved_fonts` table
 * - Logged out → reads/writes localStorage (existing behaviour)
 */
export const useSavedFonts = (openLogin) => {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState(lsGet);

  // When user logs in, fetch their saved fonts from Supabase
  useEffect(() => {
    if (!user) {
      setSavedIds(lsGet());
      return;
    }

    const fetchSaved = async () => {
      const { data, error } = await supabase
        .from('saved_fonts')
        .select('font_id')
        .eq('user_id', user.id);

      if (error) {
        console.error('[useSavedFonts] fetch error:', error.message);
        return;
      }

      // Convert array of {font_id} to {fontId: true} map
      const map = {};
      data.forEach(({ font_id }) => { map[font_id] = true; });
      setSavedIds(map);
    };

    fetchSaved();
  }, [user]);

  const toggleSave = useCallback(async (fontId) => {
    if (!user) {
      // Not logged in — prompt login
      if (openLogin) openLogin();
      return;
    }

    const isSaved = Boolean(savedIds[fontId]);

    // Optimistic update
    setSavedIds((prev) => {
      const next = { ...prev };
      if (isSaved) delete next[fontId];
      else next[fontId] = true;
      return next;
    });

    if (isSaved) {
      const { error } = await supabase
        .from('saved_fonts')
        .delete()
        .eq('user_id', user.id)
        .eq('font_id', fontId);
      if (error) {
        console.error('[useSavedFonts] delete error:', error.message);
        // Roll back
        setSavedIds((prev) => ({ ...prev, [fontId]: true }));
      }
    } else {
      const { error } = await supabase
        .from('saved_fonts')
        .insert({ user_id: user.id, font_id: fontId });
      if (error) {
        console.error('[useSavedFonts] insert error:', error.message);
        // Roll back
        setSavedIds((prev) => {
          const next = { ...prev };
          delete next[fontId];
          return next;
        });
      }
    }
  }, [user, savedIds, openLogin]);

  // Persist locally when logged out
  useEffect(() => {
    if (!user) lsSet(savedIds);
  }, [user, savedIds]);

  const savedCount = Object.values(savedIds).filter(Boolean).length;

  return { savedIds, savedCount, toggleSave };
};
