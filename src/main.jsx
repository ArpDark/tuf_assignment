import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import SubmissionPage from './components/SubmissionPage.jsx';
import { createBrowserRouter, RouterProvider} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: "/submission",
    element: <SubmissionPage/>,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
