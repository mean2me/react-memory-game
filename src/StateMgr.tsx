import { createContext, ReactNode, useReducer } from 'react'
import {
  AppActionTypes,
  ButtonImage,
  IAppAction,
  IAppState,
  IGameCtx,
  Outcome,
} from './lib/types'

import { Box } from '@chakra-ui/layout'
import { shuffle } from 'lodash'
import { allocateSlots, buildMatrix, checkOutcome } from './lib/utils'

const defaultState = {
  level: 0,
  gridColumns: 3,
  gridRows: 3,
  buttons: [
    ButtonImage.B1,
    ButtonImage.B3,
    ButtonImage.B4,
    ButtonImage.B5,
    ButtonImage.B6,
    ButtonImage.B7,
    ButtonImage.B8,
    ButtonImage.B9,
    ButtonImage.B10,
    ButtonImage.B13,
  ],
  slots: [],
  matrix: [],
  moves: [],
  outcome: Outcome.IN_PROGRESS,
}
export const GameCtx = createContext<IGameCtx>({
  state: defaultState,
  dispatch: () => null,
})

function reducer(state: IAppState, action: IAppAction) {
  switch (action.type) {
    case AppActionTypes.SHUFFLE:
      state.buttons = shuffle(defaultState.buttons).slice(0, 3)
      state.matrix = buildMatrix(state.gridRows, state.gridColumns)
      state.slots = allocateSlots(state.matrix)
      state.moves = []
      state.outcome = Outcome.IN_PROGRESS
      break
    case AppActionTypes.MOVE:
      state.moves = [...state.moves, action.payload as string]
      break
    case AppActionTypes.LOSE:
      state.outcome = Outcome.LOST
      break
    case AppActionTypes.WIN:
      state.outcome = Outcome.WON
      break
  }
  return { ...state }
}

export interface IStateMgr {
  children: ReactNode | ReactNode[]
}
export const StateMgr = ({ children }: IStateMgr) => {
  const [state, dispatch] = useReducer(reducer, { ...defaultState })

  return (
    <GameCtx.Provider value={{ state, dispatch }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          w: '100vw',
          h: '100vh',
          overflow: 'hidden',
          m: 0,
          p: 0,
        }}
      >
        {children}
      </Box>
    </GameCtx.Provider>
  )
}
