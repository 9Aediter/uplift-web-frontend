"use client"

import * as React from "react"
import { Badge } from "@/components/button/badge"
import { Button } from "@/components/button/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/input/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { IconDotsVertical } from "@tabler/icons-react"

interface DataCardViewProps {
  data: any[]
  selectedRows: Record<string, boolean>
  onRowSelect: (id: string, selected: boolean) => void
  onSelectAll: (selected: boolean) => void
}

export function DataCardView({
  data,
  selectedRows,
  onRowSelect,
  onSelectAll
}: DataCardViewProps) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        No results found.
      </div>
    )
  }

  const allSelected = data.every(item => selectedRows[item.id?.toString()] || false)
  const someSelected = data.some(item => selectedRows[item.id?.toString()] || false)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 px-4">
        <Checkbox
          checked={someSelected ? (allSelected ? true : "indeterminate") : false}
          onCheckedChange={(checked) => onSelectAll(!!checked)}
          aria-label="Select all"
        />
        <span className="text-sm text-muted-foreground">
          Select all
        </span>
      </div>

      <div className="grid gap-4 px-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => {
          const itemId = item.id?.toString() || Math.random().toString()
          const isSelected = selectedRows[itemId] || false

          return (
            <Card
              key={itemId}
              className={`relative transition-colors ${isSelected ? 'ring-2 ring-primary' : ''
                }`}
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={isSelected}
                    onCheckedChange={(checked) => onRowSelect(itemId, !!checked)}
                    aria-label={`Select ${item.name || item.title || 'item'}`}
                  />
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="h-8 w-8 p-0"
                      size="icon"
                    >
                      <IconDotsVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-32">
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Make a copy</DropdownMenuItem>
                    <DropdownMenuItem>Favorite</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="space-y-2">
                  {Object.entries(item).map(([key, value]) => {
                    if (key === 'id') return null

                    return (
                      <div key={key} className="flex justify-between items-center">
                        <span className="text-sm font-medium text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </span>
                        <div className="text-sm">
                          {key === 'status' ? (
                            <Badge variant="outline" className="text-xs">
                              {value as string}
                            </Badge>
                          ) : typeof value === 'number' ? (
                            <span className="font-mono">{value}</span>
                          ) : (
                            <span className="truncate max-w-32" title={value as string}>
                              {value as string}
                            </span>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}