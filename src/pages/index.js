import fs from 'fs/promises';
import Link from 'next/link';
import path from 'path';

function HomePage({ products }) {

    return (
      <ul>
        {products.map(prod => <li key={prod.id}><Link href={`/products/${prod.id}`}>{prod.title}</Link></li>)}
      </ul>
    );
  }

  export async function getStaticProps () {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return { props: { products: data.products }, revalidate: 100 }
  }
  
  export default HomePage;