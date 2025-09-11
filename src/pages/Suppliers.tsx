import PageHeader from "../layouts/PageHeader";
import type { Supplier, SupplierRequest } from "../types/models";
import SupplierCard from "../components/SupplierCard";
import { useEffect, useState } from "react";
import {
  useSupplier,
  useDeleteSupplier,
  usePostSupplier,
  usePutSupplier,
} from "../hooks/Supplier/index";
import useAlert from "../hooks/alert/useAlert";
import CreateEditSupplier from "../layouts/CreateEditSupplier";

const alertConfig = {
  GET_EMPTY: {
    id: 1,
    title: "No hay proveedores",
    message: "La lista de proveedores está vacía",
    type: "Warning",
  },
  GET_SUCCESS: {
    id: 2,
    title: "Proveedores cargados",
    message: "Los proveedores se han cargado correctamente",
    type: "Success",
  },
  GET_ERROR: {
    id: 3,
    title: "Error al cargar los proveedores",
    message: "Los proveedores no se han podido cargar, inténtalo de nuevo",
    type: "Error",
  },
  POST_SUCCESS: {
    id: 4,
    title: "Proveedor creado",
    message: "El proveedor se ha creado correctamente",
    type: "Success",
  },
  POST_ERROR: {
    id: 5,
    title: "Error al crear el proveedor",
    message: "El proveedor no se ha podido crear, inténtalo de nuevo",
    type: "Error",
  },
  PUT_SUCCESS: {
    id: 6,
    title: "Proveedor actualizado",
    message: "El proveedor se ha actualizado correctamente",
    type: "Info",
  },
  PUT_ERROR: {
    id: 7,
    title: "Error al actualizar el proveedor",
    message: "El proveedor no se ha podido actualizar, inténtalo de nuevo",
    type: "Error",
  },
  DELETE_SUCCESS: {
    id: 8,
    title: "Proveedor eliminado",
    message: "El proveedor se ha eliminado correctamente",
    type: "Warning",
  },
  DELETE_ERROR: {
    id: 9,
    title: "Error al eliminar el proveedor",
    message: "El proveedor no se ha podido eliminar, inténtalo de nuevo",
    type: "Error",
  },
} as const;

export default function Suppliers() {
  const {
    data: Suppliers,
    error: GetError,
    isError: GetIsError,
    isLoading: GetIsLoading,
    isSuccess: GetIsSuccess,
  } = useSupplier();
  const {
    error: DeleteError,
    isError: DeleteIsError,
    isSuccess: DeleteIsSuccess,
    mutate: DeleteMutate,
    reset: DeleteReset,
  } = useDeleteSupplier();
  const {
    error: PostError,
    isError: PostIsError,
    isSuccess: PostIsSuccess,
    mutate: PostMutate,
    reset: PostReset,
  } = usePostSupplier();
  const {
    error: PutError,
    isError: PutIsError,
    isSuccess: PutIsSuccess,
    mutate: PutMutate,
    reset: PutReset,
  } = usePutSupplier();
  const { showAlert } = useAlert();
  const [filteredSuppliers, setFilteredSuppliers] = useState<Supplier[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSupplier = (
    supplerRequest: SupplierRequest,
    onSuccess: () => void
  ) => {
    PutMutate(supplerRequest, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  useEffect(() => {
    if (Suppliers) {
      setFilteredSuppliers(Suppliers);
    }
  }, [Suppliers]);

  useEffect(() => {
    if (GetIsError) {
      showAlert({
        title: alertConfig.GET_ERROR.title,
        message: alertConfig.GET_ERROR.message,
        type: alertConfig.GET_ERROR.type,
      });
    } else if (GetIsSuccess) {
      if (!Suppliers || filteredSuppliers.length === 0) {
        showAlert({
          title: alertConfig.GET_SUCCESS.title,
          message: alertConfig.GET_SUCCESS.message,
          type: alertConfig.GET_SUCCESS.type,
        });
      } else {
        showAlert({
          title: alertConfig.GET_EMPTY.title,
          message: alertConfig.GET_EMPTY.message,
          type: alertConfig.GET_EMPTY.type,
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
  }, [PostIsError, PostIsSuccess, showAlert, PostReset]);

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
  }, [PutIsError, PutIsSuccess, showAlert, PutReset]);

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
  }, [DeleteIsError, DeleteIsSuccess, showAlert, DeleteReset]);

  if (GetIsLoading) {
    <div className="flex justify-center items-center text-2xl text-neutral-900 font-semibold w-full h-full">
      <p className="text-center">Cargando</p>
    </div>;
  }

  if (GetError || PostError || PutError || DeleteError) {
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

  const renderSuppliers = () => {
    return filteredSuppliers.length === 0 ? (
      <h1 className="mt-4 text-gray-600">No hay Proveedores</h1>
    ) : (
      filteredSuppliers.map((supplier) => (
        <SupplierCard
          key={supplier.id}
          data={supplier}
          onClick={() => {
            if (supplier.id !== undefined) DeleteMutate(supplier);
          }}
          onSubmit={handleSupplier}
        />
      ))
    );
  };

  return (
    <div>
      <PageHeader<Supplier>
        data={filteredSuppliers}
        extractName={(item) => item.name}
        handleIsOpen={handleOpen}
        onResults={setFilteredSuppliers}
        title="Gestión de Proveedores"
        description="Administra la información de tus proveedores"
        buttonLabel="Nuevo proveedor"
      />
      <CreateEditSupplier
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={PostMutate}
        title="Crear Proveedor"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {renderSuppliers()}
      </div>
    </div>
  );
}
