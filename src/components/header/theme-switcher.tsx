'use client'

import { useTheme } from 'next-themes'
import * as React from 'react'

import * as Button from '@/components/ui/button'
import * as Dropdown from '@/components/ui/dropdown'

import { RiSunLine, RiMoonLine, RiEqualizer3Fill } from '@remixicon/react'

export function ThemeSwitcher(props: React.ComponentProps<typeof Button.Root>) {
  const { setTheme } = useTheme()

  return (
    <Dropdown.Root>
      <Dropdown.Trigger asChild>
        <Button.Root variant="neutral" mode="ghost" {...props}>
          <RiSunLine className="size-5 shrink-0 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <RiMoonLine className="absolute size-5 shrink-0 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button.Root>
      </Dropdown.Trigger>
      <Dropdown.Content align="end">
        <Dropdown.Item
          className="flex items-center gap-2"
          onClick={() => setTheme('light')}
        >
          <Dropdown.ItemIcon as={RiSunLine} />
          Light
        </Dropdown.Item>
        <Dropdown.Item
          className="flex items-center gap-2"
          onClick={() => setTheme('dark')}
        >
          <Dropdown.ItemIcon as={RiMoonLine} />
          Dark
        </Dropdown.Item>
        <Dropdown.Item
          className="flex items-center gap-2"
          onClick={() => setTheme('system')}
        >
          <Dropdown.ItemIcon as={RiEqualizer3Fill} />
          System
        </Dropdown.Item>
      </Dropdown.Content>
    </Dropdown.Root>
  )
}
