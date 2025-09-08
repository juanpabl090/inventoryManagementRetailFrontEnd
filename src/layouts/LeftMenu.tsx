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
  LogOut,
} from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "../components/Button";
import { Link } from "react-router";
import { AuthContext } from "../context/authContext/authContext";

interface menuItem {
  icon: LucideIcon;
  label: string;
}

export default function LeftMenu() {
  const [open, setOpen] = useState<boolean | boolean>(false);
  const [ActiveItem, setActiveItem] = useState<string>("");
  const auth = useContext(AuthContext);

  const menuItems: menuItem[] = [
    {
      icon: Package,
      label: "Products",
    },
    {
      icon: FolderOpen,
      label: "Categories",
    },
    {
      icon: Tag,
      label: "ProductTypes",
    },
    {
      icon: Truck,
      label: "Suppliers",
    },
    {
      icon: ShoppingCart,
      label: "Purchases",
    },
    {
      icon: TrendingUp,
      label: "Sales",
    },
    {
      icon: BarChart3,
      label: "Reports",
    },
  ];

  const handlePage = (label: string) => {
    setOpen(false);
    setActiveItem(label);
  };

  const handleLogOut = () => {
    auth?.logout();
  };

  return (
    <div className="h-full">
      <Button
        type="button"
        className="md:hidden fixed top-4 right-4 z-40 p-2 rounded-md bg-neutral-50 dark:bg-gray-700"
      >
        <Menu onClick={() => setOpen(!open)} strokeWidth={1} />
      </Button>
      <aside
        id="default-sidebar"
        className={`fixed inset-0 h-screen w-full md:relative md:h-full md:w-64 bg-white shadow-md transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 z-30`}
        aria-label="Sidebar"
      >
        <div className="h-full px-5 py-4 overflow-y-auto">
          <ul className="space-y-2 font-medium">
            {menuItems.map(({ icon: Icon, label }) => {
              return (
                <li key={label}>
                  <Link
                    to={label}
                    onClick={() => handlePage(label)}
                    className={`flex items-center py-2 text-gray-900 rounded-lg group ${
                      ActiveItem === label
                        ? "bg-primary-50 border border-primary-200 hover:bg-primary-200 text-primary-500 font-bold"
                        : "text-gray-900 hover:bg-gray-200 "
                    }`}
                  >
                    <span className="mr-4">
                      <Icon strokeWidth={ActiveItem ? 2 : 1} className="ml-5" />
                    </span>
                    <span className="ms-3">{label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <ul className="my-3 font-medium">
            <li
              onClick={handleLogOut}
              className="text-gray-900 hover:bg-gray-200"
            >
              <div className="flex items-center py-2 rounded-lg group">
                <span className="mr-4">
                  <LogOut strokeWidth={1} className="ml-5" />
                </span>
                <span className="ms-3">Log Out</span>
              </div>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
