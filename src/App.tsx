import './App.css'

import { GameGrid } from './GameGrid'
import { ChakraProvider } from '@chakra-ui/react'
import { GameCtx, StateMgr } from './StateMgr'
import { useContext } from 'react'

function App() {
  const { state } = useContext(GameCtx)
  return (
    <ChakraProvider>
      <StateMgr>
        <GameGrid rows={state.gridRows} columns={state.gridColumns} />
      </StateMgr>
    </ChakraProvider>
  )
}

export default App
