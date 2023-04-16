import { useRouter } from 'next/router'
import React from 'react'

const ClientProject = () => {
    const { query } = useRouter();

    console.log(query);

  return (
    <div>ClientProject</div>
  )
}

export default ClientProject