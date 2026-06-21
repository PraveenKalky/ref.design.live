import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { initialFontsData } from '../data/fontsData';

/**
 * Fetches fonts from Supabase `fonts` table.
 * Falls back to local initialFontsData if the fetch fails.
 */
export const useFonts = () => {
  const [fonts, setFonts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFonts = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase
          .from('fonts')
          .select('*')
          .order('id', { ascending: true });

        if (fetchError) throw fetchError;

        if (!data || data.length === 0) {
          // Table empty — fall back to local data
          console.warn('[useFonts] No fonts in DB, using local fallback');
          setFonts(normalizeLocal(initialFontsData));
        } else {
          setFonts(normalizeDB(data));
        }
      } catch (err) {
        console.error('[useFonts] Error fetching fonts:', err.message);
        setError(err.message);
        // Always fall back so the UI doesn't break
        setFonts(normalizeLocal(initialFontsData));
      } finally {
        setLoading(false);
      }
    };

    fetchFonts();
  }, []);

  return { fonts, loading, error };
};

/** Map Supabase snake_case → the shape FontCard expects */
const normalizeDB = (rows) =>
  rows.map((r) => ({
    id: r.id,
    name: r.name,
    description: r.description,
    stylesInfo: r.styles_info,
    category: r.category,
    badge: r.badge || null,
    isVariable: r.is_variable,
    googleFont: r.google_font,
    weightsAndStyles: r.weights_and_styles,
    languageSupport: r.language_support,
    releaseYear: r.release_year,
    stylesList: r.styles_list || [],
  }));

/** Local data already has camelCase — just pass through */
const normalizeLocal = (data) => data;
