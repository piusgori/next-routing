import { useRouter } from 'next/router'
import React from 'react'

const ClientProjectsPage = () => {

    const { query, push } = useRouter();

    console.log(query);

    function loadProjectHandler () {
        push({ pathname: '/clients/[id]/[clientProjectId]', query: { id: query.id, clientProjectId: 'maxproject' } });
    }

  return (
    <div>
        <h1>The Projects for given client</h1>
        <button onClick={loadProjectHandler}>Load Button A</button>
    </div>
  )
}

export default ClientProjectsPage;