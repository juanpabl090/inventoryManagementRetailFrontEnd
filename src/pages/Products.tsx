import { useEffect, useState } from "react";
import { ProductCard, SearchBox, Button } from "../components/index";
import CreateEditProduct from "../layouts/CreateEditProduct";
import { type Product } from "../types/types";
import { Plus } from "lucide-react";
import useFetch from "../hooks/useFetch";

export default function Products() {
  const token =
    "eyJhbGciOiJIUzUxMiJ9.eyJyb2xlcyI6W10sInN1YiI6IkxvcmVuem8gV2luZGxlciIsImlhdCI6MTc1MzgyMjM2MiwiZXhwIjoxNzUzOTA4NzYyfQ.wi1v_OKLGRo01qE_sYgjoxDSN9p2qd4BqLfJUkrUtdmWbQbufsUweKYsjvxaz-OreHso66OhUfVA-zKxohEefg";
  const { data, error, isLoading } = useFetch<Product>({
    JWT: token,
    method: "get",
    model: "product",
    path: "/products/get",
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (data) {
      setFilteredProducts(data);
    }
  }, [data]);

  const handleClose = () => setIsOpen(false);

  const handleIsOpen = () => setIsOpen(true);

  const showProducts = (filteredProducts: Product[]) => {
    return filteredProducts.length === 0 ? (
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
    );
  };
  if (isLoading)
    return (
      <div className="flex justify-center items-center text-2xl text-neutral-900 font-semibold w-full h-full">
        <p className="text-center">Cargando</p>
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center text-2xl text-neutral-900 font-semibold w-full h-full">
        <p className="text-center">{error.message}</p>
      </div>
    );

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
          data={data ?? []}
          onResults={setFilteredProducts}
          extractName={(item) => item.name}
        />
      </div>
      <div className="flex-wrap pt-4 xs:flex-row md:lg:flex md:lg:flex-col justify-start">
        <CreateEditProduct
          isOpen={isOpen}
          onClose={handleClose}
          title="Create Product"
        />
        {showProducts(filteredProducts)}
      </div>
    </div>
  );
}
