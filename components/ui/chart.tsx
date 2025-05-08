import * as React from "react"

import { cn } from "@/lib/utils"

const Chart = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("rounded-md border bg-card text-card-foreground", className)} {...props} />
})
Chart.displayName = "Chart"

const ChartHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn("flex items-center justify-between space-y-0 border-b p-4", className)} {...props} />
    )
  },
)
ChartHeader.displayName = "ChartHeader"

const ChartTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props} />
  },
)
ChartTitle.displayName = "ChartTitle"

const ChartDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    return <p ref={ref} className={cn("text-sm text-muted-foreground", className)} {...props} />
  },
)
ChartDescription.displayName = "ChartDescription"

const ChartContainer = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("py-2", className)} {...props} />
  },
)
ChartContainer.displayName = "ChartContainer"

const ChartLegend = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return <div ref={ref} className={cn("mt-4 flex justify-center", className)} {...props} />
  },
)
ChartLegend.displayName = "ChartLegend"

const ChartTooltip = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("rounded-md border bg-secondary p-2 text-secondary-foreground", className)}
        {...props}
      />
    )
  },
)
ChartTooltip.displayName = "ChartTooltip"

export { Chart, ChartHeader, ChartTitle, ChartDescription, ChartContainer, ChartLegend, ChartTooltip }
