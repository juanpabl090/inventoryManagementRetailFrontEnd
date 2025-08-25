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
  Grid3x3,
} from "lucide-react";
import type React from "react";
import { Button } from "./Button";
import { useState } from "react";
import CreateEditProduct from "../layouts/CreateEditProduct";
import type { Category, ProductType, Supplier } from "../types/models/index";
import type { ProductRequest } from "../types/models/Product";

interface ICardItem {
  id: number;
  icon: React.ReactElement;
  label: string;
  values: string | number;
}

type CardProps = {
  id?: number;
  name?: string;
  description?: string;
  category?: Category;
  buyPrice?: number;
  salePrice?: number;
  stock?: number;
  createdDate?: string;
  updatedDate?: string;
  supplier?: Supplier;
  productType?: ProductType;
  onSubmit: (product: ProductRequest, onSuccess: () => void) => void;
  onClick: () => void;
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
  id,
  name = "",
  description = "",
  category = { id: 0, name: "" },
  buyPrice = 0,
  salePrice = 0,
  stock = 0,
  createdDate = "",
  updatedDate = "",
  supplier = { id: 0, name: "" },
  productType = { id: 0, name: "" },
  onSubmit,
  onClick,
}: CardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = (updateProduct: ProductRequest) => {
    onSubmit(updateProduct, () => {
      setIsOpen(false);
    });
  };

  const handleIsOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  type Displayable = number | { name?: string | undefined } | undefined;
  const getDisplayName = (entity: Displayable): string => {
    if (typeof entity === "number") return String(entity);
    if (entity && typeof entity.name === "string" && entity.name.trim() !== "")
      return entity.name;
    return "N/A";
  };

  const cardItemsValues: ICardItem[] = [
    {
      id: 1,
      icon: <Layers size={16} className="text-neutral-500" color="#10b981" />,
      label: "Stock:",
      values: stock,
    },
    {
      id: 2,
      icon: (
        <DollarSign size={16} className="text-neutral-500" color="#3b82f6" />
      ),
      label: "compra:",
      values: buyPrice,
    },
    {
      id: 3,
      icon: (
        <BarChart2 size={16} className="text-neutral-500" color="#3b82f6" />
      ),
      label: "Venta:",
      values: salePrice,
    },
    {
      id: 4,
      icon: <Tag size={16} className="text-neutral-500" color="#f97316" />,
      label: "Tipo:",
      values: getDisplayName(productType),
    },
    {
      id: 5,
      icon: <Truck size={16} className="text-neutral-500" color="#ff2056" />,
      label: "Provedor:",
      values: getDisplayName(supplier),
    },
    {
      id: 6,
      icon: <Grid3x3 size={16} className="text-neutral-500" color="#d946ef" />,
      label: "Categoria:",
      values: getDisplayName(category),
    },
  ];

  const cardItemsDates: ICardItem[] = [
    {
      id: 7,
      icon: <Calendar size={20} className="text-neutral-500" color="#8e51ff" />,
      label: "Creado:",
      values: formatDate(createdDate),
    },
    {
      id: 8,
      icon: <Clock size={20} className="text-neutral-500" color="#fd9a00" />,
      label: "Actualizado:",
      values: formatDate(updatedDate),
    },
  ];

  return (
    <div className="flex flex-col m-1 bg-white rounded-lg shadow-sm border border-gray-200 p-5 hover:shadow-md transition-shadow lg:w-96 animate-slide-in">
      <div className="flex items-start justify-between">
        <div className="flex justify-center items-center bg-primary-100 h-10 w-10 rounded-2xl">
          <Package className="text-primary-500 h-6 w-6" />
        </div>
        <div className="px-2 flex-grow min-w-0">
          <p className="text-base font-bold break-words max-w-full">{name}</p>
          <p className="text-sm text-neutral-500">{id}</p>
        </div>
        <div className="flex space-x-2">
          <Button
            type="button"
            variant="ghost"
            className="p-2 text-primary-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
            onClick={handleIsOpen}
          >
            <SquarePen strokeWidth={1} size={20} className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="p-2 text-error-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            onClick={onClick}
          >
            <Trash2 strokeWidth={1} size={20} className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="text-sm my-2 mx-2 max-w-80 min-w-0">
        <p className="break-keep">{description}</p>
      </div>
      <div className="space-y-3 flex-grow overflow-auto">
        <CreateEditProduct
          onSubmit={handleEdit}
          isOpen={isOpen}
          onClose={handleClose}
          title="Edit Product"
          id={id}
          name={name}
          stock={stock}
          description={description}
          buyPrice={buyPrice}
          salePrice={salePrice}
          category={category}
          productType={productType}
          supplier={supplier}
        />
        {/* contenedor superior */}
        <div>
          <div className="grid grid-cols-2 gap-y-4 w-full mb-2">
            {cardItemsValues.map(({ id, icon, label, values }) => {
              return (
                <div className="flex w-full" key={id}>
                  <div className="flex items-center m-2">{icon}</div>
                  <div className="flex flex-col">
                    <p className="text-neutral-500">{label}</p>
                    <p className="font-bold">{values}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <hr className="border-spacing-1 border-neutral-300" />
          {/* contenedor inferior*/}
          <div className="grid grid-cols-1 gap-y-4 w-full mt-2">
            {cardItemsDates.map(({ id, icon, label, values }) => {
              return (
                <div className="flex flex-col justify-between" key={id}>
                  <div className="flex w-full">
                    <div className="flex items-center m-2">{icon}</div>
                    <div className="flex flex-col ml-2">
                      <p className="text-neutral-500">{label}</p>
                      <p className="font-bold">{values}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
