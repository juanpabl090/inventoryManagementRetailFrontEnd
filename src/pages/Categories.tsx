import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import useCategories from "../hooks/categories/useCategories";
import PageHeader from "../layouts/PageHeader";
import type { Category, CategoryRequest } from "../types/models/index";
import CreateEditCategory from "../layouts/CreateEditCategory";
import usePostCategories from "../hooks/categories/usePostCategories";
import usePutCategories from "../hooks/categories/usePatchCategories";
import useDeleteCategories from "../hooks/categories/useDeleteCategories";

export default function Categories() {
  // TODO: hacer el hook de crear, editar y eliminar categoria
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

  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (categories) {
      setFilteredCategories(categories);
    }
  }, [categories]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleEditCategory = (category: CategoryRequest, onSuccess: () => void) => {
    PutMutate(category, {
      onSuccess: () => {
        onSuccess();
      },
    });
  };

  useEffect(() => {
    if (PostIsSuccess) {
      setIsOpen(false);
    }
  }, [PostIsSuccess]);

  useEffect(() => {
    if (PutIsSuccess) {
      setIsOpen(false);
    }
  }, [PutIsSuccess]);

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
        <Cards
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
