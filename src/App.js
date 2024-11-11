import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/home";
import Camera from "./routes/camera";
import Light from "./routes/light";
import Air from "./routes/air";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import Layout from "./components/layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/camera",
        element: <Camera />,
      },
      {
        path: "/light",
        element: <Light />,
      },
      {
        path: "/air",
        element: <Air />,
      },
    ],
  },
]);

const GlobalStyles = createGlobalStyle`
  ${reset}
  * {
    box-sizing: border-box;
  }
  body {   
    background-color: #0d050f;
    font-family: "Nunito", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
  }

`;

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <>
      <GlobalStyles />
      <Wrapper>
        <RouterProvider router={router} />
      </Wrapper>
    </>
  );
}

export default App;
