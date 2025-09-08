import { ErrorMessage, Field, Form, Formik } from "formik";
import type { ProductType, ProductTypeRequest } from "../types/models";
import * as yup from "yup";
import { Button } from "../components";

type Props = {
  productTypeData?: ProductType;
  title: string;
  onClose: () => void;
  onSubmit: (productTypeRequest: ProductTypeRequest) => void;
  isOpen: boolean;
};

export default function CreateEditProductType({
  isOpen,
  onClose,
  onSubmit,
  title,
  productTypeData,
}: Props) {
  if (!isOpen) return null;
  const initialValues = {
    name: productTypeData?.name ?? "",
  };
  const schema = yup.object().shape({
    name: yup
      .string()
      .required()
      .max(50, "Name category must be between 1 and 50 characters"),
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-500 bg-opacity-50">
      <div className=" bg-white rounded-lg p-5 xs:mx-2">
        <h1>{title}</h1>
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            const productTypeToSend: ProductTypeRequest =
              productTypeData && typeof productTypeData.id === "number"
                ? { ...values, id: productTypeData.id }
                : { ...values };
            onSubmit(productTypeToSend);
            resetForm();
            onClose();
          }}
          enableReinitialize
        >
          {({ resetForm, errors, touched }) => (
            <div className="flex justify-between my-2">
              <Form>
                <div className="flex justify-between my-2">
                  {errors.name && touched.name ? (
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 text-sm w-full"
                    />
                  ) : (
                    <label
                      htmlFor="productType-name"
                      className="text-base text-neutral-800 w-full"
                    >
                      nombre
                    </label>
                  )}
                </div>
                <div className="flex justify-between my-2">
                  <Field
                    autoFocus
                    id="category-name"
                    name="name"
                    autoComplete="off"
                    className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
                  />
                </div>
                <div className="flex justify-evenly mt-5">
                  <Button type="submit" variant="solid" size="lg">
                    {productTypeData?.id ? "Editar" : "Crear"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="ml-3 w-36"
                    onClick={() => {
                      resetForm();
                      onClose();
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </Form>
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
}
