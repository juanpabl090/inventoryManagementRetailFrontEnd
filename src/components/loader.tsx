import { Store } from "lucide-react";

export default function Loader() {
  return (
    <div className="flex h-screen items-center justify-center flex-col gap-4 w-full">
      <div className="relative w-28 h-28 flex items-center justify-center">
        <div className="absolute w-28 h-28 border-8 border-gray-300 border-t-blue-400 rounded-full animate-spin"></div>
        <div className="h-10 w-10 rounded-xl bg-primary-600 flex items-center justify-center">
          <Store className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  );
}
