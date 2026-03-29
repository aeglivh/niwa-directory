import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qigpanyhnraxoudsenxl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZ3BhbnlobnJheG91ZHNlbnhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDYwNjUyOSwiZXhwIjoyMDkwMTgyNTI5fQ.PZTTrJ6EB1s6-yxpNk8o5WcaOgrfCqTmGTYbRVTItFA'
)

const now = new Date().toISOString()

const listings = [
  {
    name: 'Dr. Marielle Bauer - Zahnärztin',
    category: 'Doctors',
    specialty: 'Dentist',
    description: 'Dental practice in the 2nd district offering general dentistry, prosthetics, teeth bleaching and oral hygiene for both insurance and private patients.',
    address: 'Taborstraße 5/4, 1020 Wien',
    district: 2,
    website: 'https://www.zahnarzt-bauer.at',
    phone: '+43 677 64872944',
    tags: ['dentist', 'dentistry', 'prosthetics', 'bleaching', 'kassenarzt'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'gyn 7 - Ordination für Frauenheilkunde',
    category: 'Doctors',
    specialty: 'Gynecologist',
    description: 'Gynaecology and obstetrics practice in the 7th district run by Dr. Ekrem Kilic. Accepts all insurance providers and offers online appointment booking.',
    address: 'Neubaugasse 43/3, 1070 Wien',
    district: 7,
    website: 'https://gyn7.at',
    tags: ['gynaecology', 'obstetrics', 'womens-health', 'online-booking', 'kassenarzt'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'Salon Ashu',
    category: 'Beauty & Style',
    description: 'Neighbourhood beauty and cosmetics salon in the 10th district (Favoriten).',
    address: 'Muhrengasse 5, 1100 Wien',
    district: 10,
    instagram: 'https://instagram.com/salonashu',
    phone: '+43 1 6413894',
    tags: ['beauty', 'cosmetics', 'salon', 'favourites'],
    status: 'published', submitted_at: now, published_at: now,
  },
]

const { data, error } = await supabase.from('listings').insert(listings).select('name, status')

if (error) {
  console.error('Error:', error.message)
} else {
  console.log(`Added ${data.length} listings:`)
  data.forEach(l => console.log(` + ${l.name}`))
}
