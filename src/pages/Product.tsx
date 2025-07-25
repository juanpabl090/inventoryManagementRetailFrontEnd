import { useState } from "react";
import ProductCard from "../components/ProductCard";
import SearchBox from "../components/SearchBox";
import CreateEditProduct from "../layouts/CreateEditProduct";
import { Button } from "../components/Button";

import mocks from "../mocks/productMock.json";
import { type Product } from "../types/types";
import { Plus } from "lucide-react";

export default function Product() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mocks);
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleIsOpen = () => {
    setIsOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center w-full pb-4">
        <div className="flex flex-col gap-0">
          <h1 className="text-neutral-950 text-2xl font-bold">
            Gestión de Productos
          </h1>
          <p>Administra el catálogo de productos de tu empresa</p>
        </div>
        <div>
          <Button variant="solid" className="flex mr-5" onClick={handleIsOpen}>
            <Plus className="mr-3" />
            Nuevo Producto
          </Button>
        </div>
      </div>
      <div>
        <SearchBox<Product>
          data={mocks}
          onResults={setFilteredProducts}
          extractName={(item) => item.name}
        />
      </div>
      <div className="flex-wrap pt-4 xs:flex-row md:lg:flex md:lg:flex-col justify-start">
        <CreateEditProduct isOpen={isOpen} onClose={handleClose} />
        {filteredProducts.length === 0 ? (
          <h1 className="mt-4 text-gray-600">No Hay Productos</h1>
        ) : (
          filteredProducts.map((card) => (
            <ProductCard
              key={card.id}
              name={card.name}
              description={card.description}
              categoryId={card.categoryId}
              stock={card.stock}
              salePrice={card.salePrice}
              buyPrice={card.buyPrice}
              productTypeId={card.productTypeId}
              supplierId={card.supplierId}
              updatedDate={card.updatedDate}
              createdDate={card.createdDate}
            />
          ))
        )}
      </div>
    </div>
  );
}
