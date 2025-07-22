import { Store } from "lucide-react";

export default function Nav() {
  return (
    <>
      <nav className="flex items-center bg-white h-16 m-0">
        <div className="mx-64 flex items-center space-x-3">
          <div className="h-10 w-10 rounded-xl bg-primary-600 flex items-center justify-center">
            <Store className="h-6 w-6 text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-[20px] font-semibold text-neutral-900">
              Retail
            </span>
            <span className="text-[14px] text-neutral-500">
              Sistema de Gestión de Inventario
            </span>
          </div>
        </div>
      </nav>
    </>
  );
}
