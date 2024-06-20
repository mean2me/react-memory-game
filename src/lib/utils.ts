import { flatten, shuffle } from 'lodash'

export const buildMatrix = (rows: number, columns: number) =>
  Array(rows)
    .fill(null)
    .map((_, i) =>
      Array(columns)
        .fill(null)
        .map((_, j) => [i, j].join(','))
        .flatMap((c) => c),
    )

export const allocateSlots = (matrix: Array<string[]>) =>
  shuffle(flatten(matrix)).slice(0, 3)

export const checkOutcome = (moves: Array<string>, slots: Array<string>) => {
  debugger
  console.log(moves, slots)
}
