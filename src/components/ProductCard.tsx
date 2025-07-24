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

interface ICardItem {
  icon: React.ReactNode;
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
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dataString).toLocaleDateString("es-ES", options);
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
  const cardItems: ICardItem[] = [
    {
      icon: <Layers size={16} strokeWidth={1.5} />,
      label: "Stock:",
      values: stock,
    },
    {
      icon: <DollarSign size={16} strokeWidth={1.5} />,
      label: "Precio De compra:",
      values: buyPrice,
    },
    {
      icon: <BarChart2 size={16} strokeWidth={1.5} />,
      label: "Precio De Venta:",
      values: salePrice,
    },
    {
      icon: <Tag size={16} strokeWidth={1.5} />,
      label: "Tipo:",
      values: productTypeId,
    },
    {
      icon: <Truck size={16} strokeWidth={1.5} />,
      label: "Provedor:",
      values: supplierId,
    },
    {
      icon: <Calendar size={16} strokeWidth={1.5} />,
      label: "Creado:",
      values: formatDate(createdDate),
    },
    {
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
        <div className="flex flex-grow overflow-auto">
          <Button variant="ghost" className="hover:bg-primary-200 p-2">
            <SquarePen
              strokeWidth={1}
              size={20}
              className="mr-2 text-neutral-600 hover:text-primary-500"
            />
          </Button>
          <Button variant="ghost" className="hover:!bg-error-200 p-2">
            <Trash2
              strokeWidth={1}
              size={20}
              className="mr-2 text-neutral-600 hover:text-error-600"
            />
          </Button>
        </div>
      </div>
      <div className="text-sm break-words my-2 mx-2">{description}</div>
      <div className="space-y-3 flex-grow overflow-auto">
        {cardItems.map(({ icon, label, values }) => {
          return (
            <div className="flex justify-between">
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
