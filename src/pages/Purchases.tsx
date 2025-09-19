import { Package, Truck, DollarSign, Calendar, Boxes } from "lucide-react";
import PageHeader from "../layouts/PageHeader";
import type { Purchase } from "../types/models/index";
import { usePostPurchase, usePurchases } from "../hooks/Purchase/index";
import { useEffect, useState } from "react";
import CreatePurchase from "../layouts/CreatePurchase";
import useAlert from "../hooks/alert/useAlert";

const alertConfig = {
  GET_EMPTY: {
    id: 1,
    title: "No hay compras",
    message: "La lista de compras está vacía",
    type: "Warning",
  },
  GET_SUCCESS: {
    id: 2,
    title: "Compras cargadas",
    message: "Las compras se han cargado correctamente",
    type: "Success",
  },
  GET_ERROR: {
    id: 3,
    title: "Error al cargar las compras",
    message: "Las compras no se han podido cargar, inténtalo de nuevo",
    type: "Error",
  },
  POST_SUCCESS: {
    id: 4,
    title: "Compra creada",
    message: "La compra se ha creado correctamente",
    type: "Success",
  },
  POST_ERROR: {
    id: 5,
    title: "Error al crear la compra",
    message: "La compra no se ha podido crear, inténtalo de nuevo",
    type: "Error",
  },
  PUT_SUCCESS: {
    id: 6,
    title: "Compra actualizada",
    message: "La compra se ha actualizado correctamente",
    type: "Info",
  },
  PUT_ERROR: {
    id: 7,
    title: "Error al actualizar la compra",
    message: "La compra no se ha podido actualizar, inténtalo de nuevo",
    type: "Error",
  },
  DELETE_SUCCESS: {
    id: 8,
    title: "Compra eliminada",
    message: "La compra se ha eliminado correctamente",
    type: "Warning",
  },
  DELETE_ERROR: {
    id: 9,
    title: "Error al eliminar la compra",
    message: "La compra no se ha podido eliminar, inténtalo de nuevo",
    type: "Error",
  },
} as const;

export default function Purchases() {
  const {
    data: purchases,
    error: GetError,
    isError: GetIsError,
    isLoading: GetIsLoading,
    isSuccess: GetIsSuccess,
  } = usePurchases();
  const {
    error: PostError,
    isError: PostIsError,
    isSuccess: PostIsSuccess,
    mutate: PostMutate,
    reset: PostReset,
  } = usePostPurchase();
  const { showAlert } = useAlert();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [filteredPurchases, setFilteredPurchases] = useState<Purchase[]>([]);

  useEffect(() => {
    if (purchases) {
      setFilteredPurchases(purchases);
    }
  }, [purchases]);

  useEffect(() => {
    if (GetIsError) {
      showAlert({
        message: alertConfig.GET_ERROR.message,
        title: alertConfig.GET_ERROR.title,
        type: alertConfig.GET_ERROR.type,
      });
      if (GetIsSuccess) {
        if (!purchases || purchases?.length === 0) {
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
    }
  }, [GetIsError, GetIsSuccess, showAlert, purchases]);

  useEffect(() => {
    if (PostIsError) {
      showAlert({
        message: alertConfig.POST_ERROR.message,
        title: alertConfig.POST_ERROR.title,
        type: alertConfig.POST_ERROR.type,
      });
    }
    if (PostIsSuccess) {
      showAlert({
        message: alertConfig.POST_SUCCESS.message,
        title: alertConfig.POST_SUCCESS.title,
        type: alertConfig.POST_SUCCESS.type,
      });
    }
    PostReset();
  }, [PostIsError, PostIsSuccess, showAlert, PostReset]);

  if (GetIsLoading) {
    return (
      <div className="flex justify-center items-center text-2xl text-neutral-900 font-semibold w-full h-full">
        <p className="text-center">Cargando</p>
      </div>
    );
  }

  if (GetError || PostError) {
    return (
      <div className="flex justify-center items-center text-2xl text-neutral-900 font-semibold w-full h-full">
        <p className="text-center">
          Hubo un error: {GetError?.message || PostError?.message}
        </p>
      </div>
    );
  }

  const handleIsOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const renderTable = () => {
    return (
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-4">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-neutral-900 uppercase bg-primary-100">
            <tr>
              <th scope="col" className="px-6 py-3">
                <span>
                  <Package className="w-4 h-4 inline-block mr-2" />
                </span>
                Nombre del producto
              </th>
              <th scope="col" className="px-6 py-3">
                <span>
                  <Truck className="w-4 h-4 inline-block mr-2" />
                </span>
                Proveedor
              </th>
              <th scope="col" className="px-6 py-3">
                <span>
                  <Boxes className="w-4 h-4 inline-block mr-2" />
                </span>
                Cantidad
              </th>
              <th scope="col" className="px-6 py-3">
                <span>
                  <DollarSign className="w-4 h-4 inline-block mr-2" />
                </span>
                Monto
              </th>
              <th scope="col" className="px-6 py-3">
                <span>
                  <Calendar className="w-4 h-4 inline-block mr-2" />
                </span>
                Fecha
              </th>
            </tr>
          </thead>
          {filteredPurchases.map((element) => (
            <tbody key={element.id}>
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {element.product.name}
                </th>
                <td className="px-6 py-4">{element.supplier.name}</td>
                <td className="px-6 py-4">{element.quantity}</td>
                <td className="px-6 py-4">{element.amount}</td>
                <td className="px-6 py-4">{element.date}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    );
  };

  return (
    <div>
      <PageHeader<Purchase>
        data={purchases ?? []}
        handleIsOpen={handleIsOpen}
        onResults={setFilteredPurchases}
        title="Gestion de compras."
        description="Administra las compras de productos."
        extractName={(e) => e.product.name}
        buttonLabel="Nueva Compra"
      />
      <CreatePurchase
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={PostMutate}
      />
      {renderTable()}
    </div>
  );
}
