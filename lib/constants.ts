import { Category } from './types'
import { Stethoscope, UtensilsCrossed, ShoppingBag, Leaf, Ticket, Briefcase, Sparkles, Users, LucideIcon } from 'lucide-react'

export const CATEGORIES: { label: Category; icon: LucideIcon; color: string }[] = [
  { label: 'Doctors', icon: Stethoscope, color: 'text-red-800 border-red-400' },
  { label: 'Food & Drink', icon: UtensilsCrossed, color: 'text-orange-700 border-orange-400' },
  { label: 'Shopping & Markets', icon: ShoppingBag, color: 'text-teal-800 border-teal-400' },
  { label: 'Health & Wellness', icon: Leaf, color: 'text-emerald-800 border-emerald-400' },
  { label: 'Events & Culture', icon: Ticket, color: 'text-fuchsia-800 border-fuchsia-400' },
  { label: 'Services', icon: Briefcase, color: 'text-sky-800 border-sky-400' },
  { label: 'Beauty & Style', icon: Sparkles, color: 'text-pink-700 border-pink-400' },
  { label: 'Coaching & Consulting', icon: Users, color: 'text-violet-800 border-violet-400' },
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
