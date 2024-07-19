import { AppBar, CssBaseline, Toolbar, Typography } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Charts from "./pages/Charts";
import Data from "./pages/Data";
import Sidebar from "./components/Sidebar";
import Country from "./pages/Country";

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar>
            <Typography variant="h6" noWrap component="div">
              Livelihood Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        {/* here is drawer means sidebar hurray  */}
        <Sidebar />
        <main
          style={{
            padding: 20,
            background: "#eee",
            width: "95vw",
            height: "120vh",
          }}
        >
          <Toolbar />

          <Routes>
            <Route path="" element={<Home />} />
            <Route path="/charts" element={<Charts />} />
            {/* <Route path="/data" element={<Data />} /> */}
            <Route path="/country" element={<Country />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
