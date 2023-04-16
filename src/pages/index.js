import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react'

const HomePage = () => {

  return (
    <div>
        <h1>Hello</h1>
        <ul>
            <li><Link href='/portfolio'>Portfolio</Link></li>
            <li><Link href='/clients'>Clients</Link></li>
        </ul>
    </div>
  )
}

export default HomePage;