import { Edit, FolderOpen, Trash2 } from "lucide-react";
import type { ProductType, ProductTypeRequest } from "../types/models";
import { useState } from "react";
import CreateEditProductType from "../layouts/CreateEditProductType";
import { Button } from "../components/index";

type Props = {
  productTypeData: ProductType;
  onSubmit: (
    productTypeRequest: ProductTypeRequest,
    onSuccess: () => void
  ) => void;
  onClick: () => void;
};

export default function ProductTypeCard({
  productTypeData,
  onClick,
  onSubmit,
}: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleUpdate = (productTypeRequest: ProductTypeRequest) => {
    onSubmit(productTypeRequest, () => {
      setIsOpen(false);
    });
  };

  const handleOpen = () => setIsOpen(true);
  const handleCLose = () => setIsOpen(false);

  const RenderProductType = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border mx-2 border-gray-200 p-5 mt-5 hover:shadow-md transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-lg">
              <FolderOpen className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h3
                className="font-semibold text-gray-900 truncate lg:max-w-52 md:max-w-20 break-words"
                title={productTypeData.name}
              >
                {productTypeData.name}
              </h3>
            </div>
          </div>
          <div className="flex space-x-2 flex-shrink-0 min-w-0 overflow-hidden">
            <Button
              id="edit-button"
              aria-label="Edit"
              type="button"
              variant="ghost"
              onClick={handleOpen}
              className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <Edit id="trash-icon" aria-label="Delete" className="h-4 w-4" />
            </Button>
            <Button
              id="trash-button"
              aria-label="Delete"
              type="button"
              variant="ghost"
              onClick={onClick}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 id="trash-icon" aria-label="Delete" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CreateEditProductType
        isOpen={isOpen}
        onClose={handleCLose}
        onSubmit={handleUpdate}
        title=""
        productTypeData={productTypeData}
      />
      {RenderProductType()}
    </div>
  );
}
