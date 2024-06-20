import './App.css'
import { Button } from './Button'
import { ButtonImage } from './lib/types'
import { GameGrid } from './GameGrid'
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <div>
          <GameGrid rows={3} columns={3} />
        </div>
      </div>
    </ChakraProvider>
  )
}

export default App
