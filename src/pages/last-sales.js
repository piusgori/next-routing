import React, { useEffect, useState } from 'react';
import useSWR from 'swr';

const LastSalesPage = (props) => {
    const [sales, setSales] = useState(props.sales);
    // const [isLoading, setIsLoading] = useState(false); 

    const { data, error } = useSWR('https://piuskimsey-default-rtdb.europe-west1.firebasedatabase.app/sales.json');

    useEffect(() => {
        if (data) {
            const transformedSales = [];
            for (const key in data) {
                transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume })
            }
            setSales(transformedSales);
        }
    }, [data])

    // useEffect(() => {
    //     setIsLoading(true);
    //     fetch('https://piuskimsey-default-rtdb.europe-west1.firebasedatabase.app/sales.json').then(response => response.json()).then(data => {
    //         const transformedSales = [];
    //         for (const key in data) {
    //             transformedSales.push({ id: key, username: data[key].username, volume: data[keys].volume })
    //         }
    //         setSales(transformedSales);    
    //         setIsLoading(false);
    //     }).catch(err => {
    //         console.log(err);
    //     });
    // }, []);

    if (error) return <p>Failed to load</p>

    if (!data && !sales) return <p>Loading...</p>


  return (
    <ul>
        {!sales && <p>No sales.</p>}
        {sales && sales.map(sale => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
    </ul>
  )
};

export const getStaticProps = async (context) => {
    return fetch('https://piuskimsey-default-rtdb.europe-west1.firebasedatabase.app/sales.json').then(response => response.json()).then(data => {
        const transformedSales = [];
        for (const key in data) {
            transformedSales.push({ id: key, username: data[key].username, volume: data[key].volume })
        };
        return {
            props: { sales: transformedSales, revalidate: 10 }
        }
    });
}

export default LastSalesPage;