import { PRODUCTS_PER_PAGE } from '@/lib/constants'

export function ProductsSkeleton() {
  return (
    <div className='grid grid-cols-2 gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4'>
      {Array.from({ length: PRODUCTS_PER_PAGE }).map((_, index) => (
        <div
          key={index}
          className='h-[440px] w-full animate-pulse rounded-sm bg-zinc-200 dark:bg-zinc-800'
        />
      ))}
    </div>
  )
}
