import fs from 'fs/promises';
import path from 'path';

function HomePage({ products }) {

    return (
      <ul>
        {products.map(prod => <li key={prod.id}>{prod.title}</li>)}
      </ul>
    );
  }

  export async function getStaticProps () {
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);
    return { props: { products: data.products } }
  }
  
  export default HomePage;