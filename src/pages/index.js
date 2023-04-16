import { useRouter } from 'next/router';
import React from 'react'

const HomePage = () => {

    const router = useRouter();

  return (
    <div>
        <h1>Hello</h1>
        <button onClick={() => { router.push('/about') }}>Go to about</button>
        <button onClick={() => { router.push('/portfolio') }}>Go to portfolio</button>
    </div>
  )
}

export default HomePage;