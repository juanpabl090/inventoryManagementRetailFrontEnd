import { useEffect, useState } from "react";
import { ProductCard } from "../components/index";
import CreateEditProduct from "../layouts/CreateEditProduct";
import type { Product } from "../types/models/index";
import PageHeader from "../layouts/PageHeader";
import {
  useDeleteProducts,
  usePatchProductsByName,
  usePostProducts,
  useProducts,
} from "../hooks/products/index";
import type { ProductRequest } from "../types/models/index";

export default function Products() {
  const {
    data: products,
    error: productError,
    isLoading: productLoading,
  } = useProducts();
  const {
    error: postProductError,
    isSuccess: postProductSucces,
    mutate: postProduct,
  } = usePostProducts();
  const { error: deleteProductError, mutate: deleteProduct } =
    useDeleteProducts();
  const { error: patchProductError, mutate: patchProduct } =
    usePatchProductsByName();
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

  const handlePatch = (product: ProductRequest, onSuccess: () => void) => {
    patchProduct(product, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  if (
    productError ||
    postProductError ||
    deleteProductError ||
    patchProductError
  ) {
    return (
      <div className="flex justify-center items-center text-2xl text-neutral-900 font-semibold w-full h-full">
        <p className="text-center">
          Hubo Un error:
          {productError?.message ||
            postProductError?.message ||
            deleteProductError?.message ||
            patchProductError?.message}
        </p>
      </div>
    );
  }

  if (productLoading) {
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
      filteredProducts.map((card) => {
        return (
          <ProductCard
            key={card.id}
            id={card.id}
            name={card.name}
            description={card.description}
            category={card.category}
            stock={card.stock}
            salePrice={card.salePrice}
            buyPrice={card.buyPrice}
            productType={card.productType}
            supplier={card.supplier}
            updatedDate={card.updatedDate}
            createdDate={card.createdDate}
            onClick={() => {
              if (card.id !== undefined) deleteProduct(card.id);
            }}
            onSubmit={handlePatch}
          />
        );
      })
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
