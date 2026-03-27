import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qigpanyhnraxoudsenxl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZ3BhbnlobnJheG91ZHNlbnhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDYwNjUyOSwiZXhwIjoyMDkwMTgyNTI5fQ.PZTTrJ6EB1s6-yxpNk8o5WcaOgrfCqTmGTYbRVTItFA'
)

const now = new Date().toISOString()

const listings = [
  {
    name: 'Dr. Anna Müller',
    category: 'Doctors',
    specialty: 'Gynecologist',
    description: 'Highly recommended English-speaking gynecologist in the 1st district. Very thorough, takes her time with each patient. Accepts most health insurance plans.',
    address: 'Wollzeile 12, 1010 Wien',
    district: 1,
    website: 'https://www.docfinder.at',
    instagram: '@dr.anna.wien',
    phone: '+43 1 512 34 56',
    tags: ['english-speaking', 'insurance-accepted', 'female-doctor'],
    status: 'published',
    submitted_at: now,
    published_at: now,
  },
  {
    name: 'Café Schwarzenberg',
    category: 'Food & Drink',
    description: 'Classic Viennese coffeehouse with the most stunning Ringstrasse views. Perfect for a long Sunday brunch or afternoon Melange. Warm, welcoming staff.',
    address: 'Kärntner Ring 17, 1010 Wien',
    district: 1,
    website: 'https://www.cafe-schwarzenberg.at',
    instagram: '@cafeschwarzenberg',
    tags: ['brunch', 'coffee', 'viennese-tradition', 'english-menu'],
    status: 'published',
    submitted_at: now,
    published_at: now,
  },
  {
    name: 'Naschmarkt',
    category: 'Shopping & Markets',
    description: 'Vienna\'s most famous open-air market with over 100 stalls. Fresh produce, international foods, spices and flowers. Best on Saturday mornings. Bring a tote bag!',
    address: 'Naschmarkt, 1060 Wien',
    district: 6,
    website: 'https://www.wiener-naschmarkt.eu',
    tags: ['market', 'fresh-produce', 'international', 'saturday'],
    status: 'published',
    submitted_at: now,
    published_at: now,
  },
  {
    name: 'Bikram Yoga Vienna',
    category: 'Health & Wellness',
    description: 'Fantastic hot yoga studio with experienced international teachers. Classes in English available daily. First class free for newcomers. Towel rental on site.',
    address: 'Mariahilfer Straße 101, 1060 Wien',
    district: 6,
    website: 'https://www.bikramyogavienna.com',
    instagram: '@bikramyogavienna',
    phone: '+43 1 595 77 00',
    tags: ['yoga', 'english-speaking', 'first-class-free', 'wellness'],
    status: 'published',
    submitted_at: now,
    published_at: now,
  },
  {
    name: 'Wiener Staatsoper',
    category: 'Events & Culture',
    description: 'One of the world\'s leading opera houses. Standing room tickets from just €4 — buy them 80 minutes before the performance. An unmissable Vienna experience.',
    address: 'Opernring 2, 1010 Wien',
    district: 1,
    website: 'https://www.wiener-staatsoper.at',
    instagram: '@wienerstaatsoper',
    tags: ['opera', 'culture', 'standing-room', 'affordable'],
    status: 'published',
    submitted_at: now,
    published_at: now,
  },
  {
    name: 'Frauenservicestelle Wien',
    category: 'Services',
    description: 'Free counselling and support services for women in Vienna. Covers legal advice, career guidance, and general life support. Available in multiple languages.',
    address: 'Wiedner Gürtel 10, 1040 Wien',
    district: 4,
    website: 'https://www.wien.gv.at/frauenservice',
    phone: '+43 1 400 08 000',
    tags: ['legal-advice', 'free', 'multilingual', 'support'],
    status: 'published',
    submitted_at: now,
    published_at: now,
  },
  {
    name: 'Dr. Sarah Chen',
    category: 'Doctors',
    specialty: 'Dermatologist',
    description: 'Excellent dermatologist, fluent in English and Mandarin. Specialises in both medical and aesthetic dermatology. Modern practice, online booking available.',
    address: 'Tuchlauben 8, 1010 Wien',
    district: 1,
    website: 'https://www.docfinder.at',
    instagram: '@drsarahchen.wien',
    phone: '+43 1 533 12 90',
    tags: ['english-speaking', 'mandarin', 'online-booking', 'aesthetic'],
    status: 'published',
    submitted_at: now,
    published_at: now,
  },
  {
    name: 'Vollpension',
    category: 'Food & Drink',
    description: 'Café run by senior citizens with the best homemade cakes in Vienna. Incredible atmosphere, incredible Topfenstrudel. A true community gem — always busy on weekends.',
    address: 'Schleifmühlgasse 16, 1040 Wien',
    district: 4,
    website: 'https://www.vollpension.wien',
    instagram: '@vollpension.wien',
    tags: ['cake', 'community', 'cozy', 'weekend-brunch'],
    status: 'published',
    submitted_at: now,
    published_at: now,
  },
  {
    name: 'Buchhandlung Walther König',
    category: 'Shopping & Markets',
    description: 'The best art book shop in Vienna, located inside the Museumsquartier. Stunning selection of design, photography, and architecture books. A must for creatives.',
    address: 'Museumsplatz 1, 1070 Wien',
    district: 7,
    website: 'https://www.buchhandlung-walther-koenig.de',
    tags: ['books', 'art', 'design', 'museumsquartier'],
    status: 'published',
    submitted_at: now,
    published_at: now,
  },
]

const { data, error } = await supabase.from('listings').insert(listings).select()

if (error) {
  console.error('Seed failed:', error.message)
} else {
  console.log(`✓ Seeded ${data.length} listings`)
}
