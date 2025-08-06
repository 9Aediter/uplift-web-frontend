"use client"

import { useErrorHandler } from "@/hooks/use-error-handler"

export function ErrorHandler() {
  useErrorHandler()
  return null
}