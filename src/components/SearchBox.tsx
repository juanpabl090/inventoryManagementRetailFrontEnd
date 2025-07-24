import { useRef, useState, type ChangeEvent } from "react";

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState("");
  const timeOutRef = useRef<number | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (timeOutRef.current !== null) {
      clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = window.setTimeout(() => {
      onSearch(value);
    }, 300);
  };

  return (
    <>
      <div className="relative w-full">
        <input
          className="w-11/12 peer z-10 px-6 py-4 rounded-xl outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600"
          placeholder="Buscabas Algo?"
          value={query}
          onChange={handleInputChange}
        />
        <div className="absolute top-full mt-2 w-full opacity-0 translate-y-2 peer-focus:translate-y-0 peer-focus:opacity-100 pointer-events-none peer-focus:pointer-events-auto transition-all duration-200 z-20 rounded-xl border border-gray-200 p-4 bg-white shadow-lg">
          <div className="mb-4">
            <p className="font-semibold text-xs text-neutral-500">
              ULTIMAS BUSQUEDAS
            </p>
            <ul className="flex gap-2 flex-col mt-2">
              <li className="px-2 cursor-pointer text-sm hover:bg-neutral-200 py-2 rounded-lg">
                Something you've searched before
              </li>
              <li className="px-2 cursor-pointer text-sm hover:bg-neutral-200 py-2 rounded-lg">
                Something you've searched before
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
