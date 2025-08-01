import { Button } from "../components/Button";
import type { Product } from "../types/types";
import { useFormik } from "formik";

type createEditProductProps = {
  title?: string;
  id?: number;
  name?: string;
  description?: string;
  categoryId?: number;
  buyPrice?: number;
  salePrice?: number;
  stock?: number;
  supplierId?: number;
  productTypeId?: number;
  onClose: () => void;
  isOpen?: boolean;
  onSubmit: (product: Product) => void;
};

export default function CreateEditProduct(propValues: createEditProductProps) {
  const formik = useFormik({
    initialValues: {
      name: propValues.name || "",
      description: propValues.description || "",
      categoryId: propValues.categoryId || 0,
      buyPrice: propValues.buyPrice || 0,
      salePrice: propValues.salePrice || 0,
      stock: propValues.stock || 0,
      supplierId: propValues.supplierId || 0,
      productTypeId: propValues.productTypeId || 0,
    },
    enableReinitialize: true,
    onSubmit: (values) => {
      const productToSend =
        propValues.id !== undefined ? { ...values, id: propValues.id } : values;
      propValues.onSubmit(productToSend as Product);
    },
  });
  if (!propValues.isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-500 bg-opacity-50">
      <div className=" bg-white rounded-lg p-5 xs:mx-2">
        <h1 className="text-lg font-semibold">{propValues.title}</h1>
        <div className="flex justify-between my-2">
          <label htmlFor="name" className="text-base text-neutral-800 w-full">
            Nombre
          </label>
          <label htmlFor="stock" className="text-base text-neutral-800 w-full">
            Stock
          </label>
        </div>
        <div className="flex justify-between my-2">
          <input
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
            placeholder={propValues.name === "" ? "" : propValues.name}
            disabled={!!propValues.name}
            value={formik.values.name}
            onChange={(e) => formik.setFieldValue("name", e.target.value)}
          />
          <input
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900 "
            type="number"
            placeholder={
              propValues.stock === 0
                ? `${propValues.stock}`
                : `${propValues.stock}`
            }
            min={0}
            value={formik.values.stock}
            onChange={(e) =>
              formik.setFieldValue("stock", Number(e.target.value))
            }
          />
        </div>

        <div className="flex justify-between my-2">
          <label className="text-base text-neutral-800 w-full">
            Descripcion
          </label>
        </div>
        <div className="flex justify-between my-2">
          <textarea
            className="min-h-10 h-auto rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full border border-neutral-900"
            placeholder={
              propValues.description === "" ? "" : propValues.description
            }
            disabled={!!propValues.description}
            value={formik.values.description}
            onChange={(e) =>
              formik.setFieldValue("description", e.target.value)
            }
          />
        </div>

        <div className="flex justify-between my-2">
          <label className="text-base text-neutral-800 w-full">
            Precio de Compra
          </label>
          <label className="text-base text-neutral-800 w-full">
            Precio de Venta
          </label>
        </div>
        <div className="flex justify-between my-2">
          <input
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900 "
            type="number"
            placeholder={
              propValues.buyPrice === 0 ? "" : `${propValues.buyPrice}`
            }
            min={0}
            value={formik.values.buyPrice}
            onChange={(e) =>
              formik.setFieldValue("buyPrice", Number(e.target.value))
            }
          />
          <input
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900 "
            type="number"
            placeholder={
              propValues.salePrice === 0 ? "" : `${propValues.salePrice}`
            }
            min={0}
            value={formik.values.salePrice}
            onChange={(e) =>
              formik.setFieldValue("salePrice", Number(e.target.value))
            }
          />
        </div>

        <div className="flex justify-between my-2">
          <label className="text-base text-neutral-800 w-full">Categoria</label>
          <label className="text-base text-neutral-800 w-full">
            Tipo de Producto
          </label>
          <label className="text-base text-neutral-800 w-full">Proverdor</label>
        </div>
        <div className="flex justify-between my-2">
          <select
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
            name="categoryId"
            disabled={!!propValues.categoryId}
            value={formik.values.categoryId}
            onChange={(e) =>
              formik.setFieldValue("categoryId", Number(e.target.value))
            }
          >
            <option value={0} disabled hidden>
              {propValues.categoryId === 0
                ? "Elige una categoria"
                : propValues.categoryId}
            </option>
            <option value={6}>keyboards</option>
            <option value={7}>robotics</option>
            <option value={8}>3d_printers</option>
          </select>
          <select
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
            disabled={!!propValues.productTypeId}
            value={formik.values.productTypeId}
            onChange={(e) =>
              formik.setFieldValue("productTypeId", Number(e.target.value))
            }
          >
            <option value={0} disabled hidden>
              {propValues.productTypeId === 0
                ? "Elige una categoria"
                : propValues.productTypeId}
            </option>
            <option value={1}>tablet</option>
            <option value={2}>gaming_console</option>
            <option value={3}>drone</option>
          </select>
          <select
            className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
            disabled={!!propValues.supplierId}
            value={formik.values.supplierId}
            onChange={(e) =>
              formik.setFieldValue("supplierId", Number(e.target.value))
            }
          >
            <option value={0} disabled hidden>
              {propValues.supplierId
                ? "Elige una categoria"
                : propValues.supplierId}
            </option>
            <option value={15}>raspberry_pi</option>
            <option value={16}>arduino</option>
            <option value={18}>intel</option>
            <option value={20}>sony</option>
            <option value={21}>meta</option>
          </select>
        </div>
        <div className="flex justify-evenly mt-10">
          <Button
            variant="solid"
            size="lg"
            className="w-full"
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            {propValues.id ? "Editar Producto" : "Crear Producto"}
          </Button>
          <Button
            type="button"
            variant="outline"
            size="lg"
            className="w-full ml-5 "
            onClick={() => {
              formik.resetForm();
              propValues.onClose();
            }}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
