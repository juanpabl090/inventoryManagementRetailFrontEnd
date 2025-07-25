import {
  Package,
  Trash2,
  Tag,
  Truck,
  DollarSign,
  BarChart2,
  Layers,
  Calendar,
  Clock,
  SquarePen,
} from "lucide-react";
import type React from "react";
import { Button } from "./Button";
import { useState } from "react";
import CreateEditProduct from "../layouts/CreateEditProduct";

interface ICardItem {
  id: number;
  icon: React.ReactElement;
  label: string;
  values: string | number;
}

type CardProps = {
  name?: string;
  description?: string;
  categoryId?: number;
  buyPrice?: number;
  salePrice?: number;
  stock?: number;
  createdDate?: string;
  updatedDate?: string;
  supplierId?: number;
  productTypeId?: number;
};

const formatDate = (dataString: string) => {
  if (!dataString) return "N/A";
  const date = new Date(dataString);
  try {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = date.toLocaleDateString("es-ES", options);
    return typeof formattedDate === "string" ? formattedDate : "N/A";
  } catch {
    return "N/A";
  }
};

export default function ProductCard({
  name = "",
  description = "",
  categoryId = 0,
  buyPrice = 0,
  salePrice = 0,
  stock = 0,
  createdDate = "",
  updatedDate = "",
  supplierId = 0,
  productTypeId = 0,
}: CardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleIsOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };
  const cardItems: ICardItem[] = [
    {
      id: 1,
      icon: <Layers size={16} strokeWidth={1.5} />,
      label: "Stock:",
      values: stock,
    },
    {
      id: 2,
      icon: <DollarSign size={16} strokeWidth={1.5} />,
      label: "Precio De compra:",
      values: buyPrice,
    },
    {
      id: 3,
      icon: <BarChart2 size={16} strokeWidth={1.5} />,
      label: "Precio De Venta:",
      values: salePrice,
    },
    {
      id: 4,
      icon: <Tag size={16} strokeWidth={1.5} />,
      label: "Tipo:",
      values: productTypeId,
    },
    {
      id: 5,
      icon: <Truck size={16} strokeWidth={1.5} />,
      label: "Provedor:",
      values: supplierId,
    },
    {
      id: 6,
      icon: <Calendar size={16} strokeWidth={1.5} />,
      label: "Creado:",
      values: formatDate(createdDate),
    },
    {
      id: 7,
      icon: <Clock size={16} strokeWidth={1.5} />,
      label: "Actualizado:",
      values: formatDate(updatedDate),
    },
  ];

  return (
    <div className="flex flex-col m-1 bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex justify-center items-center bg-primary-100 h-10 w-10 rounded-md">
          <Package className="text-primary-500 h-6 w-6" />
        </div>
        <div className="px-2 flex-grow min-w-0">
          <p className="text-base font-bold break-words max-w-24">{name}</p>
          <p className="text-sm text-neutral-500">{categoryId}</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant="ghost"
            className="p-2 text-primary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            onClick={handleIsOpen}
          >
            <SquarePen strokeWidth={1} size={20} className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            className="p-2 text-error-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 strokeWidth={1} size={20} className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-sm break-words my-2 mx-2">{description}</div>
      <div className="space-y-3 flex-grow overflow-auto">
        <CreateEditProduct
          isOpen={isOpen}
          onClose={handleClose}
          title="Edit Product"
        />
        {cardItems.map(({ id, icon, label, values }) => {
          return (
            <div className="flex justify-between" key={id}>
              <div className="flex flex-row flex-grow items-center space-x-2">
                {icon}
                <p className="text-neutral-500">{label}</p>
              </div>
              <p className="text-neutral-900 break-words">{values}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
