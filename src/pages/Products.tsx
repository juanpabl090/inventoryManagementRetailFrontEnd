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
import useAlert from "../hooks/alert/useAlert";

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
    message: "Los productos se han cargado correctamente",
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
  const { showAlert } = useAlert();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);

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
      showAlert({
        message: alertConfig.GET_ERROR.message,
        title: alertConfig.GET_ERROR.title,
        type: alertConfig.GET_ERROR.type,
      });
    } else if (GetProductSuccess) {
      if (!products || products.length === 0) {
        showAlert({
          message: alertConfig.GET_EMPTY.message,
          title: alertConfig.GET_EMPTY.title,
          type: alertConfig.GET_EMPTY.type,
        });
      } else {
        showAlert({
          message: alertConfig.GET_SUCCESS.message,
          title: alertConfig.GET_SUCCESS.title,
          type: alertConfig.GET_SUCCESS.type,
        });
      }
    }
    // Solo depende de la PRIMERA carga, no de filteredProducts ni mutaciones
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (PostProductSuccess) {
      showAlert({
        message: alertConfig.POST_SUCCESS.message,
        title: alertConfig.POST_SUCCESS.title,
        type: alertConfig.POST_SUCCESS.type,
      });
      resetPost();
      return;
    } else if (PostProductError) {
      showAlert({
        message: alertConfig.POST_ERROR.message,
        title: alertConfig.POST_ERROR.title,
        type: alertConfig.POST_ERROR.type,
      });
      resetPost();
    }
  }, [PostProductError, PostProductSuccess, resetPost, showAlert]);

  useEffect(() => {
    if (PatchProductError) {
      showAlert({
        message: alertConfig.PATCH_ERROR.message,
        title: alertConfig.PATCH_ERROR.title,
        type: alertConfig.PATCH_ERROR.type,
      });
      resetPatch();
    } else if (PatchProductSuccess) {
      showAlert({
        message: alertConfig.PATCH_SUCCESS.message,
        title: alertConfig.PATCH_SUCCESS.title,
        type: alertConfig.PATCH_SUCCESS.type,
      });
      resetPatch();
    }
  }, [PatchProductError, PatchProductSuccess, resetPatch, showAlert]);

  useEffect(() => {
    if (DeleteProductError) {
      showAlert({
        message: alertConfig.DELETE_ERROR.message,
        title: alertConfig.DELETE_ERROR.title,
        type: alertConfig.DELETE_ERROR.type,
      });
      resetDelete();
    } else if (DeleteProductSuccess) {
      showAlert({
        message: alertConfig.DELETE_SUCCESS.message,
        title: alertConfig.DELETE_SUCCESS.title,
        type: alertConfig.DELETE_SUCCESS.type,
      });
      resetDelete();
    }
  }, [DeleteProductError, DeleteProductSuccess, resetDelete, showAlert]);

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
