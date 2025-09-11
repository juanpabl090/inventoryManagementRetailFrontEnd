import { Search } from "lucide-react";
import { useRef, useState, type ChangeEvent, type KeyboardEvent } from "react";

interface SearchBoxProps<T> {
  data: T[];
  onResults: (Filtered: T[]) => void;
  extractName: (item: T) => string;
}

export default function SearchBox<T>({
  data,
  onResults,
  extractName: extractName,
}: SearchBoxProps<T>) {
  const [query, setQuery] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const timeOutRef = useRef<number | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (timeOutRef.current !== null) {
      clearTimeout(timeOutRef.current);
    }

    timeOutRef.current = window.setTimeout(() => {
      if (value.trim() === "") {
        // Restaurar todos los datos si está vacío
        onResults(data);
      } else {
        const filtered = data.filter((item) =>
          extractName(item).toLowerCase().includes(value.toLowerCase())
        );
        onResults(filtered);
      }
    }, 300);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim() !== "") {
      setHistory((prev) =>
        prev.includes(query.trim()) ? prev : [query.trim(), ...prev.slice(0, 4)]
      );
    }
  };

  const handleHistoryClick = (term: string) => {
    setQuery(term);
    const filtered = data.filter((item) =>
      extractName(item).toLowerCase().includes(term.toLowerCase())
    );
    onResults(filtered);
  };

  return (
    <div className="relative bg-white rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <Search
        strokeWidth={1.5}
        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5"
      />
      <input
        autoComplete="false"
        name="searchBox"
        className="w-full peer z-10 px-6 py-4 rounded-xl outline-none duration-200 ring-2 ring-transparent focus:ring-primary-600 pl-10"
        placeholder="| Buscabas Algo?"
        value={query}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {history.length > 0 && (
        <div className="absolute w-full top-full mt-2 opacity-0 translate-y-2 focus-within:translate-y-0 peer-focus:opacity-100  peer-focus:pointer-events-auto transition-all duration-200 z-20 rounded-xl border border-gray-200 p-4 bg-white shadow-lg">
          <p className="font-semibold text-xs text-neutral-500 mb-2">
            ÚLTIMAS BÚSQUEDAS
          </p>
          <ul className="flex gap-2 flex-col">
            {history.map((term) => (
              <li
                key={term}
                onClick={() => handleHistoryClick(term)}
                className="px-2 cursor-pointer text-sm hover:bg-neutral-200 py-2 rounded-lg"
              >
                {term}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
