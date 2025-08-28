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
import Alert from "../components/Alert";

type AlertType =
  | null
  | "GET_EMPTY"
  | "GET_SUCCESS"
  | "GET_ERROR"
  | "POST_SUCCESS"
  | "POST_ERROR"
  | "PATCH_SUCCESS"
  | "PATCH_ERROR"
  | "DELETE_SUCCESS"
  | "DELETE_ERROR";

const alertConfig = {
  GET_EMPTY: {
    id: 1,
    title: "No hay productos",
    message: "La lista de productos está vacia",
    type: "Warning",
  },
  GET_SUCCESS: {
    id: 2,
    title: "Productos cargados",
    message: "Los Productos se han cargado correctamente",
    type: "Success",
  },
  GET_ERROR: {
    id: 3,
    title: "Error al cargar los productos",
    message: "Los productos no se han podido cargar, intentalo de nuevo",
    type: "Error",
  },
  POST_SUCCESS: {
    id: 4,
    title: "Producto creado",
    message: "EL producto se ha creado correctamente",
    type: "Success",
  },
  POST_ERROR: {
    id: 5,
    title: "Error al crear el producto",
    message: "EL producto no se ha podido crear, intentalo de nuevo",
    type: "Error",
  },
  PATCH_SUCCESS: {
    id: 6,
    title: "Producto actualizado",
    message: "El producto se ha actualizado correctamente",
    type: "Success",
  },
  PATCH_ERROR: {
    id: 7,
    title: "Error al actualizar el producto",
    message: "El producto no se ha podido actualizar, intentalo de nuevo",
    type: "Error",
  },
  DELETE_SUCCESS: {
    id: 8,
    title: "Producto eliminado",
    message: "El producto se ha eliminado correctamente",
    type: "Warning",
  },
  DELETE_ERROR: {
    id: 9,
    title: "Error al eliminar el producto",
    message: "El producto no se ha podido eliminar, intentalo de nuevo",
    type: "Error",
  },
} as const;

export default function Products() {
  const {
    data: products,
    error: productError,
    isLoading: productLoading,
    isSuccess: GetProductSuccess,
    isError: GetProductError,
  } = useProducts();
  const {
    error: postProductError,
    isSuccess: PostProductSuccess,
    isError: PostProductError,
    mutate: postProduct,
    reset: resetPost,
  } = usePostProducts();
  const {
    error: deleteProductError,
    mutate: deleteProduct,
    isSuccess: DeleteProductSuccess,
    isError: DeleteProductError,
    reset: resetDelete,
  } = useDeleteProducts();
  const {
    error: patchProductError,
    mutate: patchProduct,
    isSuccess: PatchProductSuccess,
    isError: PatchProductError,
    reset: resetPatch,
  } = usePatchProductsByName();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [alertType, setAlertType] = useState<AlertType>(null);
  const [alertOpen, setAlertOpen] = useState<boolean>(false);

  useEffect(() => {
    if (products) {
      setFilteredProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (PostProductSuccess) {
      setIsOpen(false);
    }
  }, [PostProductSuccess]);

  useEffect(() => {
    if (GetProductError) {
      console.log(GetProductError);
      setAlertType("GET_ERROR");
      setAlertOpen(true);
    } else if (GetProductSuccess) {
      if (!products || products.length === 0) {
        setAlertType("GET_EMPTY");
        setAlertOpen(true);
      } else {
        setAlertType("GET_SUCCESS");
        setAlertOpen(true);
      }
    }
    // Solo depende de la PRIMERA carga, no de filteredProducts ni mutaciones
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (PostProductSuccess) {
      setAlertType("POST_SUCCESS");
      setAlertOpen(true);
      resetPost();
      return;
    } else if (PostProductError) {
      setAlertType("POST_ERROR");
      setAlertOpen(true);
      resetPost();
      return;
    }
  }, [PostProductError, PostProductSuccess, resetPost]);

  useEffect(() => {
    if (PatchProductError) {
      setAlertType("PATCH_ERROR");
      setAlertOpen(true);
      resetPatch();
      return;
    } else if (PatchProductSuccess) {
      setAlertType("PATCH_SUCCESS");
      setAlertOpen(true);
      resetPatch();
      return;
    }
  }, [PatchProductError, PatchProductSuccess, resetPatch]);

  useEffect(() => {
    if (DeleteProductError) {
      setAlertType("DELETE_ERROR");
      setAlertOpen(true);
      resetDelete();
      return;
    } else if (DeleteProductSuccess) {
      setAlertType("DELETE_SUCCESS");
      setAlertOpen(true);
      resetDelete();
      return;
    }
  }, [DeleteProductError, DeleteProductSuccess, resetDelete]);

  const handleAlertClose = () => {
    setAlertType(null);
    setAlertOpen(false);
  };

  const renderAlert = () => {
    if (!alertOpen || !alertType) return null;
    const { id, title, message, type } = alertConfig[alertType];
    return (
      <Alert
        key={id}
        title={title}
        message={message}
        type={type}
        onClose={handleAlertClose}
        isOpen={alertOpen}
      />
    );
  };

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
      {renderAlert()}
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
