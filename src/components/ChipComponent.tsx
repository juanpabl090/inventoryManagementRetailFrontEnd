import { type ChipProps } from "@material-tailwind/react";
import React from "react";
import type { chipWithHover } from "../pages/Sales";

type Props = {
  ChipElement: React.ForwardRefExoticComponent<
    ChipProps & React.RefAttributes<HTMLDivElement>
  >;
  chipProps: chipWithHover;
};

export default function ChipComponent({ ChipElement, chipProps }: Props) {
  return (
    <div className="group relative mr-2">
      <ChipElement {...chipProps} />
      <div className="w-max h-max hidden group-hover:block absolute top-12 left-0 p-2 bg-white border border-neutral-300 rounded shadow-md z-50">
        {chipProps.hoverText}
      </div>
    </div>
  );
}
