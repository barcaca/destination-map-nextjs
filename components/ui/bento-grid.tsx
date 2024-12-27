import { cn } from '@/lib/utils'

interface BentoProps {
  children: React.ReactNode
  className?: string
}

const BentoGrid = ({ children, className }: BentoProps) => {
  return (
    <div
      className={cn(
        'grid grid-flow-row grid-cols-1 gap-4 sm:grid-cols-2 lg:auto-rows-[400px] lg:grid-cols-6',
        className
      )}
    >
      {children}
    </div>
  )
}

const BentoCard = ({ children, className }: BentoProps) => {
  return <div className={cn('relative flex', className)}>{children}</div>
}

export { BentoCard, BentoGrid }
