import { Card, List, type ChipProps } from "@material-tailwind/react";
import { Plus, Trash, type LucideIcon } from "lucide-react";
import { useEffect, useState, type ChangeEvent } from "react";
import { usePostSales } from "../hooks/sales/usePostSales.Register";
import { useProducts } from "../hooks/products";
import ListItemCart from "../components/ListItemCart";
import PageHeader from "../layouts/PageHeader";
import RegisterSale from "../layouts/RegisterSale";
import type { Product, SaleDto } from "../types/models/index";
import useAlert from "../hooks/alert/useAlert";

const alertConfig = {
  GET_EMPTY: {
    id: 1,
    title: "No hay productos",
    message: "La lista de productos está vacia",
    type: "Warning",
  },
  GET_SUCCESS: {
    id: 2,
    title: "Productos cargados",
    message: "Los productos se han cargado correctamente",
    type: "Success",
  },
  GET_ERROR: {
    id: 3,
    title: "Error al cargar los productos",
    message: "Los productos no se han podido cargar, intentalo de nuevo",
    type: "Error",
  },
} as const;

export interface chipWithHover extends ChipProps {
  hoverText: string;
}

export interface IcardItem {
  name: string;
  Icon: LucideIcon;
  chips: chipWithHover[];
}

export default function Sales() {
  const { data, isError, isSuccess } = useProducts();
  const { showAlert } = useAlert();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cartList, setCartList] = useState<IcardItem[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [productToSale, setProductToSale] = useState<SaleDto[]>([]);
  const {
    error: PostSaleError,
    isSuccess: PostSaleIsSuccess,
    mutate: PostSaleMutate,
    reset: PostSaleReset,
  } = usePostSales();

  const productToCardItem = (product: Product): IcardItem => ({
    name: product.name,
    Icon: Plus,
    chips: [
      {
        value: product.stock,
        variant: "filled",
        color: "red",
        size: "sm",
        hoverText: "Productos disponibles",
      },
      {
        value: `$${product.salePrice}`,
        variant: "ghost",
        color: "green",
        size: "sm",
        hoverText: "Precio del producto",
      },
    ],
  });

  useEffect(() => {
    if (data) {
      setFilteredProducts(data);
    }
  }, [data]);

  useEffect(() => {
    if (PostSaleIsSuccess) {
      setIsOpen(false);
      setCartList([]);
      setProductToSale([]);
    }
  }, [PostSaleIsSuccess]);

  useEffect(() => {
    if (isError) {
      showAlert({
        message: alertConfig.GET_ERROR.message,
        title: alertConfig.GET_ERROR.title,
        type: alertConfig.GET_ERROR.type,
      });
    } else if (isSuccess) {
      if (!data || data.length === 0) {
        showAlert({
          message: alertConfig.GET_EMPTY.message,
          title: alertConfig.GET_EMPTY.title,
          type: alertConfig.GET_EMPTY.type,
        });
      } else {
        showAlert({
          message: alertConfig.GET_SUCCESS.message,
          title: alertConfig.GET_SUCCESS.title,
          type: alertConfig.GET_SUCCESS.type,
        });
      }
    }
    PostSaleReset();
    // Solo depende de la PRIMERA carga, no de filteredProducts ni mutaciones
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addToCart = (item: IcardItem) => {
    const newItem: IcardItem = {
      ...item,
      Icon: Trash,
    };
    setCartList((prevCartList) => {
      const exists = prevCartList.some(
        (cartItem) => cartItem.name === newItem.name
      );
      return exists ? prevCartList : [...prevCartList, newItem];
    });
    addProduct(1, item.name);
  };

  const removeFromCart = (item: IcardItem) => {
    setCartList((prevCartList) =>
      prevCartList.filter((cartItem) => cartItem !== item)
    );
    removeProduct(item.name);
  };

  const addProduct = (quantity: number, name: string): void => {
    setProductToSale((prev) => {
      if (prev.length === 0) {
        return [
          {
            productsList: [{ name, quantity }],
            discount: 0,
          },
        ];
      }

      return prev.map((order, index) => {
        if (index === 0) {
          const exists = order.productsList.some((p) => p.name === name);

          const updateProductList = exists
            ? order.productsList.map((p) =>
                p.name === name ? { ...p, quantity } : p
              )
            : [...order.productsList, { name, quantity }];

          return { ...order, productsList: updateProductList };
        }

        return order;
      });
    });
  };

  const removeProduct = (name: string) => {
    setProductToSale((prev) =>
      prev.map((order) => ({
        ...order,
        productsList: order.productsList.filter(
          (product) => product.name !== name
        ),
      }))
    );
  };

  const renderProducts = (data: Product[]) => {
    if (data.length === 0) {
      return <h1>No hay productos</h1>;
    }
    // Mapear los productos filtrados a IcardItem antes de renderizar
    return data.map((product, index) => {
      const item = productToCardItem(product);
      return (
        <ListItemCart
          key={index}
          {...item}
          itemData={item}
          onCLick={addToCart}
          showQuantityInput={false}
        />
      );
    });
  };

  const handleDiscountChange = (e: ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.target.value ?? 0);
    if (Number.isNaN(value)) value = 0;
    if (value < 0) value = 0;
    if (value > 100) value = 100;

    setProductToSale((prev) => {
      if (prev.length === 0) {
        return [
          {
            productsList: [],
            discount: value,
          },
        ];
      }

      return prev.map((order, index) =>
        index === 0 ? { ...order, discount: value } : order
      );
    });
  };

  const handleIsOpen = () => setIsOpen(true);
  const handleOnClose = () => setIsOpen(false);

  if (PostSaleError) {
    return (
      <div className="flex justify-center items-center text-2xl text-neutral-900 font-semibold w-full h-full">
        <p className="text-center">{PostSaleError.message}</p>
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        data={data ?? []}
        extractName={(e) => e.name}
        handleIsOpen={handleIsOpen}
        onResults={setFilteredProducts}
        buttonLabel="Registrar Venta"
        title="Gestión de Ventas"
        description="Registra las ventas realizadas a clientes"
      />
      <RegisterSale
        isOpen={isOpen}
        onClose={handleOnClose}
        order={productToSale}
        productsData={data ?? []}
        onSubmit={PostSaleMutate}
      />
      <div className="grid gap-6 lg:grid-cols-3 mt-5">
        {/* Lista de productos */}
        <div className="lg:col-span-2 rounded-lg h-[calc(100vh-260px)] shadow-md">
          <Card className="h-full flex flex-col pb-5">
            <div className="m-5">
              <h1 className="text-2xl text-neutral-900">
                Productos Disponibles
              </h1>
              <p className="text-base">
                Selecciona productos para agregar a la venta
              </p>
            </div>
            <List className="overflow-y-auto flex-1 border-y border-neutral-400 rounded-md">
              {renderProducts(filteredProducts)}
            </List>
          </Card>
        </div>
        {/* Carrito */}
        <div className="space-y-4 rounded-lg h-[calc(100vh-260px)] shadow-md">
          <Card className="h-full flex flex-col">
            <div className="m-5">
              <h1 className="text-2xl text-neutral-900">Carrito de venta</h1>
              <p className="text-base">
                {cartList.length} productos •{" "}
                {productToSale.map((list) => {
                  let quantity = 0;
                  list.productsList.map((product) => {
                    quantity += product.quantity;
                  });
                  return quantity;
                })}{" "}
                unidades
              </p>
            </div>
            <List className="flex flex-col gap-4 overflow-y-auto flex-1 items-stretch min-h-[120px] max-h-[calc(100vh-400px)] border-y border-neutral-400 rounded-md">
              {cartList.map((item, index) => (
                <ListItemCart
                  key={index}
                  {...item}
                  itemData={item}
                  onCLick={removeFromCart}
                  showQuantityInput={true}
                  onChange={addProduct}
                />
              ))}
            </List>
            <div className="m-5">
              <p className="text-base">agregar descuento? (%)</p>
              <input
                className="rounded-md border-solid border border-neutral-500 flex flex-col sm:flex-row items-stretch w-full min-w-0 focus:ring-2 focus:border-primary-400 focus:outline-none"
                type="number"
                name="discount"
                id="discund-id"
                min={0}
                max={100}
                step={1}
                placeholder="0"
                value={productToSale[0]?.discount ?? ""}
                onChange={handleDiscountChange}
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* inline function para la lista de prodctos seleccionados, useSate para agregarlos a una lista, useEffect para renderizarlos */
