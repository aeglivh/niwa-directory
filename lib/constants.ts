import { Category } from './types'
import { Stethoscope, UtensilsCrossed, ShoppingBag, Leaf, Ticket, Briefcase, Sparkles, Users, LucideIcon } from 'lucide-react'

export const CATEGORIES: { label: Category; icon: LucideIcon; color: string }[] = [
  { label: 'Doctors', icon: Stethoscope, color: 'text-red-700 border-red-300' },
  { label: 'Food & Drink', icon: UtensilsCrossed, color: 'text-orange-600 border-orange-300' },
  { label: 'Shopping & Markets', icon: ShoppingBag, color: 'text-teal-700 border-teal-300' },
  { label: 'Health & Wellness', icon: Leaf, color: 'text-emerald-700 border-emerald-300' },
  { label: 'Events & Culture', icon: Ticket, color: 'text-fuchsia-700 border-fuchsia-300' },
  { label: 'Services', icon: Briefcase, color: 'text-sky-700 border-sky-300' },
  { label: 'Beauty & Style', icon: Sparkles, color: 'text-pink-600 border-pink-300' },
  { label: 'Coaching & Consulting', icon: Users, color: 'text-violet-700 border-violet-300' },
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
