export type Category =
  | 'Doctors'
  | 'Food & Drink'
  | 'Shopping & Markets'
  | 'Health & Wellness'
  | 'Events & Culture'
  | 'Services'

export type ListingStatus = 'pending' | 'published' | 'rejected'

export interface Listing {
  id: string
  name: string
  category: Category
  specialty?: string | null
  description: string
  address?: string | null
  district?: number | null
  website?: string | null
  instagram?: string | null
  phone?: string | null
  tags?: string[] | null
  status: ListingStatus
  submitted_by?: string | null
  submitted_at: string
  published_at?: string | null
  og_image?: string | null
}

export interface SubmitFormData {
  name: string
  category: Category
  specialty: string
  description: string
  address: string
  district: string
  website: string
  instagram: string
  phone: string
  tags: string
  submitted_by: string
}
