import { Button } from "../components/Button";

type createEditProductProps = {
  title?: string;
  name?: string;
  stock?: number;
  description?: string;
  buyPrice?: number;
  salePrice?: number;
  category?: number;
  productType?: number;
  supplier?: number;
  onClose?: () => void;
  isOpen?: boolean;
};

export default function CreateEditProduct({
  onClose,
  isOpen = false,
  title = "Product",
  name = "",
  stock = 0,
  description = "",
  buyPrice = 0,
  salePrice = 0,
  category = 0,
  productType = 0,
  supplier = 0,
}: createEditProductProps) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-500 bg-opacity-50">
      <div className=" bg-white rounded-lg p-5 xs:mx-2">
        <h1 className="text-lg font-semibold">{title}</h1>
        <div className="flex justify-between my-2">
          <h1 className="text-base text-neutral-800 w-full">Nombre</h1>
          <h1 className="text-base text-neutral-800 w-full">Stock</h1>
        </div>
        <div className="flex justify-between my-2">
          <input
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
            placeholder={name === "" ? "" : name}
            disabled={!!name}
          />
          <input
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900 "
            type="number"
            placeholder={stock === 0 ? "" : `${stock}`}
            min={0}
          />
        </div>

        <div className="flex justify-between my-2">
          <h1 className="text-base text-neutral-800 w-full">Descripcion</h1>
        </div>
        <div className="flex justify-between my-2">
          <textarea
            className="min-h-10 h-auto rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full border border-neutral-900"
            placeholder={description === "" ? "" : description}
            disabled={!!description}
          />
        </div>

        <div className="flex justify-between my-2">
          <h1 className="text-base text-neutral-800 w-full">
            Precio de Compra
          </h1>
          <h1 className="text-base text-neutral-800 w-full">Precio de Venta</h1>
        </div>
        <div className="flex justify-between my-2">
          <input
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900 "
            type="number"
            placeholder={buyPrice === 0 ? "" : `${buyPrice}`}
            min={0}
          />
          <input
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900 "
            type="number"
            placeholder={salePrice === 0 ? "" : `${salePrice}`}
            min={0}
          />
        </div>

        <div className="flex justify-between my-2">
          <h1 className="text-base text-neutral-800 w-full">Categoria</h1>
          <h1 className="text-base text-neutral-800 w-full">
            Tipo de Producto
          </h1>
          <h1 className="text-base text-neutral-800 w-full">Proverdor</h1>
        </div>
        <div className="flex justify-between my-2">
          <select
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
            disabled={!!category}
          >
            <option value="" selected disabled hidden>
              {category === 0 ? "Elige una categoria" : category}
            </option>
            <option value="">keyboards</option>
            <option value="">robotics</option>
            <option value="">3d_printers</option>
          </select>
          <select
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
            disabled={!!productType}
          >
            <option value="" selected disabled hidden>
              {productType === 0 ? "Elige una categoria" : productType}
            </option>
            <option value="">SmartPhone</option>
            <option value="">Laptop</option>
            <option value="">tablet</option>
            <option value="">gaming_console</option>
            <option value="">drone</option>
          </select>
          <select
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
            disabled={!!supplier}
          >
            <option value="" selected disabled hidden>
              {supplier === 0 ? "Elige una categoria" : supplier}
            </option>
            <option value="">raspberry_pi</option>
            <option value="">arduino</option>
            <option value="">intel</option>
            <option value="">sony</option>
            <option value="">meta</option>
          </select>
        </div>
        <div className="flex justify-evenly mt-10">
          <Button variant="solid" size="lg" className="w-full">
            Crear Producto
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full ml-5 "
            onClick={onClose}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
