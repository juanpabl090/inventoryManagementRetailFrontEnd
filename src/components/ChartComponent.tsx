import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import type { variant } from "@material-tailwind/react/types/components/typography";
import type { colors } from "@material-tailwind/react/types/generic";
import { type LucideProps } from "lucide-react";
import Chart from "react-apexcharts";

type Props = {
  cardHeaderFloated?: boolean | undefined;
  cardHeaderShadow?: boolean | undefined;
  cardHeaderColor?: colors | undefined;
  titleVariant?: variant | undefined;
  titleColor?: colors | undefined;
  descriptionVariant?: variant | undefined;
  descriptionColor?: colors | undefined;
  Options: ApexCharts.ApexOptions;
  height: string | number;
  Title: string;
  Description: string;
  Icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
};

export default function ChartComponent({
  cardHeaderFloated = false,
  cardHeaderShadow = false,
  cardHeaderColor,
  Icon,
  Title,
  titleVariant = "h4",
  titleColor,
  descriptionVariant = "paragraph",
  descriptionColor,
  Description,
  Options,
  height,
}: Props) {
  return (
    <Card className="shadow-md">
      <CardHeader
        floated={cardHeaderFloated}
        shadow={cardHeaderShadow}
        color={cardHeaderColor}
        className="flex flex-col gap-4 rounded-none md:flex-row md:items-center p-2"
      >
        <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
          <Icon strokeWidth={1.5} />
        </div>
        <div>
          <Typography variant={titleVariant} color={titleColor}>
            {Title}
          </Typography>
          <Typography
            variant={descriptionVariant}
            color={descriptionColor}
            className="max-w-sm font-normal"
          >
            {Description}
          </Typography>
        </div>
      </CardHeader>
      <CardBody className="px-2 pb-0">
        <Chart
          options={Options}
          series={Options.series}
          type={Options.chart?.type}
          height={height}
        />
      </CardBody>
    </Card>
  );
}
