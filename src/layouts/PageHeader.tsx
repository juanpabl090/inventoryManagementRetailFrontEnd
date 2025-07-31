import { Button, SearchBox } from "../components";
import { Plus } from "lucide-react";

type Props<T> = {
  title: string;
  description: string;
  data: T[];
  onResults: (filtered: T[]) => void;
  extractName: (item: T) => string;
  handleIsOpen: () => void;
  buttonLabel?: string;
};

export default function PageHeader<T>({
  title,
  description,
  data,
  onResults,
  extractName,
  handleIsOpen,
  buttonLabel,
}: Props<T>) {
  return (
    <>
      <div className="flex justify-between items-center w-full pb-4">
        <div className="flex flex-col gap-0">
          <h1 className="text-neutral-950 text-2xl font-bold">{title}</h1>
          <p>{description}</p>
        </div>
        <div>
          <Button variant="solid" className="flex mr-5" onClick={handleIsOpen}>
            <Plus className="mr-3" />
            {buttonLabel}
          </Button>
        </div>
      </div>
      <div>
        <SearchBox<T>
          data={data ?? []}
          onResults={onResults}
          extractName={extractName}
        />
      </div>
    </>
  );
}
