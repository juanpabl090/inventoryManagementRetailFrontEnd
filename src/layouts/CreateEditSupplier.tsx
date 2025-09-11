import { ErrorMessage, Field, Form, Formik } from "formik";
import type { Supplier, SupplierRequest } from "../types/models";
import { Button } from "../components";
import * as yup from "yup";

type Props = {
  supplierData?: Supplier;
  title: string;
  onClose: () => void;
  onSubmit: (supplerRequest: SupplierRequest) => void;
  isOpen: boolean;
};

export default function CreateEditSupplier({
  isOpen,
  onClose,
  onSubmit,
  supplierData,
  title,
}: Props) {
  if (!isOpen) return null;

  const Schema = yup.object().shape({
    name: yup
      .string()
      .required()
      .max(50, "El nombre debe de tener entre 1 y 50 caracteres"),
    contact: yup.object({
      address: yup.string().required("La direccion es obligatoria"),
      email: yup
        .string()
        .email("Correo invalido")
        .required("El correo es obligatorio"),
      phone: yup
        .string()
        .matches(
          /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
          "El numero debe de tener 10 digitos"
        )
        .min(10, "Solo se permiten numeros"),
    }),
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-500 bg-opacity-50">
      <div className=" bg-white rounded-lg p-5 xs:mx-2">
        <h1>{title}</h1>
        <Formik
          initialValues={{
            name: supplierData?.name || "",
            contact: {
              address: supplierData?.contact?.address || "",
              email: supplierData?.contact?.email || "",
              phone: supplierData?.contact?.phone || "",
            },
          }}
          validationSchema={Schema}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            const supplierToSend: SupplierRequest =
              supplierData && typeof supplierData.id === "number"
                ? {
                    id: supplierData.id,
                    name: values.name,
                    contact: {
                      id: supplierData.contact?.id,
                      address: values.contact?.address,
                      email: values.contact?.email,
                      phone: values.contact?.phone,
                    },
                  }
                : {
                    name: values.name,
                    contact: {
                      address: values.contact.address,
                      email: values.contact.email,
                      phone: values.contact.phone,
                    },
                  };
            onSubmit(supplierToSend);
            console.log(supplierToSend);
            resetForm();
            onClose();
          }}
        >
          {({ resetForm, errors, touched }) => (
            <div className="flex justify-between my-2">
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
                      htmlFor="supplier-name"
                      className="text-base text-neutral-800 w-full"
                    >
                      nombre
                    </label>
                  )}
                </div>
                <div className="flex justify-between my-2">
                  <Field
                    autoFocus
                    name="name"
                    autoComplete="off"
                    className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
                  />
                </div>

                <div className="flex justify-between my-2">contacto</div>

                <div className="flex justify-between my-2">
                  {touched.contact?.address && errors.contact?.address ? (
                    <ErrorMessage
                      name="contact.address"
                      component="div"
                      className="text-red-500 text-sm w-full"
                    />
                  ) : (
                    <label
                      htmlFor="supplier-contact-address"
                      className="text-base text-neutral-500 w-full"
                    >
                      direccion
                    </label>
                  )}
                </div>
                <div className="flex justify-between my-2">
                  <Field
                    name="contact.address"
                    autoComplete="off"
                    className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
                  />
                </div>

                <div className="flex justify-between my-2">
                  {touched.contact?.email && errors.contact?.email ? (
                    <ErrorMessage
                      name="contact.email"
                      component="div"
                      className="text-red-500 text-sm w-full"
                    />
                  ) : (
                    <label
                      htmlFor="supplier-contact-email"
                      className="text-base text-neutral-500 w-full"
                    >
                      correo
                    </label>
                  )}
                </div>
                <div className="flex justify-between my-2">
                  <Field
                    name="contact.email"
                    autoComplete="off"
                    className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
                  />
                </div>

                <div className="flex justify-between my-2">
                  {touched.contact?.phone && errors.contact?.phone ? (
                    <ErrorMessage
                      name="contact.phone"
                      component="div"
                      className="text-red-500 text-sm w-full"
                    />
                  ) : (
                    <label
                      htmlFor="supplier-contact-phone"
                      className="text-base text-neutral-500 w-full"
                    >
                      telefono
                    </label>
                  )}
                </div>
                <div className="flex justify-between my-2">
                  <Field
                    name="contact.phone"
                    autoComplete="off"
                    className="min-h-10 rounded-lg outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 w-full pl-2 mr-2 border border-neutral-900"
                  />
                </div>

                <div className="flex justify-between my-2">
                  <Button type="submit" size="lg" variant="solid">
                    {supplierData?.id ? "Editar proovedor" : "Crear proovedor"}
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
