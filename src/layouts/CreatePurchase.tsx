import { ErrorMessage, Field, Form, Formik } from "formik";
import { Button } from "../components";
import type { PurchaseRequest } from "../types/models";
import * as Yup from "yup";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (purchaseData: PurchaseRequest) => void;
};

export default function CreatePurchase({ isOpen, onClose, onSubmit }: Props) {
  if (!isOpen) return null;

  const schema = Yup.object({
    product: Yup.object({
      name: Yup.string().required("El nombre del producto es obligatorio"),
    }),
    supplier: Yup.object({
      name: Yup.string().required("El nombre del proveedor es obligatorio"),
    }),
    quantity: Yup.number()
      .required("La cantidad es obligatoria")
      .min(1, "La cantidad debe ser al menos 1"),
    amount: Yup.number()
      .required("El monto es obligatorio")
      .positive("El monto debe ser positivo"),
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-500 bg-opacity-50">
      <div className=" bg-white rounded-lg p-5 xs:mx-2">
        <p className="text-2xl">Nueva Compra</p>
        <Formik
          initialValues={{
            product: {
              name: "",
            },
            supplier: {
              name: "",
              contact: {},
            },
            quantity: 0,
            amount: 0,
          }}
          validationSchema={schema}
          onSubmit={(values, { resetForm }) => {
            const purchaseToSend: PurchaseRequest = {
              product: {
                name: values.product.name,
              },
              supplier: {
                name: values.supplier.name,
                contact: {},
              },
              quantity: values.quantity,
              amount: values.amount,
            };
            onSubmit(purchaseToSend);
            resetForm();
            onClose();
          }}
          enableReinitialize
        >
          {({ resetForm, errors, touched }) => (
            <div className="flex justify-between my-2">
              <Form>
                <div className="flex justify-between my-2">
                  {touched.product?.name && errors.product?.name ? (
                    <ErrorMessage
                      name="product.name"
                      component="div"
                      className="text-red-500 text-sm w-full"
                    />
                  ) : (
                    <label
                      htmlFor="product-name"
                      className="text-base text-neutral-500 w-full"
                    >
                      Nombre del Producto
                    </label>
                  )}
                </div>
                <div className="flex justify-between my-2">
                  <Field
                    name="product.name"
                    autoComplete="off"
                    className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
                  />
                </div>

                <div className="flex justify-between my-2">
                  {touched.supplier?.name && errors.supplier?.name ? (
                    <ErrorMessage
                      name="supplier.name"
                      component="div"
                      className="text-red-500 text-sm w-full"
                    />
                  ) : (
                    <label
                      htmlFor="supplier-name"
                      className="text-base text-neutral-500 w-full"
                    >
                      Nombre del Proveedor
                    </label>
                  )}
                </div>
                <div className="flex justify-between my-2">
                  <Field
                    name="supplier.name"
                    autoComplete="off"
                    className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
                  />
                </div>

                <div className="flex justify-between my-2">
                  {touched.quantity && errors.quantity ? (
                    <ErrorMessage
                      name="quantity"
                      component="div"
                      className="text-red-500 text-sm w-full"
                    />
                  ) : (
                    <label
                      htmlFor="quantity"
                      className="text-base text-neutral-500 w-full"
                    >
                      Cantidad
                    </label>
                  )}
                </div>
                <div className="flex justify-between my-2">
                  <Field
                    type="number"
                    name="quantity"
                    autoComplete="off"
                    className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
                  />
                </div>

                <div className="flex justify-between my-2">
                  {touched.amount && errors.amount ? (
                    <ErrorMessage
                      name="amount"
                      component="div"
                      className="text-red-500 text-sm w-full"
                    />
                  ) : (
                    <label
                      htmlFor="amount"
                      className="text-base text-neutral-500 w-full"
                    >
                      Monto
                    </label>
                  )}
                </div>
                <div className="flex justify-between my-2">
                  <Field
                    type="number"
                    name="amount"
                    autoComplete="off"
                    className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
                  />
                </div>
                <div className="flex justify-between my-2">
                  <Button
                    type="submit"
                    variant="solid"
                    size="lg"
                    className="mr-3"
                  >
                    Guardar
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    className="w-40"
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
