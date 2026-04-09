import { Center, Spinner } from "@chakra-ui/react";
import { Suspense, lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Layout from "./pages/Layout";

const GameDetailPage = lazy(() => import("./pages/GameDetailPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "games/:slug",
        element: (
          <Suspense
            fallback={
              <Center py={10}>
                <Spinner size="xl" />
              </Center>
            }
          >
            <GameDetailPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
