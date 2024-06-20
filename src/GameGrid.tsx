import {
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useBoolean,
} from '@chakra-ui/react'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'

import { AppActionTypes, ButtonImage, Outcome } from './lib/types'
import { GameCard } from './GameCard'
import { GameCtx } from './StateMgr'
export interface GridProps {
  rows: number
  columns: number
}

export const GameGrid = ({ rows = 3, columns = 3 }: GridProps) => {
  const { state, dispatch } = useContext(GameCtx)
  const [flipped, setFlipped] = useBoolean(false)
  const [lose, setLose] = useBoolean(false)
  const [win, setWin] = useBoolean(false)

  const buttonsRef = useRef<boolean>(false)

  const play = () => {
    if (!buttonsRef.current) {
      buttonsRef.current = true
      dispatch({ type: AppActionTypes.SHUFFLE })
      setFlipped.toggle()
      setTimeout(() => {
        setFlipped.toggle()

        setTimeout(() => (buttonsRef.current = false), 500)
      }, 2000)
    }
  }

  const pickCard = useCallback(
    (c: string) => {
      const idx = state.slots.indexOf(c)
      return idx > -1 ? state.buttons[idx] : ButtonImage.NONE
    },
    [state.buttons, state.slots],
  )

  useEffect(() => {
    if (state.outcome === Outcome.WON) {
      setWin.on()
    }
    if (state.outcome === Outcome.LOST) {
      setLose.on()
    }
  }, [setLose, setWin, state.outcome])

  useEffect(() => {
    if (state.moves?.length && state.slots?.length) {
      const lastMove = state.moves.slice(-1)[0]
      if (state.slots.indexOf(lastMove) < 0) {
        dispatch({ type: AppActionTypes.LOSE })
      } else {
        if (state.moves.length === state.slots.length) {
          dispatch({ type: AppActionTypes.WIN })
        }
      }
    }
  }, [dispatch, state.moves, state.slots])

  return (
    <Grid
      templateColumns={Array(columns).fill('auto').join(' ')}
      gap={2}
      sx={{
        border: '1px solid #ccc',
        margin: 'auto',
        w: 'md',
        h: 'md',
        p: 1,
      }}
    >
      <GridItem colSpan={state.gridColumns} sx={{ display: 'flex' }}>
        <Button size="lg" color="green.500" onClick={play}>
          Shuffle cards
        </Button>
        <Modal
          isCentered
          motionPreset="scale"
          onClose={() => {
            setWin.off()
          }}
          isOpen={win}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>You Win!</ModalHeader>
            <ModalBody>Play again!</ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setWin.off()}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isCentered
          motionPreset="scale"
          onClose={() => {
            setLose.off()
            play()
          }}
          isOpen={lose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>You Lose!</ModalHeader>
            <ModalCloseButton />
            <ModalBody>Try again!</ModalBody>
            <ModalFooter>
              <Button variant="ghost" onClick={() => setLose.off()}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </GridItem>
      {state.matrix.map((xy) =>
        xy.map((c) => (
          <GridItem
            key={c}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <GameCard id={c} card={pickCard(c)} flipped={flipped} />
          </GridItem>
        )),
      )}
    </Grid>
  )
}
