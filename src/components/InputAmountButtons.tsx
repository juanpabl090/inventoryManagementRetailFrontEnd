import { Input, IconButton } from "@material-tailwind/react";
import { Minus, Plus } from "lucide-react";

type InputAmountButtonsProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};
export function InputAmountButtons({
  value,
  min = 0,
  max = Infinity,
  step = 1,
  onChange,
}: InputAmountButtonsProps) {
  const updateValue = (newVal: number) => {
    if (newVal < min || newVal > max) return;
    onChange(newVal);
  };

  return (
    <div className="w-32">
      <div className="relative w-full">
        <Input
          type="number"
          value={value}
          onChange={(e) => {
            const newValue = Number(e.target.value);
            updateValue(newValue);
          }}
          className="!border-t-blue-gray-200 placeholder:text-blue-gray-300 placeholder:opacity-100 focus:!border-t-gray-900 appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          labelProps={{
            className: "before:content-none after:content-none",
          }}
          containerProps={{
            className: "min-w-32",
          }}
        />
        <div className="absolute right-1 top-1 flex gap-0.5">
          <IconButton size="sm" onClick={() => updateValue(value - step)}>
            <Minus />
          </IconButton>
          <IconButton size="sm" onClick={() => updateValue(value + step)}>
            <Plus />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
