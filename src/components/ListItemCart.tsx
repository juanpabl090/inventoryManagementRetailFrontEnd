import {
  Chip,
  IconButton,
  ListItem,
  ListItemSuffix,
  ListItemPrefix,
  type ChipProps,
} from "@material-tailwind/react";
import ChipComponent from "./ChipComponent";
import { Minus, Plus, type LucideIcon } from "lucide-react";
import type { chipWithHover, IcardItem } from "../pages/Sales";
import { useState } from "react";

type Props = {
  name: string;
  Icon: LucideIcon;
  Chip?: React.ForwardRefExoticComponent<
    ChipProps & React.RefAttributes<HTMLDivElement>
  >;
  chips: chipWithHover[];
  onCLick?: (IcardItem: IcardItem) => void;
  itemData: IcardItem;
  onChange?: (quantity: number, name: string) => void;
  showQuantityInput: boolean;
};

export default function ListItemCart({
  Icon,
  name,
  Chip: CustomChip,
  chips,
  onCLick,
  itemData,
  onChange,
  showQuantityInput,
}: Props) {
  // si no mandan un Chip, usamos el de material-tailwind
  const ChipToRender = CustomChip ?? Chip;

  const [value, setValue] = useState(1);

  const handleChange = (newValue: number) => {
    if (newValue < 0) return; // evitar negativos
    setValue(newValue);
    onChange?.(newValue, name);
  };

  return (
    <ListItem
      ripple={false}
      className="border-solid border border-neutral-300 flex flex-col sm:flex-row items-stretch w-full min-w-0"
    >
      {showQuantityInput == true ? (
        <ListItemPrefix>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Botón - */}
            <button
              type="button"
              onClick={() => handleChange(value - 1)}
              className="p-1 rounded-md bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-red-400 transition"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-5 h-5" />
            </button>

            {/* Input number accesible */}
            <input
              type="number"
              value={value}
              onChange={(e) => handleChange(Number(e.target.value))}
              className="w-16 text-center border border-gray-400 rounded-md focus:ring-2 focus:ring-blue-400 focus:outline-none"
              min={0}
              id={`${name}-quantity`}
            />

            {/* Botón + */}
            <button
              type="button"
              onClick={() => handleChange(value + 1)}
              className="p-1 rounded-md bg-neutral-900 text-white focus:outline-none focus:ring-2 focus:ring-green-400 transition"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </ListItemPrefix>
      ) : null}
      <div className="flex flex-col flex-1 min-w-0">
        <p className="text-xl text-neutral-900 break-words">{name}</p>
        <div className="flex flex-row flex-wrap">
          {chips.map((chipProps, index) => (
            <ChipComponent
              key={index}
              ChipElement={ChipToRender}
              chipProps={chipProps}
            />
          ))}
        </div>
      </div>
      <ListItemSuffix className="flex items-center">
        <IconButton onClick={() => onCLick?.(itemData)}>
          <Icon width={20} color="white" />
        </IconButton>
      </ListItemSuffix>
    </ListItem>
  );
}
