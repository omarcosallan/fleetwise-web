'use client'

import { Loader2, Search } from 'lucide-react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent, useState, useTransition } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

export function VehicleFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const [isPendingFilterTransition, startTransition] = useTransition()

  const [search, setSearch] = useState(searchParams.get('search') ?? '')
  const [sortBy, setSortBy] = useState(searchParams.get('sortBy') ?? 'model')
  const [orderDirection, setOrderDirection] = useState(
    searchParams.get('order') ?? 'asc',
  )

  function updateFilters(newSearch: string, newSort: string, newOrder: string) {
    const params = new URLSearchParams(searchParams)

    if (newSearch) params.set('search', newSearch)
    else params.delete('search')

    if (newSort) params.set('sortBy', newSort)
    else params.delete('sortBy')

    if (newOrder) params.set('order', newOrder)
    else params.delete('order')

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  function handleFilter(event: FormEvent) {
    event.preventDefault()
    updateFilters(search, sortBy, orderDirection)
  }

  return (
    <form
      onSubmit={handleFilter}
      className="w-full flex flex-col items-center sm:flex-row gap-3"
    >
      <div className="relative w-full">
        <Label htmlFor="search" className="absolute left-3 top-1/2">
          {isPendingFilterTransition ? (
            <Loader2 className="size-4 -translate-y-1/2 text-muted-foreground animate-spin" />
          ) : (
            <Search className="size-4 -translate-y-1/2 text-muted-foreground" />
          )}
        </Label>
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar veículos"
          className="pl-10"
          aria-label="Buscar veículos"
          id="search"
        />
      </div>
      <Select
        value={sortBy}
        onValueChange={(value) => {
          setSortBy(value)
          updateFilters(search, value, orderDirection)
        }}
        disabled={isPendingFilterTransition}
      >
        <SelectTrigger className="w-full sm:max-w-[210px]">
          <SelectValue placeholder="Classificar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="model">Classificar por modelo</SelectItem>
          <SelectItem value="licensePlate">Classificar por placa</SelectItem>
          <SelectItem value="register">Classificar por renavam</SelectItem>
          <SelectItem value="active">Classificar por status</SelectItem>
          <SelectItem value="rented">Classificar por locação</SelectItem>
          <SelectItem value="createdAt">
            Classificar por data de criação
          </SelectItem>
        </SelectContent>
      </Select>
      <Select
        value={orderDirection}
        onValueChange={(value) => {
          setOrderDirection(value)
          updateFilters(search, sortBy, value)
        }}
        disabled={isPendingFilterTransition}
      >
        <SelectTrigger className="w-full sm:max-w-[180px]">
          <SelectValue placeholder="Ordenar direção" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascendente</SelectItem>
          <SelectItem value="desc">Descendente</SelectItem>
        </SelectContent>
      </Select>
    </form>
  )
}
