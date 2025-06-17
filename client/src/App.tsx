import "./App.css";
import { Outlet } from "react-router";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default App;
