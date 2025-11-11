export const editLineOptions = (
  options: ApexCharts.ApexOptions
): ApexCharts.ApexOptions => {
  const lineOptions: ApexCharts.ApexOptions = {
    chart: {
      type: options.chart?.type || "line",
      height: options.chart?.height || 350,
      toolbar: {
        show: options.chart?.toolbar?.show || true,
      },
      zoom: {
        enabled: options.chart?.zoom?.enabled || true,
      },
      background: options.chart?.background || "transparent",
    },

    series: options.series || [],

    colors: options.colors,

    stroke: {
      curve: options.stroke?.curve || "smooth",
      width: options.stroke?.width || 5,
      ...options.stroke,
    },

    markers: {
      size: options.markers?.size || 5,
      colors: options.markers?.colors || ["#fff"],
      strokeColors: options.markers?.strokeColors || ["#3B82F6", "#F59E0B"],
      strokeWidth: options.markers?.strokeWidth || 2,
      hover: {
        size: options.markers?.hover?.size || 7,
      },
      ...options.markers,
    },

    grid: {
      borderColor: options.grid?.borderColor || "#0a0a0a",
      strokeDashArray: options.grid?.strokeDashArray || 5,
      row: {
        colors: options.grid?.row?.colors || ["#F9FAFB", "transparent"],
        opacity: options.grid?.row?.opacity || 0.5,
      },
      ...options.grid,
    },

    dataLabels: {
      enabled: options.dataLabels?.enabled || false,
      style: {
        colors: options.dataLabels?.style?.colors || ["#F9FAFB"],
        ...options.dataLabels?.style,
      },
      background: {
        enabled: options.dataLabels?.background?.enabled || false,
        borderRadius: options.dataLabels?.background?.borderRadius || 1,
        foreColor: options.dataLabels?.background?.foreColor || "#0a0a0a",
        opacity: options.dataLabels?.background?.opacity || 0.8,
        ...options.dataLabels?.background,
      },
      ...options.dataLabels,
    },

    xaxis: {
      categories: options.xaxis?.categories || [],
      title: {
        text: options.xaxis?.title?.text || "Meses",
        style: {
          color: options.xaxis?.title?.style?.color || "#374151",
          ...options.xaxis?.title?.style,
        },
      },
      axisTicks: {
        show: options.xaxis?.axisTicks?.show || false,
      },
      axisBorder: {
        show: options.xaxis?.axisBorder?.show || false,
      },
      labels: {
        style: {
          colors: options.xaxis?.labels?.style?.colors || "#6B7280",
          ...options.xaxis?.labels?.style,
        },
        ...options.xaxis?.labels,
      },
      ...options.xaxis,
    },

    yaxis: {
      title: {
        text:
          (Array.isArray(options.yaxis)
            ? options.yaxis[0]?.title?.text
            : options.yaxis?.title?.text) || "Ventas ($)",
        style: {
          color:
            (Array.isArray(options.yaxis)
              ? options.yaxis[0]?.title?.style?.color
              : options.yaxis?.title?.style?.color) || "#374151",
          ...(Array.isArray(options.yaxis)
            ? options.yaxis[0]?.title?.style
            : options.yaxis?.title?.style),
        },
      },
      labels: {
        formatter:
          (Array.isArray(options.yaxis)
            ? options.yaxis[0]?.labels?.formatter
            : options.yaxis?.labels?.formatter) ||
          ((val: number) => `$${val.toFixed(0)}`),
        style: {
          colors:
            (Array.isArray(options.yaxis)
              ? options.yaxis[0]?.labels?.style?.colors
              : options.yaxis?.labels?.style?.colors) || "#6B7280",
          ...(Array.isArray(options.yaxis)
            ? options.yaxis[0]?.labels?.style
            : options.yaxis?.labels?.style),
        },
        ...(Array.isArray(options.yaxis)
          ? options.yaxis[0]?.labels
          : options.yaxis?.labels),
      },
      ...options.yaxis,
    },

    tooltip: {
      theme: options.tooltip?.theme || "light",
      x: {
        show:
          options.tooltip?.x?.show !== undefined
            ? options.tooltip.x.show
            : true,
      },
      y: (() => {
        const tooltipY = Array.isArray(options.tooltip?.y)
          ? options.tooltip.y[0]
          : options.tooltip?.y;
        return {
          formatter:
            tooltipY?.formatter ||
            ((val: number) => `$${val.toLocaleString()}`),
          ...tooltipY,
        };
      })(),
      ...options.tooltip,
    },

    legend: {
      show: options.legend?.show !== undefined ? options.legend.show : true,
      position: options.legend?.position || "top",
      horizontalAlign: options.legend?.horizontalAlign || "right",
      markers: {
        size: options.legend?.markers?.size || 10,
        ...options.legend?.markers,
      },
      labels: {
        colors: options.legend?.labels?.colors || "#374151",
        ...options.legend?.labels,
      },
      ...options.legend,
    },

    responsive: options.responsive || [
      {
        breakpoint: 768,
        options: {
          chart: { height: 300 },
          legend: { position: "bottom" },
        },
      },
    ],

    ...options,
  };

  return lineOptions;
};

