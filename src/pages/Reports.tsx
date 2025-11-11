import {
  editBarOptions,
  editLineOptions,
  editPieOptions,
} from "../types/components/Charts/ChartOptions";
import ChartComponent from "../components/ChartComponent";
import { BarChart3, LineChart, PieChartIcon } from "lucide-react";
import { handleTopProductsSales } from "../utils/handleReportsData";
import { useSalesById } from "../hooks/sales";

export default function Reports() {
  const { data } = useSalesById();

  const results = handleTopProductsSales(data);

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
    series: results[1],
    labels: results[0],
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
        data: [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
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

  return (
    <div>
      <div className="flex justify-between items-center w-full h-fit pb-4">
        <div className="flex flex-col gap-0">
          <h1 className="text-neutral-950 text-2xl font-bold">
            Gestión de Productos
          </h1>
          <p>Administra el catálogo de productos de tu empresa</p>
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-3 gap-4 sm:grid-cols-1 sm:grid-rows-3 lg:grid-cols-2 lg:grid-rows-2">
        <div className="col-start-1 row-start-1">
          <ChartComponent
            Options={PieOptions}
            Icon={PieChartIcon}
            Title="Productos mas vendidos"
            Description="Visualiza que porcentaje de ventas se ha llevado cada producto"
            height={350}
          />
        </div>

        <div className="col-start-1 row-start-2 lg:col-start-2 lg:row-start-1">
          <ChartComponent
            Options={BarOptions}
            Icon={BarChart3}
            Title="Line Chart"
            Description="Visualize your data in a simple way using the
            @material-tailwind/react chart plugin."
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
