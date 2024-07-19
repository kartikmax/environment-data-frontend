import { LineChart } from "@mui/x-charts/LineChart";
import {
  Card,
  Grid,
  Typography,
  MenuItem,
  Select,
  Box,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL,regions } from "../constants";

export default function Charts() {
  
  const [region, setRegion] = useState("World");
  const [data, setData] = useState([
    {
      id: "6635f61d94a3daa3e7c1d468",
      end_year: "",
      intensity: 6,
      sector: "",
      topic: "market",
      insight: "N-Hexane Market Hit at a CAGR of 5% by 2024 - PMR Report",
      url: "http://www.sbwire.com/press-releases/n-hexane-market-hit-at-a-cagr-of-5-by-2024-pmr-report-761520.htm",
      region: "World",
      start_year: "",
      impact: "",
      added: "January, 19 2017 00:55:54",
      published: "January, 18 2017 00:00:00",
      country: "",
      relevance: 2,
      pestle: "Economic",
      source: "SBWire",
      title:
        "Polymerization will remain top 3 end-users in global n-Hexane Market.",
      likelihood: 3,
    },
  ]);

  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
  };

  useEffect(() => {
    const fetchDataIntensity = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/region`, {
          params: { region },
        });
        console.log(response.data);
        setData(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDataIntensity();
  }, [region]);

  return (
    <Grid container gap={2}>
      <Grid item xs={7} component={Card}>
        <LineChart
          width={900}
          height={500}
          series={[
            { data: data.map((x) => x.intensity), label: "intensity" },
            { data: data.map((x) => x.likelihood), label: "likelihood" },
            { data: data.map((x) => x.relevance), label: "relevance" },
          ]}
          xAxis={[{ scaleType: "point", data: data.map((x) => x.pestle) }]}
        />
      </Grid>
      <Grid item xs={4} component={Card} sx={{ padding: 5 }}>
        <Typography variant="body1">
          You can select any type of region selecting on the select option
        </Typography>
        <Box>
          <InputLabel id="demo-select-small-label">Data Limit </InputLabel>
          <FormControl sx={{ width: "80%" }}>
            <Select value={region} onChange={handleChangeRegion} size="small">
              {regions.map((region, index) => {
                return (
                  <MenuItem value={region} key={index}>
                    {" "}
                    {region}{" "}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      </Grid>
    </Grid>
  );
}