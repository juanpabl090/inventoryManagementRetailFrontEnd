import { useEffect, useState } from "react";
import { ProductCard } from "../components/index";
import CreateEditProduct from "../layouts/CreateEditProduct";
import { type Product } from "../types/types";
import useProducts from "../hooks/products/useProducts";
import PageHeader from "../layouts/PageHeader";
import usePostProducts from "../hooks/products/usePostProducts";
import useDeleteProducts from "../hooks/products/useDeleteProducts";

export default function Products() {
  const {
    data: products,
    error: productsError,
    isLoading: productsLoading,
  } = useProducts();
  const {
    error: postProductError,
    isSuccess: postProductSucces,
    mutate: postProduct,
  } = usePostProducts();
  const { error: deleteProductsError, mutate: deleteProduct } =
    useDeleteProducts();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (postProductSucces) {
      setIsOpen(false);
    }
  }, [postProductSucces]);

  if (productsError || postProductError || deleteProductsError) {
    return (
      <div className="flex justify-center items-center text-2xl text-neutral-900 font-semibold w-full h-full">
        <p className="text-center">
          Hubo Un error:
          {productsError?.message ||
            postProductError?.message ||
            deleteProductsError?.message}
        </p>
      </div>
    );
  }

  if (productsLoading) {
    return (
      <div className="flex justify-center items-center text-2xl text-neutral-900 font-semibold w-full h-full">
        <p className="text-center">Cargando</p>
      </div>
    );
  }

  const handleClose = () => setIsOpen(false);

  const handleIsOpen = () => setIsOpen(true);

  const showProducts = (filteredProducts: Product[]) => {
    return filteredProducts.length === 0 ? (
      <h1 className="mt-4 text-gray-600">No Hay Productos</h1>
    ) : (
      filteredProducts.map((card) => (
        <ProductCard
          key={card.id}
          id={card.id}
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
          onClick={() => {
            if (card.id !== undefined) deleteProduct(card.id);
          }}
        />
      ))
    );
  };

  return (
    <div>
      <PageHeader<Product>
        title="Gestión de Productos"
        description="Administra el catálogo de productos de tu empresa"
        data={products ?? []}
        onResults={setFilteredProducts}
        extractName={(item) => item.name}
        handleIsOpen={handleIsOpen}
        buttonLabel="Nuevo Producto"
      />
      <div className="flex-wrap pt-4 xs:flex-row md:lg:flex md:lg:flex-col justify-start">
        <CreateEditProduct
          isOpen={isOpen}
          onClose={handleClose}
          title="Create Product"
          onSubmit={postProduct}
        />
        {showProducts(filteredProducts)}
      </div>
    </div>
  );
}
