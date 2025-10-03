"use client"

import { createContext, useContext, useState, ReactNode } from "react"

interface Modal {
  id: string
  component: ReactNode
  props?: any
}

interface ModalContextType {
  modals: Modal[]
  openModal: (id: string, component: ReactNode, props?: any) => void
  closeModal: (id: string) => void
  closeAllModals: () => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export function useModal() {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider")
  }
  return context
}

interface ModalProviderProps {
  children: ReactNode
}

export function ModalProvider({ children }: ModalProviderProps) {
  const [modals, setModals] = useState<Modal[]>([])

  const openModal = (id: string, component: ReactNode, props?: any) => {
    setModals(prev => [
      ...prev.filter(modal => modal.id !== id), // Remove existing modal with same id
      { id, component, props }
    ])
  }

  const closeModal = (id: string) => {
    setModals(prev => prev.filter(modal => modal.id !== id))
  }

  const closeAllModals = () => {
    setModals([])
  }

  return (
    <ModalContext.Provider value={{ modals, openModal, closeModal, closeAllModals }}>
      {children}
      
      {/* Render all active modals */}
      {modals.map(modal => (
        <div key={modal.id}>
          {modal.component}
        </div>
      ))}
    </ModalContext.Provider>
  )
}