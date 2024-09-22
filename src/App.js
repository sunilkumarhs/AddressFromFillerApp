import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./app/LoginPage";
import RegisterForm from "./app/RegisterForm";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
    },
    {
      path: "/registerForm",
      element: <RegisterForm />,
    },
  ]);

  return <RouterProvider router={appRouter} />;
};

export default App;
