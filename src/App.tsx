import { RouterProvider } from "react-router-dom";
import router from "./router";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}