export const editBarOptions = (
  options: ApexCharts.ApexOptions
): ApexCharts.ApexOptions => {
  const barOptions: ApexCharts.ApexOptions = {
    chart: {
      type: options.chart?.type || "bar",
      height: options.chart?.height || 350,
      toolbar: {
        show:
          options.chart?.toolbar?.show !== undefined
            ? options.chart.toolbar.show
            : true,
      },
      background: options.chart?.background || "transparent",
      ...options.chart,
    },

    // datos a graficar
    series: options.series || [],

    // Colores de las series (o por punto si `distributed` está activo)
    colors: [
      "#1b4332",
      "#2d6a4f",
      "#344e41",
      "#3a5a40",
      "#40916c",
      "#588157",
      "#52b788",
      "#74c69d",
      "#95d5b2",
      "#a3b18a",
      "#b7e4c7",
      "#dad7cd",
    ],

    // Opciones de configuración de barras
    plotOptions: {
      bar: {
        horizontal: options.plotOptions?.bar?.horizontal || false,
        columnWidth: options.plotOptions?.bar?.columnWidth || "25%",
        distributed: options.plotOptions?.bar?.distributed || true,
        ...options.plotOptions?.bar,
      },
      ...options.plotOptions,
    },

    // Etiquetas sobre las barras
    dataLabels: {
      enabled:
        options.dataLabels?.enabled !== undefined
          ? options.dataLabels.enabled
          : true,
      style: {
        colors: options.dataLabels?.style?.colors || ["#111827"],
        ...options.dataLabels?.style,
      },
      background: {
        enabled:
          options.dataLabels?.background?.enabled !== undefined
            ? options.dataLabels.background.enabled
            : true,
        foreColor: options.dataLabels?.background?.foreColor || "#fff",
        opacity: options.dataLabels?.background?.opacity || 0.8,
        borderRadius: options.dataLabels?.background?.borderRadius || 5,
        ...options.dataLabels?.background,
      },
      ...options.dataLabels,
    },

    // Configuración del eje X
    xaxis: {
      categories: options.xaxis?.categories || [],
      title: {
        text: options.xaxis?.title?.text || "Meses",
        style: {
          color: options.xaxis?.title?.style?.color || "#374151",
          ...options.xaxis?.title?.style,
        },
      },
      labels: {
        style: {
          colors: options.xaxis?.labels?.style?.colors || "#6B7280",
          ...options.xaxis?.labels?.style,
        },
        ...options.xaxis?.labels,
      },
      ...options.xaxis,
    },

    // Configuración del eje Y
    yaxis: {
      title: {
        text:
          (Array.isArray(options.yaxis)
            ? options.yaxis[0]?.title?.text
            : options.yaxis?.title?.text) || "Ventas ($)",
        style: {
          color:
            (Array.isArray(options.yaxis)
              ? options.yaxis[0]?.title?.style?.color
              : options.yaxis?.title?.style?.color) || "#374151",
          ...(Array.isArray(options.yaxis)
            ? options.yaxis[0]?.title?.style
            : options.yaxis?.title?.style),
        },
      },
      labels: {
        formatter:
          (Array.isArray(options.yaxis)
            ? options.yaxis[0]?.labels?.formatter
            : options.yaxis?.labels?.formatter) || ((val: number) => `$${val}`),
        style: {
          colors:
            (Array.isArray(options.yaxis)
              ? options.yaxis[0]?.labels?.style?.colors
              : options.yaxis?.labels?.style?.colors) || "#6B7280",
          ...(Array.isArray(options.yaxis)
            ? options.yaxis[0]?.labels?.style
            : options.yaxis?.labels?.style),
        },
        ...(Array.isArray(options.yaxis)
          ? options.yaxis[0]?.labels
          : options.yaxis?.labels),
      },
      ...options.yaxis,
    },

    // Tooltips (al pasar el mouse)
    tooltip: {
      theme: options.tooltip?.theme || "light",
      y: (() => {
        const tooltipY = Array.isArray(options.tooltip?.y)
          ? options.tooltip.y[0]
          : options.tooltip?.y;
        return {
          formatter: tooltipY?.formatter || ((val: number) => `$${val}`),
          ...tooltipY,
        };
      })(),
      ...options.tooltip,
    },

    // Leyenda del gráfico
    legend: {
      show: options.legend?.show !== undefined ? options.legend.show : true,
      position: options.legend?.position || "top",
      horizontalAlign: options.legend?.horizontalAlign || "right",
      markers: {
        size: options.legend?.markers?.size || 10,
        ...options.legend?.markers,
      },
      labels: {
        colors: options.legend?.labels?.colors || "#374151",
        ...options.legend?.labels,
      },
      ...options.legend,
    },

    // Configuración de la cuadrícula (grid)
    grid: {
      borderColor: options.grid?.borderColor || "#E5E7EB",
      strokeDashArray: options.grid?.strokeDashArray || 4,
      row: {
        colors: options.grid?.row?.colors || ["#F9FAFB", "transparent"],
        opacity: options.grid?.row?.opacity || 0.5,
        ...options.grid?.row,
      },
      ...options.grid,
    },

    // Configuración responsiva
    responsive: options.responsive || [
      {
        breakpoint: 768,
        options: {
          chart: { height: 300 },
          plotOptions: {
            bar: {
              columnWidth: "35%",
            },
          },
          legend: { position: "bottom" },
        },
      },
    ],

    // Añadir cualquier otra opción que se pase pero no esté definida arriba
    ...options,
  };

  return barOptions;
};

