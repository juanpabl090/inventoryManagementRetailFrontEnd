import { useEffect, useState } from "react";
import Cards from "../components/Cards";
import useCategories from "../hooks/categories/useCategories";
import PageHeader from "../layouts/PageHeader";
import type { Category } from "../types/models/index";
import CreateEditCategory from "../layouts/CreateEditCategory";

export default function Categories() {
  // TODO: hacer el hook de crear, editar y eliminar categoria
  const { data: categories } = useCategories();
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (categories) {
      setFilteredCategories(categories);
    }
  }, [setFilteredCategories, categories]);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const renderCategories = () => {
    return filteredCategories.length === 0 ? (
      <h1 className="mt-4 text-gray-600">No hay Categorias</h1>
    ) : (
      filteredCategories.map((category) => (
        <Cards key={category.id} name={category.name} categoryData={category} />
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
        onSubmit={
          () =>
            console.log(
              "creando"
            ) /*(nombre de funcion del usePostCategory (mutate: postCategory*/
        }
        title="Crear Categoria"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {renderCategories()}
      </div>
    </div>
  );
}
