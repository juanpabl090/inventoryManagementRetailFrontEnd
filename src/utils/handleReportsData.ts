import type { salesByDate } from "../types/models";

export const handleTopProductsSales = (
  salesByDate: salesByDate[] | undefined
): [string[], number[]] => {
  const data = new Map<string, number>();
  const labes: string[] = [];
  const series: number[] = [];

  salesByDate?.map(({ saleDetailsResponseDto }) => {
    saleDetailsResponseDto.map(({ product, quantity }) => {
      const quantityAccumulated = data.get(product.name) ?? 0;
      data.set(product.name, quantity + quantityAccumulated);
    });
  });

  data.forEach((value, key) => {
    labes.push(key);
    series.push(value);
  });
  series.sort((a, b) => b - a);
  return [labes, series];
};

export const salesOfEveryMonth = (
  salesByDate: salesByDate[] | undefined
): [string[], number[]] => {
  const months = new Map<string, number>();
  salesByDate?.map(({ amount, date: dateMonth }) => {
    const date = new Date(dateMonth);
    const mes = new Intl.DateTimeFormat("es-ES", { month: "long" }).format(
      date
    );
    const prev = months.get(mes) ?? 0;
    const total = Number((prev + amount).toFixed(2));
    months.set(mes, total);
  });
  const labels: string[] = [];
  const series: number[] = [];
  months.forEach((value, key) => {
    labels.push(key);
    series.push(value);
  });
  series.sort((a, b) => b - a);
  return [labels, series];
};
