import { useContext } from 'react'

import { DialogueContext } from '../context/DialogueContext'

export const useDialogues = () => {
    const context = useContext(DialogueContext)
    if (context === undefined) {
      throw new Error('useDialogues must be used within a DialogueProvider')
    }
    return context
}