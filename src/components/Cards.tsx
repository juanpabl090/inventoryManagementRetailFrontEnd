import { Edit, FolderOpen, Trash2 } from "lucide-react";
import CreateEditCategory from "../layouts/CreateEditCategory";
import { useState } from "react";
import type { Category } from "../types/models";

type Props = {
  categoryData: Category;
  name: string;
  // TODO: agregar los demas props para hacer funcional el formulario, llevar el ons¿Submit a la pagina Categories
};

export default function Cards({ name, categoryData }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleCLose = () => setIsOpen(false);
  const handleOpen = () => setIsOpen(true);

  const newFunction = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border mx-2 border-gray-200 p-5 mt-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <FolderOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{name}</h3>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleOpen}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => console.log("Borrando")}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="">
      <CreateEditCategory
        isOpen={isOpen}
        onClose={handleCLose}
        categoryData={categoryData}
        onSubmit={
          () =>
            console.log(
              "editando"
            ) /*(nombre de funcion del usePatchCategory (mutate: patchCategory*/
        }
        title="Editar Categoria"
      />
      {newFunction()}
    </div>
  );
}
