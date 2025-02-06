import { HistoryRow } from '@services/HistoryHelper'
import { ColumnFiltersState, Row, SortingState } from '@tanstack/react-table'

export type HistoryState = {
  historys: HistoryRow[]
  favoriteHistoryRowIds: string[]
  selectedHistoryRows: HistoryRow[]
  columnFilters: ColumnFiltersState
  globalFilter: string
  openedRow: Row<HistoryRow> | null
  sorting: SortingState
  isLoading: boolean
  error: Error | null
}

export const initialState: HistoryState = {
  historys: [],
  favoriteHistoryRowIds: [],
  selectedHistoryRows: [],
  columnFilters: [],
  globalFilter: '',
  openedRow: null,
  sorting: [],
  isLoading: false,
  error: null,
}

export type HistoryAction =
  | { type: 'SET_HISTORIES'; payload: HistoryRow[] }
  | { type: 'UPDATE_FAVORITE_STATUS'; payload: string }
  | { type: 'UPDATE_SELECTED_ROWS'; payload: HistoryRow }
  | { type: 'SET_COLUMN_FILTERS'; payload: ColumnFiltersState }
  | { type: 'SET_GLOBAL_FILTER'; payload: string }
  | { type: 'SET_OPENED_ROW'; payload: Row<HistoryRow> | null }
  | { type: 'SET_SORTING'; payload: SortingState }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: Error }

export const historyReducer = (state: HistoryState, action: HistoryAction, setFavoriteHistoryRowIds: (value: string[]) => void): HistoryState => {
  switch (action.type) {
    case 'SET_HISTORIES':
      return { ...state, historys: action.payload }

    case 'UPDATE_FAVORITE_STATUS': {
      const { payload: id } = action
      const updatedFavorites = state.favoriteHistoryRowIds.includes(id)
        ? state.favoriteHistoryRowIds.filter((fId) => fId !== id)
        : [...state.favoriteHistoryRowIds, id]
      // Save to localStorage
      setFavoriteHistoryRowIds(updatedFavorites)

      return { ...state, favoriteHistoryRowIds: updatedFavorites }
    }
    case 'UPDATE_SELECTED_ROWS': {
      const { payload: row } = action
      const isRowSelected = state.selectedHistoryRows.some((r) => r.id === row.id)
      return {
        ...state,
        selectedHistoryRows: isRowSelected ? state.selectedHistoryRows.filter((r) => r.id !== row.id) : [...state.selectedHistoryRows, row],
      }
    }

    case 'SET_COLUMN_FILTERS':
      return { ...state, columnFilters: action.payload }
    case 'SET_GLOBAL_FILTER':
      return { ...state, globalFilter: action.payload }
    case 'SET_OPENED_ROW':
      return { ...state, openedRow: action.payload }
    case 'SET_SORTING':
      return { ...state, sorting: action.payload }
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_ERROR':
      return { ...state, error: action.payload }
    default:
      return state
  }
}
