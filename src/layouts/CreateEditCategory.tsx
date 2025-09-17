import type { Category, CategoryRequest } from "../types/models";
import { object, string } from "yup";
import { ErrorMessage, Field, Formik, Form } from "formik";
import { Button } from "../components";

type Props = {
  categoryData?: Category;
  title: string;
  onClose: () => void;
  onSubmit: (categoryRequest: CategoryRequest) => void;
  isOpen: boolean;
};

export default function CreateEditCategory({
  isOpen,
  onClose,
  categoryData,
  onSubmit,
  title,
}: Props) {
  if (!isOpen) return null;

  const schema = object().shape({
    name: string()
      .required()
      .max(50, "Name category must be between 1 and 50 characters"),
  });

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-500 bg-opacity-50">
      <div className=" bg-white rounded-lg p-5 xs:mx-2">
        <h1>{title}</h1>
        <Formik
          initialValues={{
            name: categoryData?.name ?? "",
          }}
          validationSchema={schema}
          enableReinitialize
          onSubmit={(values, { resetForm }) => {
            const categoryToSend: CategoryRequest =
              categoryData && typeof categoryData.id === "number"
                ? { ...values, id: categoryData.id }
                : { ...values };
            onSubmit(categoryToSend);
            resetForm();
            onClose(); // Cierra el modal luego de la acción
          }}
        >
          {({ errors, resetForm, touched }) => (
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
                      htmlFor="category-name"
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
                  <Button variant="solid" size="lg" className="" type="submit">
                    {categoryData?.id ? "Editar Categoria" : "Crear Categoria"}
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
