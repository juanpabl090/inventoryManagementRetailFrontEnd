import LeftMenu from "./layouts/LeftMenu";
import Nav from "./layouts/Nav";

import "./styles/styles.css";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <div className="w-full">
        <Nav />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="max-w-7xl flex-shrink-0">
          <LeftMenu />
        </div>
        <main className="flex flex-col p-4 overflow-auto bg-neutral-100">
          <h1 className="text-neutral-950 text-base font-bold">Dashboard</h1>
          <div className="flex-wrap xs:flex-row md:lg:flex md:lg:flex-col justify-start">
          </div>
        </main>
      </div>
    </div>
  );
}
