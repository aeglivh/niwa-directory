import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://qigpanyhnraxoudsenxl.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZ3BhbnlobnJheG91ZHNlbnhsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NDYwNjUyOSwiZXhwIjoyMDkwMTgyNTI5fQ.PZTTrJ6EB1s6-yxpNk8o5WcaOgrfCqTmGTYbRVTItFA'
)

const now = new Date().toISOString()

const listings = [
  {
    name: 'Gasthaus Reinthaler',
    category: 'Food & Drink',
    description: 'Family-run Viennese Gasthaus since 1977, steps from Kaerntner Strasse and the Albertina. Classic Viennese cuisine with a daily lunch menu. Open Mon-Fri 11:00-23:00.',
    address: 'Gluckgasse 5, 1010 Wien',
    district: 1,
    website: 'https://www.gasthausreinthaler.at',
    phone: '+43 1 512 33 66',
    tags: ['traditional', 'lunch-menu', 'viennese-cuisine', 'family-run'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'Schnitzelwirt',
    category: 'Food & Drink',
    description: 'Vienna institution for over 50 years, famous for enormous high-quality schnitzels at honest prices. A cult favourite among locals and expats. Open Tue-Sat 10:45-21:30.',
    address: 'Neubaugasse 52, 1070 Wien',
    district: 7,
    website: 'https://www.schnitzelwirt.co.at',
    phone: '+43 1 523 37 71',
    tags: ['schnitzel', 'classic', 'affordable', 'local-favourite'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'Alt Wiener Gastwirtschaft Schilling',
    category: 'Food & Drink',
    description: 'Traditional Alt-Wiener Gasthaus in the 7th district serving authentic Austrian home cooking. A beloved neighbourhood classic.',
    address: 'Burggasse 103, 1070 Wien',
    district: 7,
    website: 'https://www.schilling-wirt.at',
    phone: '+43 1 524 17 75',
    tags: ['traditional', 'austrian', 'neighbourhood', 'home-cooking'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'FamilyDoc - Dr. Jose Ozcariz',
    category: 'Doctors',
    specialty: 'General Practitioner',
    description: 'English, German and Spanish-speaking family doctor in the 4th district. Private practice, ideal for the international community. Covers all general health needs for the whole family.',
    address: 'Weyringergasse 10/6, 1040 Wien',
    district: 4,
    website: 'https://www.familydoc.at',
    phone: '+43 664 446 60 50',
    tags: ['english-speaking', 'spanish-speaking', 'gp', 'expat-friendly', 'private'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'HNO-Doctors (Gschnait / Vogel / Zumtobel)',
    category: 'Doctors',
    specialty: 'Other',
    description: 'ENT (ear, nose and throat) specialist practice in the 13th district. Team of three specialists covering hearing, phoniatry, sleep medicine, tinnitus and paediatric allergology.',
    address: 'Hietzinger Kai 67-69/2.DG, 1130 Wien',
    district: 13,
    website: 'https://www.hno-doctors.at',
    phone: '+43 1 894 63 68',
    tags: ['ent', 'hearing', 'tinnitus', 'sleep-medicine', 'paediatric'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'Smooth Skin Studio',
    category: 'Beauty & Style',
    description: 'Beauty studio in the 22nd district offering facial care, nail treatments, nail prosthetics and permanent hair removal using top professional products.',
    address: 'Barbara-Prammer-Allee 13/2/2, 1220 Wien',
    district: 22,
    website: 'https://www.smooth-skin.at',
    phone: '+43 660 956 19 10',
    tags: ['beauty', 'facials', 'nails', 'hair-removal', 'nail-prosthetics'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'Orthopadie Burggasse - Dr. Pamela Jahn',
    category: 'Doctors',
    specialty: 'Orthopedist',
    description: 'English-speaking orthopaedic specialist practice in the 7th district.',
    address: 'Burggasse 94A, 1070 Wien',
    district: 7,
    website: 'https://www.burggasse.at',
    phone: '+43 1 295 10 70',
    tags: ['english-speaking', 'orthopaedics', 'female-doctor'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'ARTUS Steuerberatung',
    category: 'Services',
    description: 'Tax advisory, accounting and business consulting firm in the 1st district. English-speaking team with expertise in expat tax matters, payroll, real estate and startups.',
    address: 'Stubenring 24, 1010 Wien',
    district: 1,
    website: 'https://artus.at',
    phone: '+43 50 2788',
    instagram: 'https://instagram.com/start.us',
    tags: ['tax', 'accounting', 'english-speaking', 'expat-friendly', 'business-consulting'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'Express Tailor - Schneiderei',
    category: 'Services',
    description: 'Same-day tailoring and alterations in the 8th district. Trouser hemming, custom garments for men and women, leather goods repairs and lining replacements.',
    address: 'Skodagasse 25, 1080 Wien',
    district: 8,
    website: 'https://www.schneiderservice.at',
    phone: '+43 1 40 55 927',
    tags: ['tailoring', 'alterations', 'same-day', 'custom', 'leather'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'Re Kompany - Art & Wellness Cafe',
    category: 'Events & Culture',
    description: "Vienna's first art and wellness cafe in the 4th district. Art classes (mandala, canvas painting), yoga sessions, room rentals and cafe. A creative and calming space.",
    address: 'Schonburgstrasse 36, 1040 Wien',
    district: 4,
    website: 'https://rekompany.com',
    instagram: 'https://instagram.com/rekompany',
    tags: ['art-classes', 'yoga', 'cafe', 'wellness', 'community'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'CEWE Biometric Passport Photos',
    category: 'Services',
    description: 'Official biometric passport photo service via smartphone app, guaranteed accepted by Austrian authorities. Available at dm and Mueller stores across Vienna. No appointment needed.',
    website: 'https://www.cewe-fotoservice.at',
    phone: '+43 1 436 00 43',
    tags: ['passport-photo', 'biometric', 'dm', 'official', 'no-appointment'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'ID Austria - Appointment Tracker',
    category: 'Services',
    description: 'Unofficial tracker showing live available appointment slots for ID Austria registration across Vienna police stations and district offices. Saves hours of manual searching.',
    website: 'https://id-austria.info',
    tags: ['id-austria', 'appointments', 'registration', 'government', 'digital-id'],
    status: 'published', submitted_at: now, published_at: now,
  },
  {
    name: 'Migration.gv.at - Immigration Info',
    category: 'Services',
    description: 'Official Austrian government portal for immigration. Covers permanent residence, the Red-White-Red Card, family reunification and all residence permit types. Available in English.',
    website: 'https://www.migration.gv.at/en',
    tags: ['immigration', 'residence-permit', 'red-white-red-card', 'government', 'english'],
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
