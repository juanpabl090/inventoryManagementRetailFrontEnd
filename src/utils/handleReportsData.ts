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

export const salesOfEveryMonth = () => {};
