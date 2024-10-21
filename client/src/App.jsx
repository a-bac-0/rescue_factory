import { useState } from 'react'
import './App.css'
import Carousel from './components/Carousel.jsx'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Carousel />
        </>
    )
}

export default App
