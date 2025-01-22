import { useState } from 'react'
import './HomePage.module.css'

function HomePage() {
  const [count, setCount] = useState<number>(0)

  return (
    <>
      <h1>hello world</h1>
    </>
  )
}

export default HomePage;
