import ProductCard from "./components/ProductCard";
import LeftMenu from "./layouts/LeftMenu";
import Nav from "./layouts/Nav";

import "./styles/styles.css";

import mocks from "./mocks/productMock.json";

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full">
        <Nav />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="max-w-7xl flex-shrink-0">
          <LeftMenu />
        </div>
        <main className="flex flex-col overflow-auto bg-neutral-100 w-screen pl-5 pt-5">
          <div>
            <h1 className="text-neutral-950 text-2xl font-bold">Dashboard</h1>
          </div>
          <div>
            <p>Administra el catálogo de productos de tu empresa</p>
          </div>
          <div className="flex-wrap xs:flex-row md:lg:flex md:lg:flex-col justify-start">
            {mocks.map((card) => {
              return (
                <ProductCard
                  key={card.id}
                  name={card.name}
                  description={card.description}
                  stock={card.stock}
                  salePrice={card.salePrice}
                  buyPrice={card.buyPrice}
                  productTypeId={card.productTypeId}
                  supplierId={card.supplierId}
                  updatedDate={card.updatedDate}
                  createdDate={card.createdDate}
                />
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}
