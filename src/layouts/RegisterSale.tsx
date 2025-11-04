import { ShoppingCart } from "lucide-react";
import type { Product, SaleDto, SaleRequest } from "../types/models/index";
import { Button } from "../components";
import { useMemo } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  order: SaleDto[];
  productsData: Product[] | [] | undefined;
  onSubmit: (saleRequest: SaleRequest) => void;
};

export default function RegisterSale({
  isOpen,
  onClose,
  order,
  productsData,
  onSubmit,
}: Props) {
  const {
    Exportdiscount,
    totalDiscount,
    totalWithDiscound,
    totalWithOutDiscount,
  } = useMemo(() => {
    let totalWithOutDiscount = 0;
    let totalDiscount = 0;
    let Exportdiscount = 0;

    order.map(({ discount, productsList }) => {
      Exportdiscount = discount;
      productsList.forEach(({ name, quantity }) => {
        const product = productsData?.find((product) => product.name === name);
        if (!product) return null;

        const subtotal = product.salePrice * quantity;
        totalWithOutDiscount += subtotal;
        totalDiscount += subtotal * discount;
      });
    });

    const totalWithDiscound = totalWithOutDiscount - totalDiscount;
    return {
      totalDiscount,
      totalWithOutDiscount,
      totalWithDiscound,
      Exportdiscount,
    };
  }, [order, productsData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-neutral-800 bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl w-[900px] max-w-[95%] flex flex-col md:flex-row overflow-hidden">
        {/* Panel izquierdo - Productos */}
        <div className="w-full md:w-1/2 p-8 border-r border-neutral-200">
          <div className="flex items-center mb-5">
            <ShoppingCart className="h-8 w-8 text-primary-500 mr-5" />
            <h1 className="text-2xl font-extrabold text-neutral-900">
              Productos Seleccionados
            </h1>
          </div>

          <div className="overflow-y-auto max-h-[60vh] pr-2">
            {order && order.length >= 0 ? (
              <div>
                {order.map(({ productsList }, i) => (
                  <div key={i}>
                    {productsList.map(({ name, quantity }) => {
                      const product = productsData?.find(
                        (product) => product.name === name
                      );
                      const price = product ? product.salePrice : 0;
                      return (
                        <div
                          key={name}
                          className="flex justify-between items-center py-3 border-b border-neutral-200 last:border-b-0"
                        >
                          <div className="flex flex-col">
                            <span className="text-base font-semibold text-neutral-800">
                              {name}
                            </span>
                            <span className="text-sm text-neutral-500">
                              ${price.toFixed(2)} c/u
                            </span>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="text-base text-primary-500 font-medium">
                              {quantity} unidad/es
                            </span>
                            <span className="text-base font-bold text-neutral-900">
                              ${(price * quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            ) : (
              <h1>Sin productos seleccionados</h1>
            )}
          </div>

          <p className="text-xs text-neutral-500">
            *El stock y la disponibilidad serán validados al registrar la venta.
          </p>
        </div>

        {/* Panel derecho - Resumen */}
        <div className="w-full md:w-1/2 p-8 relative bg-gray-100">
          <div className=" flex flex-col space-y-3 relative w-full h-full">
            <div className="space-y-2 text-neutral-700 my-5">
              <div className="flex justify-between">
                <div className="flex items-center mb-5">
                  <h1 className="text-2xl font-extrabold text-neutral-900">
                    Resumen De compra
                  </h1>
                </div>
              </div>

              <div className="flex justify-between">
                <span>Total sin Descuento</span>
                <span>${totalWithOutDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Descuento Aplicado</span>
                <span className="text-success-600">
                  - ${totalDiscount.toFixed(2)} (
                  {(Exportdiscount * 100).toFixed(0)}%)
                </span>
              </div>

              <hr className="my-3 border-neutral-300" />

              <div className="flex justify-between font-semibold">
                <span>Total con Descuento</span>
                <span>${totalWithDiscound.toFixed(2)}</span>
              </div>

              <hr className="my-3 border-neutral-300" />

              <div className="flex justify-between text-blue-700 font-extrabold text-xl">
                <span>Precio Total Final</span>
                <span>${totalWithDiscound.toFixed(2)}</span>
              </div>
            </div>

            <Button
              variant="solid"
              className="bg-success-500 hover:bg-success-700 text-white font-semibold py-2 rounded-xl shadow"
              type="submit"
              onClick={() => {
                const saleRequest: SaleRequest = {
                  productsList: order.flatMap((o) => o.productsList),
                  discount: order.length > 0 ? order[0].discount : 0,
                };
                onSubmit(saleRequest);
              }}
            >
              Registrar Venta
            </Button>
            <Button
              variant="outline"
              className="border border-blue-300 text-blue-700 font-semibold py-2 rounded-xl hover:bg-blue-50"
              onClick={onClose}
            >
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
