import { Store } from "lucide-react";

export default function Nav() {
  return (
    <nav className="flex items-center bg-white h-16 border-b-2 border-neutral-200 w-full px-4 sm:px-6 lg:px-8">
      <div className="flex items-center space-x-3 w-full max-w-7xl mx-auto">
        <div className="h-10 w-10 rounded-xl bg-primary-600 flex-shrink-0 flex items-center justify-center">
          <Store className="h-6 w-6 text-white" />
        </div>
        <div className="flex flex-col leading-none">
          <span className="sticky top-0 z-40 text-lg sm:text-[20px] font-semibold text-neutral-900">
            Retail
          </span>
          <span className="sticky top-0 z-40 text-xs sm:text-[14px] text-neutral-500">
            Sistema de Gestión de Inventario
          </span>
        </div>
      </div>
    </nav>
  );
}
