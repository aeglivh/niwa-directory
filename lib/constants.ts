import { Category } from './types'
import { Stethoscope, UtensilsCrossed, ShoppingBag, Leaf, Ticket, Briefcase, LucideIcon } from 'lucide-react'

export const CATEGORIES: { label: Category; icon: LucideIcon; color: string }[] = [
  { label: 'Doctors', icon: Stethoscope, color: 'text-rose-800 border-rose-300' },
  { label: 'Food & Drink', icon: UtensilsCrossed, color: 'text-amber-800 border-amber-300' },
  { label: 'Shopping & Markets', icon: ShoppingBag, color: 'text-stone-700 border-stone-400' },
  { label: 'Health & Wellness', icon: Leaf, color: 'text-green-800 border-green-300' },
  { label: 'Events & Culture', icon: Ticket, color: 'text-purple-800 border-purple-300' },
  { label: 'Services', icon: Briefcase, color: 'text-blue-800 border-blue-300' },
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
