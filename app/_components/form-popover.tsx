'use client'
import { Button } from '@/components/ui/button'
import { PopoverContent } from '@/components/ui/popover'
import { Popover, PopoverTrigger } from '@radix-ui/react-popover'
import { useState } from 'react'

const FormPopover = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="secondary" className="font-heading">
          Login
        </Button>
      </PopoverTrigger>
      <PopoverContent className="">{children}</PopoverContent>
    </Popover>
  )
}

export { FormPopover }
