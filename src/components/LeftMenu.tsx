import {
  Package,
  FolderOpen,
  Tag,
  Truck,
  ShoppingCart,
  TrendingUp,
  BarChart3,
  type LucideIcon,
  Menu,
} from "lucide-react";
import { useState } from "react";

interface menuItem {
  icon: LucideIcon;
  label: string;
}

export default function LeftMenu() {
  const [open, setOpen] = useState<boolean | boolean>(false);
  const [ActiveItem, setActiveItem] = useState<string>("");

  const menuItems: menuItem[] = [
    {
      icon: Package,
      label: "Products",
    },
    {
      icon: FolderOpen,
      label: "categories",
    },
    {
      icon: Tag,
      label: "productTypes",
    },
    {
      icon: Truck,
      label: "suppliers",
    },
    {
      icon: ShoppingCart,
      label: "purchases",
    },
    {
      icon: TrendingUp,
      label: "sales",
    },
    {
      icon: BarChart3,
      label: "reports",
    },
  ];

  const handlePage = (label: string) => {
    setActiveItem(label);
    console.log(label);
  };

  return (
    <div className="h-full">
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden fixed top-4 right-4 z-40 p-2 rounded-md bg-neutral-50 dark:bg-gray-700"
      >
        <Menu strokeWidth={1} />
      </button>
      <aside
        id="default-sidebar"
        className={`fixed inset-0 h-screen w-full md:relative md:h-full md:w-64 bg-white shadow-md transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-30`}
        aria-label="Sidebar"
      >
        <div className="h-full px-5 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {menuItems.map(({ icon: Icon, label }) => (
              <li key={label}>
                <a
                  href="#"
                  onClick={() => handlePage(label)}
                  className={`flex items-center py-2 text-gray-900 rounded-lg group ${
                    ActiveItem === label
                      ? "bg-primary-50 border border-primary-200 hover:bg-primary-200 text-primary-500 font-bold"
                      : "text-gray-900 hover:bg-gray-200 "
                  }`}
                >
                  <span className="mr-4">
                    <Icon strokeWidth={ActiveItem === label ? 2 : 1} />
                  </span>
                  <span className="ms-3">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
