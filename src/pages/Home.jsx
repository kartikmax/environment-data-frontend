import React from "react";
import {
  Card,
  Grid,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  colors,
} from "@mui/material";
import {
  BarChart,
  PieChart,
  Gauge,
  SparkLineChart,
  barElementClasses,
} from "@mui/x-charts";
import CounterWidget from "../components/CounterWidget";
import SpeedIcon from "@mui/icons-material/Speed";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NumbersIcon from "@mui/icons-material/Numbers";
import { useState } from "react";
import { BASE_URL } from "../constants";
import { useEffect } from "react";
import axios from "axios";
import { tidy, summarize, deviation } from "@tidyjs/tidy";

// const BASE_URL = 'http://localhost:3000'

const counterData1 = {
  intentsity: {
    number: "N.A",
    title: "Intensity",
    backgroundColor: "#009688",
    icon: <SpeedIcon sx={{ fontSize: 55 }} />,
  },
  likelihood: {
    number: "N.A",
    title: "Likelihood",
    backgroundColor: "#ec407a",
    icon: <ThumbUpIcon sx={{ fontSize: 55 }} />,
  },
  relevance: {
    number: "N.A",
    title: "Relevance",
    backgroundColor: "#9c27b0",
    icon: <BorderColorIcon sx={{ fontSize: 55 }} />,
  },
  counter: {
    number: 5,
    title: "Counter",
    backgroundColor: "#03a9f4",
    icon: <NumbersIcon sx={{ fontSize: 55 }} />,
  },
};

function Home() {
  const [counterData, setCounterData] = useState(counterData1);
  // const [connection,setConnection ] = useState(false)
  const [dataLimit, setDataLimit] = useState(100);
  const [sector, setSector] = useState("Energy");
  const [sectorData, setSectorData] = useState([6, 6, 6, 6, 16]);
  const [sectorDataLabels, setSectorDataLabels] = useState([
    "gas",
    "oil",
    "consumption",
    "oil",
    "oil",
  ]);
  // const [intensity,setIntensity] = useState('Energy')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/data?limit=${dataLimit}`);
        // console.log(response.data);
        // console.log(
        //   tidy(response.data, summarize({ stdDev: deviation("intensity") }))
        // );

        // setCounterData({...counterData1,intentsity.})

        setCounterData((prevData) => ({
          ...prevData,
          intentsity: {
            ...prevData.intentsity,
            number: tidy(
              response.data,
              summarize({ stdDev: deviation("intensity") })
            )[0].stdDev.toFixed(3),
          },
          likelihood: {
            ...prevData.likelihood,
            number: tidy(
              response.data,
              summarize({ stdDev: deviation("likelihood") })
            )[0].stdDev.toFixed(3),
          },
          relevance: {
            ...prevData.relevance,
            number: tidy(
              response.data,
              summarize({ stdDev: deviation("relevance") })
            )[0].stdDev.toFixed(3),
          },
        }));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [dataLimit,sector]);

  useEffect(() => {
    const fetchDataIntensity = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/sector`, {
          params: { sector, limit: dataLimit },
        });
        // console.log(response.data.map((x) => x.topic));
        setSectorData(response.data.map((x) => x.intensity));
        setSectorDataLabels(response.data.map((x) => x.topic));
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchDataIntensity();
  }, [dataLimit, sector]);

  const handleChange = (event) => {
    // console.log(event.target.value);

    setDataLimit(event.target.value);
    // console.log(dataLimit);
  };

  const handleChangeIntensity = (event) => {
    // console.log(event.target.value);
    setSector(event.target.value);
  };

  return (
    <>
      <Typography variant="h4">Overall Data</Typography>
      <Grid
        container
        direction="column"
        gap={2}
        // style={{ border: "1px solid" }}
      >
        <Grid container xs={6} item justifyContent="space-between">
          {Object.keys(counterData).map((key, index) => {
            const data = counterData[key];
            return (
              <Grid item xs={2.5} key={index}>
                <CounterWidget
                  number={data.title === "Counter" ? dataLimit : data.number}
                  title={data.title}
                  backgroundcolor={data.backgroundColor}
                >
                  {data.icon}
                </CounterWidget>
              </Grid>
            );
          })}
        </Grid>

        <Stack direction="row" sx={{ maxWidth: 500 }} gap={4}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Data Input</InputLabel>
            <Select
              // value={age}
              label="DataInput"
              onChange={handleChange}
            >
              {[10, 20, 50, 100, 200, 500, 1000].map((x, index) => {
                return (
                  <MenuItem key={index} value={x}>
                    {x}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel>Sector Input</InputLabel>
            <Select
              // value={age}
              label="IntensityInput"
              onChange={handleChangeIntensity}
            >
              {[
                "Energy",
                "Retail",
                "Manufacturing",
                "Financial services",
                "Government",
                "Information Technology",
                "Security",
              ].map((x, index) => {
                return (
                  <MenuItem key={index} value={x}>
                    {x}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Stack>
        <Grid container xs={6} item justifyContent="space-between">
          <Grid item xs={6.5}>
            <Card>
              <CardContent>Sector wise Intensities </CardContent>
              <BarChart
                height={290}
                margin={{ top: 10, bottom: 30, left: 50, right: 10 }}
                xAxis={[{ data: sectorDataLabels, scaleType: "band" }]}
                series={[{ data: sectorData, label: "Intensity" }]}
                width={750}
              />
            </Card>
          </Grid>
          <Grid item xs={5}>
            <Card
              style={{
                alignItems: "center",
                display: "flex",
                height: 350,
                justifyContent: "space-around",
                padding: 20,
              }}
            >
              <CardContent> Variables</CardContent>

              <PieChart
                series={[
                  {
                    data: [
                      {
                        id: 0,
                        value: counterData.intentsity.number,
                        label: "Intensity",
                      },
                      {
                        id: 1,
                        value: counterData.likelihood.number,
                        label: "Likelihood",
                      },
                      {
                        id: 2,
                        value: counterData.relevance.number,
                        label: "Relevance",
                      },
                    ],
                  },
                ]}
                width={400}
                height={250}
                // margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            </Card>
          </Grid>
        </Grid>

        <Grid container xs={6} item justifyContent="space-between">
          <Grid item xs={3}>
            <Card style={{ padding: 10 }}>
              <Stack
                alignItems="center"
                direction="row"
                justifyContent="space-between"
                spacing={3}
              >
                <Gauge width={100} height={100} value={dataLimit / 10} />
                <Typography variant="h4">Tasks</Typography>
                <Typography variant="subtitle">Counts</Typography>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Card style={{ padding: 10 }}>
              <Stack direction="row" sx={{ width: "100%" }} alignItems="center">
                <Box sx={{ flexGrow: 1 }}>
                  <SparkLineChart
                    data={[1, 4, 2, 5, 7, 2, 4, 6]}
                    height={100}
                    width={300}
                  />
                </Box>
                <Typography variant="subtitle">Growth</Typography>
                <Box sx={{ flexGrow: 1 }}>
                  <SparkLineChart
                    plotType="bar"
                    data={[1, 4, 2, 5, 7, 2, 4, 6]}
                    height={100}
                    width={300}

                    // colors="#ac89af"
                  />
                </Box>
                <Typography variant="subtitle">Sales</Typography>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
