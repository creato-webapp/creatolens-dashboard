import React, { ReactNode, createContext, useCallback, useState } from 'react'

// Assuming Status is correctly imported from '@components/Dialogue'

export enum Status {
  FAILED = 'FAILED',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
}

type Dialogue = {
  id: number
  message: string
  status: Status
}

type DialogueContextType = {
  dialogues: Dialogue[] // Corrected property name from 'dialoguese' to 'dialogues'
  addDialogue: (message: string, status: Status) => void
}

export const DialogueContext = createContext<DialogueContextType | undefined>(undefined)

let idCounter = 0

export const DialogueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [dialogues, setDialogues] = useState<Dialogue[]>([])

  const addDialogue = useCallback((message: string, status: Status) => {
    const id = ++idCounter
    setDialogues((prev) => [...prev, { id, message, status }])
    // Optionally handle cleanup for async operations if necessary
    const timer = setTimeout(() => {
      setDialogues((prev) => prev.filter((dialogue) => dialogue.id !== id))
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  return <DialogueContext.Provider value={{ dialogues, addDialogue }}>{children}</DialogueContext.Provider>
}