import { Edit, Mail, MapPin, Phone, Trash2, Truck } from "lucide-react";
import type { Supplier, SupplierRequest } from "../types/models";
import CreateEditSupplier from "../layouts/CreateEditSupplier";
import { useState } from "react";

type props = {
  data: Supplier;
  onSubmit: (supplierRequest: SupplierRequest, onSuccess: () => void) => void;
  onClick: () => void;
};

export default function SupplierCard({ data, onClick, onSubmit }: props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleOpen = () => setIsOpen(true);
  const handleCLose = () => setIsOpen(false);

  const handleUpdate = (supplerRequest: SupplierRequest) => {
    onSubmit(supplerRequest, () => {
      setIsOpen(false);
    });
  };

  const renderSupplier = () => {
    return (
      <div className="bg-white rounded-lg shadow-sm border mx-2 border-gray-200 p-5 mt-5 hover:shadow-md transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-100 p-2 rounded-lg">
              <Truck className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{data.name}</h3>
              <p className="text-sm text-gray-500">{data.id}</p>
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
              onClick={onClick}
              className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-gray-600">
            <Mail className="h-4 w-4" />
            <span className="text-sm">{data.contact?.email}</span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Phone className="h-4 w-4" />
            <span className="text-sm">{data.contact?.phone}</span>
          </div>
          <div className="flex items-start space-x-2 text-gray-600">
            <MapPin className="h-4 w-4 mt-0.5" />
            <span className="text-sm">{data.contact?.address}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <CreateEditSupplier
        isOpen={isOpen}
        onClose={handleCLose}
        onSubmit={handleUpdate}
        supplierData={data}
        title="Editar Proveedor"
      />
      {renderSupplier()}
    </div>
  );
}
