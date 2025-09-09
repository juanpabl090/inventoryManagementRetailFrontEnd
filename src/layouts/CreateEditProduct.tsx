import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import useCategories from "../hooks/categories/useCategories";
import type {
  Category,
  ProductType,
  Supplier,
  ProductRequest,
} from "../types/models/index";
import { ErrorMessage, Field, Formik, Form } from "formik";
import * as yup from "yup";
import { useProductsTypes } from "../hooks/productType";

type createEditProductProps = {
  title?: string;
  id?: number;
  name?: string;
  description?: string;
  category?: Category;
  buyPrice?: number;
  salePrice?: number;
  stock?: number;
  supplier?: Supplier;
  productType?: ProductType;
  onClose: () => void;
  isOpen?: boolean;
  onSubmit: (product: ProductRequest) => void;
};
interface objectOptions {
  categories: Category;
  productType: ProductType;
  supplier?: Supplier;
}

export default function CreateEditProduct(propValues: createEditProductProps) {
  const [objectOptions, setObjectOptions] = useState<objectOptions[]>([]);

  const { data: dataCategories } = useCategories();
  const { data: dataProductsTypes } = useProductsTypes();

  const setOptions = (
    dataCategories: Category[],
    dataProductsTypes: ProductType[]
  ): objectOptions[] => {
    const legth = Math.min(dataCategories.length, dataProductsTypes.length);
    const options: objectOptions[] = [];

    for (let index = 0; index < legth; index++) {
      options.push({
        categories: {
          id: dataCategories[index].id,
          name: dataCategories[index].name,
        },
        productType: {
          id: dataProductsTypes[index].id,
          name: dataProductsTypes[index].name,
        },
      });
    }
    return options;
  };

  useEffect(() => {
    if (dataCategories && dataProductsTypes) {
      setObjectOptions(setOptions(dataCategories, dataProductsTypes));
    }
  }, [dataCategories, dataProductsTypes]);

  if (!propValues.isOpen) return null;

  const quantityError = (e: string): string => {
    return `${e} price must be greater than 0`;
  };

  const ValidationSchema = yup.object().shape({
    name: yup.string().required("name is required").min(1).max(50),
    description: yup
      .string()
      .required("description is required")
      .min(1)
      .max(150),
    categoryId: yup
      .number()
      .typeError("Category is required")
      .required("category is required")
      .notOneOf([0], "Must Pick a Category"),
    buyPrice: yup
      .number()
      .required("Buy price is required")
      .positive(quantityError("Buy price")),
    salePrice: yup
      .number()
      .required("Sale price is required")
      .positive(quantityError("Sale price")),
    stock: yup
      .number()
      .required("Stock is required")
      .positive(quantityError("Stock")),
    supplierId: yup
      .number()
      .typeError("Supplier is required")
      .required("Supplier is required")
      .notOneOf([0], "Must Pick a Supplier"),
    productTypeId: yup
      .number()
      .typeError("Product type is required")
      .required("Product type is required")
      .notOneOf([0], "Must Pick a Product Type"),
  });

  const initialValues = {
    name: propValues.name || "",
    description: propValues.description || "",
    categoryId: propValues.category?.id || 0,
    buyPrice: propValues.buyPrice || 0,
    salePrice: propValues.salePrice || 0,
    stock: propValues.stock || 0,
    supplierId: propValues.supplier?.id || 0,
    productTypeId: propValues.productType?.id || 0,
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-500 bg-opacity-50">
      <div className=" bg-white rounded-lg p-5 xs:mx-2">
        <h1 className="text-lg font-semibold">{propValues.title}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={ValidationSchema}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            const productToSend =
              propValues.id !== undefined
                ? { ...values, id: propValues.id }
                : values;
            propValues.onSubmit(productToSend);
            resetForm();
          }}
        >
          {({ resetForm, errors, touched }) => (
            <Form>
              <div className="flex justify-between my-2">
                {touched.name && errors.name ? (
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="text-red-500 text-sm w-full"
                  />
                ) : (
                  <label
                    htmlFor="product-name"
                    className="text-base text-neutral-800 w-full"
                  >
                    Nombre
                  </label>
                )}
                {touched.stock && errors.stock ? (
                  <ErrorMessage
                    name="stock"
                    component="div"
                    className="text-red-500 text-sm w-full"
                  />
                ) : (
                  <label
                    htmlFor="product-stock"
                    className="text-base text-neutral-800 w-full"
                  >
                    Stock
                  </label>
                )}
              </div>
              <div className="flex justify-between my-2">
                <Field
                  id="product-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
                  placeholder={propValues.name === "" ? "" : propValues.name}
                />
                <Field
                  id="product-stock"
                  name="stock"
                  autoComplete="off"
                  className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900 "
                  type="number"
                  placeholder={
                    propValues.stock === 0
                      ? `${propValues.stock}`
                      : `${propValues.stock}`
                  }
                  min={0}
                />
              </div>
              <div className="flex justify-between my-2">
                {touched.description && errors.description ? (
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="text-red-500 text-sm w-full"
                  />
                ) : (
                  <label
                    htmlFor="product-description"
                    className="text-base text-neutral-800 w-full"
                  >
                    Descripcion
                  </label>
                )}
              </div>
              <div className="flex justify-between my-2">
                <Field
                  as="textarea"
                  id="product-description"
                  name="description"
                  autoComplete="off"
                  className="min-h-10 h-auto rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full border border-neutral-900"
                  placeholder={
                    propValues.description === "" ? "" : propValues.description
                  }
                />
              </div>

              <div className="flex justify-between my-2">
                {touched.buyPrice && errors.buyPrice ? (
                  <ErrorMessage
                    name="buyPrice"
                    component="div"
                    className="text-red-500 text-sm w-full"
                  />
                ) : (
                  <label
                    htmlFor="product-buyPrice"
                    className="text-base text-neutral-800 w-full"
                  >
                    Precio de Compra
                  </label>
                )}
                {touched.salePrice && errors.salePrice ? (
                  <ErrorMessage
                    name="salePrice"
                    component="div"
                    className="text-red-500 text-sm w-full"
                  />
                ) : (
                  <label
                    htmlFor="product-salePrice"
                    className="text-base text-neutral-800 w-full"
                  >
                    Precio de Venta
                  </label>
                )}
              </div>
              <div className="flex justify-between my-2">
                <Field
                  id="product-buyPrice"
                  name="buyPrice"
                  autoComplete="off"
                  className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900 "
                  type="number"
                  placeholder={
                    propValues.buyPrice === 0 ? "" : `${propValues.buyPrice}`
                  }
                  min={0}
                />
                <Field
                  id="product-salePrice"
                  name="salePrice"
                  autoComplete="off"
                  className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900 "
                  type="number"
                  placeholder={
                    propValues.salePrice === 0 ? "" : `${propValues.salePrice}`
                  }
                  min={0}
                />
              </div>

              <div className="flex justify-between my-2">
                {touched.categoryId && errors.categoryId ? (
                  <ErrorMessage
                    name="categoryId"
                    component="div"
                    className="text-red-500 text-sm w-full mx-1"
                  />
                ) : (
                  <label
                    htmlFor="product-categoryId"
                    className="text-base text-neutral-800 w-full mx-1"
                  >
                    Categoria
                  </label>
                )}
                {touched.productTypeId && errors.productTypeId ? (
                  <ErrorMessage
                    name="productTypeId"
                    component="div"
                    className="text-red-500 text-sm w-full mx-1"
                  />
                ) : (
                  <label
                    htmlFor="product-productTypeId"
                    className="text-base text-neutral-800 w-full mx-1"
                  >
                    Tipo de Producto
                  </label>
                )}
                {touched.supplierId && errors.supplierId ? (
                  <ErrorMessage
                    name="supplierId"
                    component="div"
                    className="text-red-500 text-sm w-full mx-1"
                  />
                ) : (
                  <label
                    htmlFor="product-supplierId"
                    className="text-base text-neutral-800 w-full mx-1"
                  >
                    Proverdor
                  </label>
                )}
              </div>
              <div className="flex justify-between my-2">
                <Field
                  as="select"
                  id="product-categoryId"
                  name="categoryId"
                  autoComplete="off"
                  className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
                >
                  <option value={0} hidden>
                    {propValues.category?.id === 0
                      ? "Elige una categoria"
                      : propValues.category?.id}
                  </option>
                  {objectOptions.map((item) => (
                    <option key={item.categories.id} value={item.categories.id}>
                      {item.categories.name}
                    </option>
                  ))}
                </Field>
                <Field
                  as="select"
                  id="product-productTypeId"
                  name="productTypeId"
                  autoComplete="off"
                  className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
                >
                  <option value={0} hidden>
                    {propValues.productType?.id === 0
                      ? "Elige una categoria"
                      : propValues.productType?.id}
                  </option>
                  {objectOptions.map((item) => (
                    <option
                      key={item.categories.id}
                      value={item.productType.id}
                    >
                      {item.productType.name}
                    </option>
                  ))}
                </Field>
                <Field
                  as="select"
                  id="product-supplierId"
                  name="supplierId"
                  autoComplete="off"
                  className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
                >
                  <option value={0} hidden>
                    {propValues.supplier
                      ? "Elige una categoria"
                      : propValues.supplier}
                  </option>
                  <option value={15}>raspberry_pi</option>
                  <option value={16}>arduino</option>
                  <option value={18}>intel</option>
                  <option value={20}>sony</option>
                  <option value={21}>meta</option>
                </Field>
              </div>
              <div className="flex justify-evenly mt-10">
                <Button
                  variant="solid"
                  size="lg"
                  className="w-full"
                  type="submit"
                >
                  {propValues.id ? "Editar Producto" : "Crear Producto"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full ml-5 "
                  onClick={() => {
                    resetForm();
                    propValues.onClose();
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
