'use client'

import { Bath, ShowerHead, Toilet } from 'lucide-react'
import { TabsList, TabsTrigger } from '../ui/tabs'

const QUICK_FILTERS = [
  { value: 'toilets', label: 'Toilets', icon: Toilet },
  { value: 'showers', label: 'Showers', icon: ShowerHead },
  { value: 'baths', label: 'Baths', icon: Bath },
] as const

interface ProductTabsProps {
  disabled?: boolean
}

export function ProductTabs({ disabled = false }: ProductTabsProps) {
  return (
    <TabsList>
      {QUICK_FILTERS.map((filter) => {
        const Icon = filter.icon
        return (
          <TabsTrigger
            key={filter.value}
            value={filter.value}
            disabled={disabled}
            aria-label={`Filter by ${filter.label}`}
          >
            <Icon className='size-5 stroke-2' aria-hidden='true' />
            {filter.label}
          </TabsTrigger>
        )
      })}
    </TabsList>
  )
}
