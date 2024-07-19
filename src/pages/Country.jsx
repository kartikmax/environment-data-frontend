import {
  Box,
  Card,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import { AgGridReact } from "ag-grid-react";
import { BASE_URL } from "../constants";
import { GeoJSONDataOfCountry, Countries } from "../constants";
import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import { useState, useEffect } from "react";

function Country() {
  const [country, setCountry] = useState("India");
  const [limit, setLimit] = useState(20);
  const [data, setData] = useState([]);

  const colDefs = [
    { field: "topic", flex: 1 },
    { field: "country", flex: 1 },
    { field: "region", flex: 1 },
    { field: "source", flex: 1 },
    { field: "title", flex: 4 },
  ];

  const defaultColDef = {
    flex: 1,
  };

  function onCountryClick(event) {
    // console.log("Clicked Country:", event.target.feature.properties.name);
    setCountry(event.target.feature.properties.name);
  }

  useEffect(() => {
    const fetchDataIntensity = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/country`, {
          params: { country, limit },
        });
        // console.log(response.data.map((x) => x.topic));
        // setData()

        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDataIntensity();
  }, [limit, country]);

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
  };

  const handleDataLimit = (event) => {
    setLimit(event.target.value);
  };

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", height: "70%" }}>
        <Grid container spacing={2} justifyContent="space-around">
          <Grid item xs={7} component={Card} style={{ padding: 10 }}>
            <MapContainer
              center={[0, 0]}
              zoom={1.5}
              style={{ height: "500px", width: "98%" }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <GeoJSON
                data={GeoJSONDataOfCountry}
                onEachFeature={(feature, layer) => {
                  layer.on({
                    click: onCountryClick,
                  });
                }}
              />
            </MapContainer>
          </Grid>
          <Grid item xs={3} component={Card}>
            <Stack spacing={3}>
              <Typography variant="h5">Current Country:</Typography>

              <Box>
                <InputLabel id="demo-select-small-label">Country </InputLabel>
                <FormControl sx={{ width: "80%" }}>
                  <Select
                    value={country}
                    onChange={handleChangeCountry}
                    size="small"
                  >
                    {Countries.map((country, index) => {
                      return (
                        <MenuItem value={country} key={index}>
                          {" "}
                          {country}{" "}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
              {/* <Typography variant="body1">{country}</Typography> */}
              <Typography variant="body1">
                You can select any type of choice either by clicking on the map
                or selecting on the select option
              </Typography>
              <Box>
                <InputLabel id="demo-select-small-label">
                  Data Limit{" "}
                </InputLabel>
                <FormControl sx={{ width: "80%" }}>
                  <Select value={limit} onChange={handleDataLimit} size="small">
                    {[10, 20, 50, 100, 200].map((num, index) => {
                      return (
                        <MenuItem value={num} key={index}>
                          {" "}
                          {num}{" "}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </div>
      {/* <Box sx={{ height: 400, width: "100%" }}> */}
      <div
        className={"ag-theme-quartz"}
        style={{ width: "100%", height: "100%" }}
      >
        <AgGridReact
          rowData={data}
          columnDefs={colDefs}
          defaultColDef={defaultColDef}
        />
      </div>
      {/* </Box> */}
    </>
  );
}
export default Country;
