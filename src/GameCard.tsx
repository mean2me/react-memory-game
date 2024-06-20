import { Avatar } from '@chakra-ui/avatar'
import { Box, GridItem } from '@chakra-ui/layout'
import { ButtonImage } from './lib/types'

export interface GameGridItemProps {
  card: ButtonImage
  flipped?: boolean
}
export const GameCard = ({ card, flipped = false }: GameGridItemProps) => {
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
          ...(flipped
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
            bgColor: 'blue.400',
            backfaceVisibility: 'hidden',
          }}
        >
          logo
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
          {card === ButtonImage.NONE ? (
            'ciao'
          ) : (
            <Avatar size="2xl" src={card} />
          )}
        </Box>
      </Box>
    </Box>
  )
}
