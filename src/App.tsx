import AppRoute from "./router/AppRoutes";
import "./styles/styles.css";
import LeftMenu from "./layouts/LeftMenu";
import Nav from "./layouts/Nav";
import { AuthContext } from "./context/authContext/authContext";
import { useContext } from "react";

export default function App() {
  const auth = useContext(AuthContext);

  if (!auth?.accessToken) {
    return <AppRoute />;
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="sticky top-0 z-40 w-full">
        <Nav />
      </div>
      <div className="flex flex-1 ">
        <div className="max-w-7xl flex-shrink-0">
          <LeftMenu />
        </div>
        <main className="flex flex-col bg-neutral-100 w-screen p-5">
          <AppRoute />
        </main>
      </div>
    </div>
  );
}
