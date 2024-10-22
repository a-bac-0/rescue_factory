import { useState } from 'react'
import './App.css'
import Adoptions from './pages/Adoptions.jsx'

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <Adoptions />
        </>
    )
}

export default App
