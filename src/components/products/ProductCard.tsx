'use client'

import { getCurrencySymbol } from '@/lib/utils'
import type { Product } from '@/types/products'
import { ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'sonner'
import { Button } from '../ui/button'
import { ProductBadges } from './ProductBadges'

interface ProductCardProps {
  product: Product
  query: string
}

export function ProductCard({ product, query }: ProductCardProps) {
  return (
    <div className='flex h-full flex-col'>
      <div className='bg-card flex h-full flex-col overflow-hidden rounded-sm shadow transition-shadow duration-300 ease-in-out hover:shadow-lg dark:border dark:hover:shadow-xl'>
        <Link
          href={`/${query}/${encodeURIComponent(product.productName)}`}
          title={product.productName}
          className='h-full'
        >
          <div className='max-h-80 w-full overflow-hidden'>
            <Image
              src={product.image.url}
              alt={product.image.attributes.imageAltText}
              width={400}
              height={400}
              loading='eager'
              className='aspect-square h-full w-full object-cover transition-transform duration-500 ease-in-out hover:scale-105'
            />
          </div>

          <div className='flex flex-1 flex-col justify-between gap-3 p-2'>
            <div className='flex items-center justify-between gap-2'>
              <Image
                src={product.brand.brandImage.url}
                alt={product.brand.brandImage.attributes.imageAltText}
                width={80}
                height={20}
                className='object-contain'
                style={{ width: 'auto', height: 'auto' }}
              />
              <div className='flex items-center gap-1'>
                <Star className='size-4 fill-yellow-500 text-yellow-500' />
                <span className='text-secondary-foreground text-sm'>
                  {product.averageRating}
                </span>
              </div>
            </div>
            <div className='space-y-2'>
              <h2 className='text-sm font-bold md:text-base'>
                {product.productName}
              </h2>
              <p className='text-accent text-lg font-bold'>
                {getCurrencySymbol(product.price.currencyCode)}
                {product.price.priceIncTax}
              </p>
              <ProductBadges product={product} />
            </div>
          </div>
        </Link>
        <div className='flex p-2'>
          <Button
            variant='default'
            className='flex-1 font-bold'
            onClick={() => {
              toast.success(<strong>Product Added To Cart</strong>, {
                description: `${product.productName} has been added to your cart`,
              })
            }}
          >
            Add to Cart
            <ShoppingCart className='size-4 stroke-2' />
          </Button>
        </div>
      </div>
    </div>
  )
}
