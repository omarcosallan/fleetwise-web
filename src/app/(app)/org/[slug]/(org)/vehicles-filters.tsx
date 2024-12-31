'use client'

import { Filter, Loader2, X } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState, useTransition } from 'react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

export function VehiclesFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [isPendingFilterTransition, startTransition] = useTransition()

  const [search, setSearch] = useState(searchParams.get('search') ?? '')

  function handleFilter(event: FormEvent) {
    event.preventDefault()

    const params = new URLSearchParams(searchParams)

    if (search) params.set('search', search)
    else params.delete('search')

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  function handleResetFilters() {
    setSearch('')

    const params = new URLSearchParams(searchParams)

    params.delete('search')

    router.push(`${pathname}?${params.toString()}`)
  }

  const hasFilters = search !== ''

  return (
    <form onSubmit={handleFilter} className="flex items-center gap-2">
      <Input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Filter vehicles..."
        className="h-8 w-auto"
      />

      <Separator orientation="vertical" className="h-6" />

      <div className="flex items-center gap-2">
        <Button type="submit" size="sm" variant="secondary">
          {isPendingFilterTransition ? (
            <Loader2 className="mr-2 size-3 animate-spin" />
          ) : (
            <Filter className="mr-2 size-3" />
          )}
          Filter
        </Button>

        <Button
          onClick={handleResetFilters}
          disabled={!hasFilters}
          type="button"
          size="sm"
          variant="outline"
        >
          <X className="mr-2 size-3" />
          Reset
        </Button>
      </div>
    </form>
  )
}
