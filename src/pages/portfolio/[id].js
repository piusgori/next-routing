import { useRouter } from 'next/router';
import React from 'react';

const EachProductItem = () => {

    const { query } = useRouter();
    console.log(query.id); 

  return (
    <div>EachProductItem</div>
  )
}

export default EachProductItem;