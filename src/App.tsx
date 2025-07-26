import AppRoute from "./router/AppRoutes";
import LeftMenu from "./layouts/LeftMenu";
import Nav from "./layouts/Nav";

import "./styles/styles.css";

export default function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="w-full">
        <Nav />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="max-w-7xl flex-shrink-0">
          <LeftMenu />
        </div>
        <main className="flex flex-col overflow-auto bg-neutral-100 w-screen p-5">
          <AppRoute />
        </main>
      </div>
    </div>
  );
}
