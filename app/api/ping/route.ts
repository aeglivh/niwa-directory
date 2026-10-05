import { supabase } from '@/lib/supabase'

// Hit daily by a Vercel cron (see vercel.json) so the free Supabase
// project never goes 7 days without activity and gets paused.
export const dynamic = 'force-dynamic'

export async function GET() {
  const { error } = await supabase
    .from('listings')
    .select('id', { count: 'exact', head: true })

  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 })
  return Response.json({ ok: true })
}
