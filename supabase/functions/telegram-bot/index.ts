import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const TELEGRAM_BOT_TOKEN = Deno.env.get('TELEGRAM_BOT_TOKEN')
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!)

async function fetchMetadata(url: string) {
  let mediaUrl = 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356'
  let description = 'Auto-saved via Telegram.'
  let title = 'imported_post'
  let isVideo = false

  try {
    const fetchUrl = `https://api.microlink.io?url=${encodeURIComponent(url)}`
    const res = await fetch(fetchUrl)
    const json = await res.json()
    
    if (json.status === 'success' && json.data) {
      mediaUrl = json.data.image?.url || json.data.screenshot?.url || mediaUrl
      isVideo = !!json.data.video
      description = json.data.description || description
      title = json.data.title?.substring(0, 60) || title
    }
  } catch (e) {
    console.log("Metadata fetch failed", e)
  }

  return { mediaUrl, description, title, isVideo }
}

serve(async (req) => {
  try {
    const update = await req.json()
    const message = update.message
    
    if (message && message.text) {
      const chatId = message.chat.id
      const text = message.text

      // Extract URL using regex
      const urlRegex = /(https?:\/\/[^\s]+)/g
      const urls = text.match(urlRegex)

      if (urls && urls.length > 0) {
        const postUrl = urls[0]
        
        // Basic platform detection
        let platform = 'Web'
        if (postUrl.includes('dribbble.com')) platform = 'Dribbble'
        else if (postUrl.includes('twitter.com') || postUrl.includes('x.com')) platform = 'X'
        else if (postUrl.includes('behance.net')) platform = 'Behance'
        else if (postUrl.includes('instagram.com')) platform = 'Instagram'
        else if (postUrl.includes('linkedin.com')) platform = 'LinkedIn'

        // Fetch the REAL thumbnail!
        const meta = await fetchMetadata(postUrl)

        // Insert into database
        const { error } = await supabase
          .from('ui_tastes')
          .insert([{ 
            url: postUrl, 
            platform, 
            username: meta.title, 
            description: meta.description, 
            media_url: meta.mediaUrl, 
            is_video: meta.isVideo, 
            category: 'Uncategorized'
          }])

        if (error) throw error

        if (TELEGRAM_BOT_TOKEN) {
          await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text: `✅ Boom! Saved to UI/UX Tastes.\nPlatform: ${platform}`
            })
          })
        }
      }
    }
    
    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (error) {
    console.error("Function crashed:", error)
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
})
