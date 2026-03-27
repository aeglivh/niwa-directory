import { Category } from './types'

export const CATEGORIES: { label: Category; icon: string; color: string }[] = [
  { label: 'Doctors', icon: '⚕️', color: 'bg-rose-50 text-rose-800 border-rose-200' },
  { label: 'Food & Drink', icon: '☕', color: 'bg-amber-50 text-amber-800 border-amber-200' },
  { label: 'Shopping & Markets', icon: '🛍', color: 'bg-stone-50 text-stone-800 border-stone-200' },
  { label: 'Health & Wellness', icon: '🌿', color: 'bg-green-50 text-green-800 border-green-200' },
  { label: 'Events & Culture', icon: '🎭', color: 'bg-purple-50 text-purple-800 border-purple-200' },
  { label: 'Services', icon: '✦', color: 'bg-blue-50 text-blue-800 border-blue-200' },
]

export const VIENNA_DISTRICTS = Array.from({ length: 23 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}. Bezirk`,
}))

export const DOCTOR_SPECIALTIES = [
  'General Practitioner',
  'Gynecologist',
  'Dermatologist',
  'Dentist',
  'Ophthalmologist',
  'Orthopedist',
  'Psychiatrist / Psychologist',
  'Pediatrician',
  'Cardiologist',
  'Neurologist',
  'Endocrinologist',
  'Physiotherapist',
  'Nutritionist',
  'Other',
]
