import Link from 'next/link';
import React from 'react'

const ClientsPage = () => {

    const CLIENTS = [
        { id: 'max', name: 'Maximillian' },
        { id: 'manu', name: 'Manuel' }
    ]

  return (
    <div>
        <h1>The Clients Page</h1>
        <ul>
            {CLIENTS.map((e) => <li key={e.id}><Link href={{ pathname: '/clients/[id]', query: { id: e.id } }}>{e.name}</Link></li>)}
        </ul>
    </div>
  )
}

export default ClientsPage;