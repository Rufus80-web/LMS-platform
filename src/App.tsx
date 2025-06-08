import { StrictMode } from "react";
import { router } from "./route/route";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import "./assets/css/fontawesome/css/all.css";
import ReduxStore from "./Redux/configureStrore";

function App() {
  return (
    <StrictMode>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={ReduxStore}>
          <RouterProvider router={router} />
        </Provider>
      </LocalizationProvider>
    </StrictMode>
  );
}

export default App;