export const editPieOptions = (
  options: ApexCharts.ApexOptions
): ApexCharts.ApexOptions => {
  const pieOptions: ApexCharts.ApexOptions = {
    chart: {
      type: options.chart?.type || "pie",
      height: options.chart?.height || 350,
      width: options.chart?.width || "100%",
      toolbar: {
        show:
          options.chart?.toolbar?.show !== undefined
            ? options.chart.toolbar.show
            : true,
      },
      background: options.chart?.background || "transparent",
      ...options.chart,
    },

    // datos a graficar
    series: options.series || [],

    // Etiquetas de las series
    labels: options.labels || [],

    // Colores de las series
    colors: [
      "#0f172a",
      "#172554",
      "#1e3a8a",
      "#1e40af",
      "#1d4ed8",
      "#2563eb",
      "#3b82f6",
      "#1e5fce",
      "#1a56db",
      "#1c64f2",
      "#3b78e7",
      "#4a7de8",
      "#5d89e8",
      "#60a5fa",
      "#4f97f7",
      "#6ba4f8",
      "#7bb2f9",
      "#93c5fd",
      "#a6d1fd",
      "#b8dcfe",
      "#c7e2ff",
      "#d4e8ff",
      "#e1eeff",
    ],

    // Etiquetas sobre los segmentos
    dataLabels: {
      enabled:
        options.dataLabels?.enabled !== undefined
          ? options.dataLabels.enabled
          : false,
      style: {
        colors: options.dataLabels?.style?.colors || ["FF0000"],
        ...options.dataLabels?.style,
      },
      background: {
        enabled:
          options.dataLabels?.background?.enabled !== undefined
            ? options.dataLabels.background.enabled
            : false,
        foreColor: options.dataLabels?.background?.foreColor || "#fff",
        opacity: options.dataLabels?.background?.opacity || 0.8,
        borderRadius: options.dataLabels?.background?.borderRadius || 2,
        ...options.dataLabels?.background,
      },
      ...options.dataLabels,
    },

    // Leyenda del gráfico
    legend: {
      show: options.legend?.show !== undefined ? options.legend.show : true,
      position: options.legend?.position || "left",
      horizontalAlign: options.legend?.horizontalAlign || "left",
      markers: {
        size: options.legend?.markers?.size || 10,
        ...options.legend?.markers,
      },
      labels: {
        colors: options.legend?.labels?.colors || "#374151",
        ...options.legend?.labels,
      },
      ...options.legend,
    },

    // Tooltips (al pasar el mouse)
    tooltip: {
      theme: options.tooltip?.theme || "#fff",
      y: {
        formatter:
          (Array.isArray(options.tooltip?.y)
            ? options.tooltip.y[0]?.formatter
            : options.tooltip?.y?.formatter) || ((val: number) => `${val}%`),
        ...(Array.isArray(options.tooltip?.y)
          ? options.tooltip.y[0]
          : options.tooltip?.y),
      },
      ...options.tooltip,
    },

    // Configuración del gráfico de pie
    plotOptions: {
      pie: {
        ...(options.plotOptions?.pie?.donut &&
        typeof options.plotOptions?.pie?.donut === "object"
          ? { donut: options.plotOptions.pie.donut }
          : {}),
        customScale: options.plotOptions?.pie?.customScale || 1,
        dataLabels: {
          offset: options.plotOptions?.pie?.dataLabels?.offset || 0,
          ...options.plotOptions?.pie?.dataLabels,
        },
        ...options.plotOptions?.pie,
      },
      ...options.plotOptions,
    },

    // Configuración responsiva
    responsive: options.responsive || [
      {
        breakpoint: 480,
        options: {
          chart: { height: 300 },
          legend: { position: "bottom" },
        },
      },
    ],

    // Añadir cualquier otra opción que se pase pero no esté definida arriba
    ...options,
  };

  return pieOptions;
};
