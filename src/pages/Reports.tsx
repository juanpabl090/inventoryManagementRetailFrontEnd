import {
  editBarOptions,
  editLineOptions,
  editPieOptions,
} from "../types/components/Charts/ChartOptions";
import ChartComponent from "../components/ChartComponent";
import { BarChart3, LineChart, PieChartIcon } from "lucide-react";
import {
  handleTopProductsSales,
  salesOfEveryMonth,
} from "../utils/handleReportsData";
import { useSalesById } from "../hooks/sales";
import { useState } from "react";

export default function Reports() {
  const [date, setDate] = useState<{
    start: string;
    end: string;
  }>({
    start: "",
    end: "",
  });

  const handleStartDate = (value: string) => {
    setDate({ ...date, start: value });
    const startDate = new Date(value);
    const endDate = new Date(date.end);
    if (startDate > endDate) {
      throw new Error(
        "La fecha de inicio no puede ser mayor que la fecha final"
      );
    }
  };

  const handleEndDate = (value: string) => {
    setDate({ ...date, end: value });
    const endDate = new Date(value);
    const startDate = new Date(date.start);
    if (endDate < startDate) {
      throw new Error("La fecha final no puede ser menor que la fecha inicial");
    }
  };

  const { data } = useSalesById(date.start, date.end);
  const handleTopProductsSalesResponse = handleTopProductsSales(data);
  const res = salesOfEveryMonth(data);

  const LineOptions = editLineOptions({
    chart: { type: "line" },
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
    xaxis: {
      categories: [
        "Ene",
        "Feb",
        "Mar",
        "Abr",
        "May",
        "Jun",
        "Jul",
        "Ago",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
  });

  const PieOptions = editPieOptions({
    chart: { type: "pie" },
    series: handleTopProductsSalesResponse[1],
    labels: handleTopProductsSalesResponse[0],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      style: {
        colors: ["#fff"],
      },
    },
    tooltip: {
      theme: "dark",
    },
  });

  const BarOptions = editBarOptions({
    chart: { type: "bar" },
    series: [
      {
        name: "Sales",
        data: res[1],
      },
    ],
    xaxis: {
      categories: res[0],
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center w-full h-fit pb-4">
        <div className="flex flex-col gap-0">
          <h1 className="text-neutral-950 text-2xl font-bold">
            Gestión de Productos
          </h1>
          <p>Administra el catálogo de productos de tu empresa</p>
        </div>
        <div className="flex items-center">
          <p className="text-xl mr-2">Inicio:</p>
          <input
            type="date"
            name="date-start"
            id="date-start-id"
            className="border border-primary-500 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue- focus:border-blue-500 text-gray-700 bg-white mr-2"
            onChange={(value) => handleStartDate(value.target.value)}
          />

          <p className="text-xl mr-2">Final:</p>
          <input
            type="date"
            name="date-end"
            id="date-end-id"
            className="border border-error-500 w-full p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue- focus:border-blue-500 text-gray-700 bg-white"
            onChange={(value) => handleEndDate(value.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-3 gap-4 sm:grid-cols-1 sm:grid-rows-3 lg:grid-cols-2 lg:grid-rows-2">
        <div className="col-start-1 row-start-1">
          <ChartComponent
            Options={PieOptions}
            Icon={PieChartIcon}
            Title="Productos mas vendidos"
            Description="Visualiza que porcentaje de ventas que se ha llevado cada producto, en el intervalo de tiempo otorgado."
            height={350}
          />
        </div>

        <div className="col-start-1 row-start-2 lg:col-start-2 lg:row-start-1">
          <ChartComponent
            Options={BarOptions}
            Icon={BarChart3}
            Title="Resumen de ventas"
            Description="Visualiza la cantidad de ventas, en el intervalo de tiempo otorgado."
            height={350}
          />
        </div>

        <div className="col-start-1 row-start-3 lg:col-span-2 lg:row-start-2">
          <ChartComponent
            Options={LineOptions}
            Icon={LineChart}
            Title="Line Chart"
            Description="Visualize your data in a simple way using the
            @material-tailwind/react chart plugin."
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
