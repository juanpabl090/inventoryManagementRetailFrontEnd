import { useEffect, useState } from "react";
import CategoryCard from "../components/CategoryCard";
import useCategories from "../hooks/categories/useCategories";
import PageHeader from "../layouts/PageHeader";
import type { Category, CategoryRequest } from "../types/models/index";
import CreateEditCategory from "../layouts/CreateEditCategory";
import usePostCategories from "../hooks/categories/usePostCategories";
import usePutCategories from "../hooks/categories/usePatchCategories";
import useDeleteCategories from "../hooks/categories/useDeleteCategories";
import useAlert from "../hooks/alert/useAlert";

const alertConfig = {
  GET_EMPTY: {
    id: 1,
    title: "No hay categorias",
    message: "La lista de categorias está vacia",
    type: "Warning",
  },
  GET_SUCCESS: {
    id: 2,
    title: "Categorias cargadas",
    message: "Las categorias se han cargado correctamente",
    type: "Success",
  },
  GET_ERROR: {
    id: 3,
    title: "Error al cargar las categorias",
    message: "Las categorias no se han podido cargar, intentalo de nuevo",
    type: "Error",
  },
  POST_SUCCESS: {
    id: 4,
    title: "categoria creada",
    message: "La categorias se ha creado correctamente",
    type: "Success",
  },
  POST_ERROR: {
    id: 5,
    title: "Error al crear la categoria",
    message: "La categoria no se ha podido crear, intentalo de nuevo",
    type: "Error",
  },
  PUT_SUCCESS: {
    id: 6,
    title: "categorias actualizada",
    message: "La categorias se ha actualizado correctamente",
    type: "Info",
  },
  PUT_ERROR: {
    id: 7,
    title: "Error al actualizar la categoria",
    message: "La categoria no se ha podido actualizar, intentalo de nuevo",
    type: "Error",
  },
  DELETE_SUCCESS: {
    id: 8,
    title: "Categorias eliminada",
    message: "La categoria se ha eliminado correctamente",
    type: "Warning",
  },
  DELETE_ERROR: {
    id: 9,
    title: "Error al eliminar la categoria",
    message: "La categorias no se ha podido eliminar, intentalo de nuevo",
    type: "Error",
  },
} as const;

export default function Categories() {
  const {
    data: categories,
    error: GetError,
    isLoading: GetIsLoading,
    isSuccess: GetIsSuccess,
    isError: GetIsError,
  } = useCategories();
  const {
    error: PostError,
    isSuccess: PostIsSuccess,
    isError: PostIsError,
    mutate: PostCategory,
    reset: PostReset,
  } = usePostCategories();
  const {
    error: PutError,
    isSuccess: PutIsSuccess,
    isError: PutIsError,
    mutate: PutMutate,
    reset: PutReset,
  } = usePutCategories();
  const {
    error: DeleteError,
    mutate: DeleteMutate,
    isSuccess: DeleteIsSuccess,
    isError: DeleteIsError,
    reset: DeleteReset,
  } = useDeleteCategories();
  const { showAlert } = useAlert();
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (categories) {
      setFilteredCategories(categories);
    }
  }, [categories]);

  useEffect(() => {
    if (GetIsError) {
      showAlert({
        message: alertConfig.GET_ERROR.message,
        title: alertConfig.GET_ERROR.title,
        type: alertConfig.GET_ERROR.type,
      });
    } else if (GetIsSuccess) {
      if (!categories || categories.length === 0) {
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
    if (PostIsSuccess) {
      setIsOpen(false);
      showAlert({
        message: alertConfig.POST_SUCCESS.message,
        title: alertConfig.POST_SUCCESS.title,
        type: alertConfig.POST_SUCCESS.type,
      });
      PostReset();
    }
  }, [PostIsSuccess, PostIsError, PostReset, showAlert]);

  useEffect(() => {
    if (PutIsError) {
      showAlert({
        message: alertConfig.PUT_ERROR.message,
        title: alertConfig.PUT_ERROR.title,
        type: alertConfig.PUT_ERROR.type,
      });
    } else if (PutIsSuccess) {
      setIsOpen(false);
      showAlert({
        message: alertConfig.PUT_SUCCESS.message,
        title: alertConfig.PUT_SUCCESS.title,
        type: alertConfig.PUT_SUCCESS.type,
      });
      PutReset();
    }
  }, [PutIsSuccess, PutIsError, PutReset, showAlert]);

  useEffect(() => {
    if (DeleteIsError) {
      showAlert({
        message: alertConfig.DELETE_ERROR.message,
        title: alertConfig.DELETE_ERROR.title,
        type: alertConfig.DELETE_ERROR.type,
      });
    } else if (DeleteIsSuccess) {
      showAlert({
        message: alertConfig.DELETE_SUCCESS.message,
        title: alertConfig.DELETE_SUCCESS.title,
        type: alertConfig.DELETE_SUCCESS.type,
      });
      DeleteReset();
    }
  }, [DeleteIsSuccess, DeleteIsError, DeleteReset, showAlert]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleEditCategory = (
    category: CategoryRequest,
    onSuccess: () => void
  ) => {
    PutMutate(category, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  if (GetIsLoading) {
    return (
      <div className="flex justify-center items-center text-2xl text-neutral-900 font-semibold w-full h-full">
        <p className="text-center">Cargando</p>
      </div>
    );
  }

  if (GetError || PostError || PutError || DeleteError) {
    return (
      <div className="flex justify-center items-center text-2xl text-neutral-900 font-semibold w-full h-full">
        <p className="text-center">
          Hubo un erro:{" "}
          {GetError?.message ||
            PostError?.message ||
            PutError?.message ||
            DeleteError?.message}
        </p>
      </div>
    );
  }

  const renderCategories = () => {
    return filteredCategories.length === 0 ? (
      <h1 className="mt-4 text-gray-600">No hay Categorias</h1>
    ) : (
      filteredCategories.map((category) => (
        <CategoryCard
          key={category.id}
          name={category.name}
          categoryData={category}
          onClick={() => {
            if (category.id !== undefined) DeleteMutate(category.id);
          }}
          onSubmit={handleEditCategory}
        />
      ))
    );
  };

  return (
    <div>
      <PageHeader<Category>
        title="Gestión de Categorias"
        description="Administra las categorias de tus productos"
        data={categories ?? []}
        extractName={(item) => item.name}
        handleIsOpen={handleOpen}
        onResults={setFilteredCategories}
        buttonLabel="Nueva categoria"
      />
      <CreateEditCategory
        isOpen={isOpen}
        onClose={handleClose}
        onSubmit={PostCategory}
        title="Crear Categoria"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {renderCategories()}
      </div>
    </div>
  );
}
