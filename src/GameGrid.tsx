import { Avatar, Grid, GridItem, useBoolean } from '@chakra-ui/react'
import _, { flatten, shuffle } from 'lodash'
import { useCallback } from 'react'
import { Button } from './Button'
import { ButtonImage } from './lib/types'
import { GameCard } from './GameCard'
export interface GridProps {
  rows: number
  columns: number
}

export const GameGrid = ({ rows = 3, columns = 3 }: GridProps) => {
  const [flipped, setFlipped] = useBoolean(false)
  const arrange = useCallback(() => {
    return Array(rows)
      .fill(null)
      .map((_, i) =>
        Array(columns)
          .fill(null)
          .map((_, j) => [i, j].join(','))
          .flatMap((c) => c),
      )
  }, [rows, columns])

  const shuffled = shuffle(flatten(arrange())).slice(0, 3)
  const buttons = shuffle([
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
  ]).slice(0, 3)

  const pickCard = useCallback(() => {
    return buttons.pop()
  }, [buttons])

  return (
    <div>
      <pre>{JSON.stringify(shuffled)}</pre>
      <Grid
        templateColumns={Array(columns).fill('auto').join(' ')}
        gap={2}
        sx={{
          border: '1px solid #ccc',
          margin: 'auto',
          w: 'md',
          h: 'md',
        }}
        onClick={() => setFlipped.toggle()}
      >
        {arrange().map((xy) =>
          xy.map((c) => (
            <GridItem>
              <GameCard
                card={
                  shuffled.includes(c)
                    ? (pickCard() as ButtonImage)
                    : ButtonImage.NONE
                }
                flipped={flipped}
              />
            </GridItem>
          )),
        )}
      </Grid>
    </div>
  )
}
