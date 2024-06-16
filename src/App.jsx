import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [product, setProduct] = useState([]);
  const [paginatin, setPagination] = useState(1);

  useEffect(() => {
    async function getData() {
      const data = await fetch("https://dummyjson.com/products?limit=100");
      const result = await data.json();
      setProduct(result.products);
    }
    getData();
  }, [paginatin]);

  // console.log(product);

  const handlePagination = (page) => {
    console.log(page);
    if (
      page >= 1 &&
      page <= product.length / 10 &&
      page !== paginatin
    ) {
      setPagination(page);
    }
  };

  return (
    <div>
      <div className="product">
        {product.slice(paginatin * 10 - 10, paginatin * 10).map((prod) => (
          <div key={prod.id}>
            <img className="product_single" src={prod.thumbnail} />
            <div>{prod.title}</div>
          </div>
        ))}
      </div>
      <div>
        {product.length >= 0 && (
          <div className="pageStyle">
            <span onClick={() => handlePagination(paginatin - 1)}>⬅️</span>
            {[...Array(product.length / 10)].map((_, i) => (
              <span onClick={() => handlePagination(i + 1)} key={i}>
                {i + 1}
              </span>
            ))}
            <span onClick={() => handlePagination(paginatin + 1)}>➡️</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;
