'use client'

import type { Product } from '@/types/products'
import { Check, Clock, Medal } from 'lucide-react'

interface ProductBadgesProps {
  product: Product
}

export function ProductBadges({ product }: ProductBadgesProps) {
  return (
    <div className='flex flex-wrap items-center gap-1'>
      {product.attributes.isBestSeller === true && (
        <div className='flex w-fit items-center gap-1 rounded-md bg-blue-400/20 px-2 py-1'>
          <Medal className='size-4 stroke-2 text-blue-500' />
          <span className='text-secondary-foreground text-xs font-medium md:text-sm'>
            Best Seller
          </span>
        </div>
      )}
      {product.stockStatus.statue !== 'E' ? (
        <div className='flex w-fit items-center gap-1 rounded-md bg-green-400/20 px-2 py-1'>
          <Check className='size-4 stroke-2 text-green-500' />
          <span className='text-secondary-foreground text-xs font-medium md:text-sm'>
            In Stock
          </span>
        </div>
      ) : (
        <div className='flex w-fit items-center gap-1 rounded-md bg-yellow-400/20 px-2 py-1'>
          <Clock className='size-4 stroke-2 text-yellow-500' />
          <span className='text-secondary-foreground text-xs font-medium md:text-sm'>
            Available for order
          </span>
        </div>
      )}
    </div>
  )
}
