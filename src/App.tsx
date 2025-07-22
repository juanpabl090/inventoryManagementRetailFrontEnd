import LeftMenu from "./components/LeftMenu";
import Nav from "./components/Nav";

import "./styles/styles.css";

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col">
      <div className="w-full">
        <Nav />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <div className="w-64 flex-shrink-0">
          <LeftMenu />
        </div>
        <main className="flex-1 p-4 overflow-auto bg-neutral-100">
          <div className="flex flex-col justify-start">
            <h1 className="text-neutral-950 text-base font-bold">Dashboard</h1>
          </div>
        </main>
      </div>
    </div>
  );
}
