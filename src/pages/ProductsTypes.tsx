import { useEffect, useState } from "react";
import useAlert from "../hooks/alert/useAlert";
import {
  useDeleteProductTypes,
  usePostProductTypes,
  useProductsTypes,
  usePutProductTypes,
} from "../hooks/productType";
import PageHeader from "../layouts/PageHeader";
import type { ProductType, ProductTypeRequest } from "../types/models";
import CreateEditProductType from "../layouts/CreateEditProductType";
import ProductTypeCard from "../components/ProductTypeCard";

const alertConfig = {
  GET_EMPTY: {
    id: 1,
    title: "No hay tipos de productos",
    message: "La lista de tipos de Producto está vacia",
    type: "Warning",
  },
  GET_SUCCESS: {
    id: 2,
    title: "tipos de Producto cargados",
    message: "Los tipos de Producto se han cargado correctamente",
    type: "Success",
  },
  GET_ERROR: {
    id: 3,
    title: "Error al cargar los tipos de Producto",
    message:
      "Los tipos de Producto no se han podido cargar, intentalo de nuevo",
    type: "Error",
  },
  POST_SUCCESS: {
    id: 4,
    title: "tipo de Producto creado",
    message: "La categorias se ha creado correctamente",
    type: "Success",
  },
  POST_ERROR: {
    id: 5,
    title: "Error al crear el tipos de Producto",
    message: "el tipo de Producto no se ha podido crear, intentalo de nuevo",
    type: "Error",
  },
  PUT_SUCCESS: {
    id: 6,
    title: "tipo de Producto actualizado",
    message: "el tipo de Producto se ha actualizado correctamente",
    type: "Info",
  },
  PUT_ERROR: {
    id: 7,
    title: "Error al actualizar el tipo de Producto",
    message:
      "el tipo de Producto no se ha podido actualizar, intentalo de nuevo",
    type: "Error",
  },
  DELETE_SUCCESS: {
    id: 8,
    title: "tipo de Producto eliminado",
    message: "el tipo de Producto se ha eliminado correctamente",
    type: "Warning",
  },
  DELETE_ERROR: {
    id: 9,
    title: "Error al eliminar el tipo de Producto",
    message: "el tipo de Producto no se ha podido eliminar, intentalo de nuevo",
    type: "Error",
  },
} as const;

