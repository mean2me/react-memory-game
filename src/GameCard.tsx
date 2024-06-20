import { Avatar } from '@chakra-ui/avatar'
import { Box } from '@chakra-ui/layout'
import { AppActionTypes, ButtonImage } from './lib/types'
import { useCallback, useContext } from 'react'
import { GameCtx } from './StateMgr'
import { Image } from '@chakra-ui/image'

export interface GameGridItemProps {
  id: string
  card: ButtonImage
  flipped?: boolean
}
export const GameCard = ({ id, card, flipped = false }: GameGridItemProps) => {
  const { state, dispatch } = useContext(GameCtx)

  const isFlipped = useCallback(() => {
    return state.moves.indexOf(id) > -1
  }, [id, state.moves])

  const move = useCallback(() => {
    dispatch({ type: AppActionTypes.MOVE, payload: id })
  }, [dispatch, id])

  return (
    <Box
      sx={{
        w: '100px',
        h: '100px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer',
        perspective: '100px',
        bgColor: 'transparent',
      }}
      onClick={() => dispatch({ type: AppActionTypes.MOVE, payload: id })}
    >
      <Box
        sx={{
          position: 'relative',
          w: '100%',
          h: '100%',
          borderRadius: '10px',
          transition: 'transform 0.6s',
          transformStyle: 'preserve-3d',
          _hover: {
            boxShadow: '0px 0px 5px #ccc;',
          },
          ...(flipped || isFlipped()
            ? {
                transform: 'rotateY(180deg)',
                boxShadow: '5px 5px 5px #ccc;',
              }
            : { boxShadow: '-5px -5px -5px #ccc;' }),
        }}
      >
        <Box
          className="cardFront"
          sx={{
            display: 'flex',
            borderRadius: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            w: '100%',
            h: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            bgColor: 'gray.100',
            backfaceVisibility: 'hidden',
          }}
        >
          <Image
            objectFit="contain"
            alt="Logo Catis"
            src="/assets/logo_catis.png"
            width="50px"
          />
        </Box>
        <Box
          className="cardBack"
          sx={{
            w: '100%',
            h: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {card === ButtonImage.NONE ? '' : <Avatar size="2xl" src={card} />}
        </Box>
      </Box>
    </Box>
  )
}