export default function ProductsTypes() {
  const {
    data: ProductsTypes,
    error: GetError,
    isError: GetIsError,
    isLoading: GetIsLoading,
    isSuccess: GetIsSuccess,
  } = useProductsTypes();
  const {
    error: DeleteError,
    isError: DeleteIsError,
    isSuccess: DeleteIsSuccess,
    mutate: DeleteProductTypes,
    reset: DeleteReset,
  } = useDeleteProductTypes();
  const {
    error: PostError,
    isError: PostIsError,
    isSuccess: PostIsSuccess,
    mutate: PostProductTypes,
    reset: PostReset,
  } = usePostProductTypes();
  const {
    error: PutError,
    isError: PutIsError,
    isSuccess: PutIsSuccess,
    mutate: PutProductTypes,
    reset: PutReset,
  } = usePutProductTypes();
  const { showAlert } = useAlert();
  const [filteredProductsTypes, setFilteredProductsTypes] = useState<
    ProductType[]
  >([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (ProductsTypes) {
      setFilteredProductsTypes(ProductsTypes);
    }
  }, [ProductsTypes]);

  useEffect(() => {
    if (GetIsError) {
      showAlert({
        title: alertConfig.GET_ERROR.title,
        message: alertConfig.GET_ERROR.message,
        type: alertConfig.GET_ERROR.type,
      });
    } else if (GetIsSuccess) {
      if (!ProductsTypes || ProductsTypes.length === 0) {
        showAlert({
          title: alertConfig.GET_EMPTY.title,
          message: alertConfig.GET_EMPTY.message,
          type: alertConfig.GET_EMPTY.type,
        });
      } else {
        showAlert({
          title: alertConfig.GET_SUCCESS.title,
          message: alertConfig.GET_SUCCESS.message,
          type: alertConfig.GET_SUCCESS.type,
        });
      }
    }
    // Solo depende de la PRIMERA carga, no de filteredProducts ni mutaciones
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (PostIsError) {
      showAlert({
        title: alertConfig.POST_ERROR.title,
        message: alertConfig.POST_ERROR.message,
        type: alertConfig.POST_ERROR.type,
      });
    }
    if (PostIsSuccess) {
      showAlert({
        title: alertConfig.POST_SUCCESS.title,
        message: alertConfig.POST_SUCCESS.message,
        type: alertConfig.POST_SUCCESS.type,
      });
    }
    PostReset();
  }, [PostIsError, PostIsSuccess, showAlert, ProductsTypes, PostReset]);

  useEffect(() => {
    if (PutIsError) {
      showAlert({
        title: alertConfig.PUT_ERROR.title,
        message: alertConfig.PUT_ERROR.message,
        type: alertConfig.PUT_ERROR.type,
      });
    }
    if (PutIsSuccess) {
      showAlert({
        title: alertConfig.PUT_SUCCESS.title,
        message: alertConfig.PUT_SUCCESS.message,
        type: alertConfig.PUT_SUCCESS.type,
      });
    }
    PutReset();
  }, [PutIsError, PutIsSuccess, showAlert, ProductsTypes, PutReset]);

  useEffect(() => {
    if (DeleteIsError) {
      showAlert({
        title: alertConfig.DELETE_ERROR.title,
        message: alertConfig.DELETE_ERROR.message,
        type: alertConfig.DELETE_ERROR.type,
      });
    }
    if (DeleteIsSuccess) {
      showAlert({
        title: alertConfig.DELETE_SUCCESS.title,
        message: alertConfig.DELETE_SUCCESS.message,
        type: alertConfig.DELETE_SUCCESS.type,
      });
    }
    DeleteReset();
  }, [DeleteIsError, DeleteIsSuccess, showAlert, ProductsTypes, DeleteReset]);

  const handleEditCategory = (
    productType: ProductTypeRequest,
    onSuccess: () => void
  ) => {
    PutProductTypes(productType, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const renderProductTypes = () => {
    return filteredProductsTypes.length === 0 ? (
      <h1 className="mt-4 text-gray-600">No hay tipos de productos</h1>
    ) : (
      filteredProductsTypes.map((productType) => (
        <ProductTypeCard
          key={productType.id}
          productTypeData={productType}
          onClick={() => {
            if (productType.id !== undefined)
              DeleteProductTypes(productType.id);
          }}
          onSubmit={handleEditCategory}
        />
      ))
    );
  };

  if (GetIsLoading) {
    return (
      <div className="flex justify-center items-center text-2xl text-neutral-900 font-semibold w-full h-full">
        <p className="text-center">Cargando</p>
      </div>
    );
  }

  if (DeleteError || PutError || GetError || PostError) {
    return (
      <div className="flex justify-center items-center text-2xl text-neutral-900 font-semibold w-full h-full">
        <p className="text-center">
          Hubo un error:{" "}
          {GetError?.message ||
            PostError?.message ||
            PutError?.message ||
            DeleteError?.message}
        </p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader<ProductType>
        title="Gestion de tipos de productos."
        description="Administra los tipos de productos, de tus productos."
        data={ProductsTypes ?? []}
        extractName={(item) => item.name}
        handleIsOpen={handleOpen}
        onResults={setFilteredProductsTypes}
        buttonLabel="Nuevo Tipo de producto"
      />
      <CreateEditProductType
        title="Crear tipo de producto"
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={PostProductTypes}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {renderProductTypes()}
      </div>
    </div>
  );
}
