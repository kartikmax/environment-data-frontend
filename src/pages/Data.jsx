import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { LineChart } from "@mui/x-charts";
import ListIcon from "../components/ListIcon";
// import Avatar from "@mui/material";
import PageviewIcon from "@mui/icons-material/Pageview";
import FolderIcon from "@mui/icons-material/Folder";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Person from "../assets/test_img.png";
import { cyan, green, orange, pink } from "@mui/material/colors";

const Item = styled(Paper)(({ theme, ht }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(2),
  textAlign: "center",
  // color: "",
  height: ht,
  alignItems: "center",
  justifyContent: "center",
}));

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Page A",
  "Page B",
  "Page C",
  "Page D",
  "Page E",
  "Page F",
  "Page G",
];

function Data() {
  return (
    <>
    
      <Typography variant="h4">Static Data </Typography>
      <Typography variant="h4"> coming soon </Typography>
      <Box xs={{ flexGrow: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={4}>
            <Item ht={200}>
              <Grid container alignItems="center" style={{ padding: 20 }}>
                <Grid item xs={8}>
                  <Typography variant="body1">Congratulations John</Typography>
                  <Typography variant="body2">Best Seller</Typography>
                  <Typography variant="h4">$ 48.9k</Typography>
                  <Button variant="contained" color="success">
                    View Sales
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <img src={Person} alt="john doe" width={100} />
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={8}>
            <Item ht={200}>
              <Stack spacing={4}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h4">Statistics</Typography>
                  <Typography variant="body2">A minute ago</Typography>
                </Stack>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  style={{ height: "10vh" }}
                >
                  <div style={{ display: "flex", flex: 1 }}>
                    <Avatar sx={{ bgcolor: green[500] }} variant="rounded">
                      <PageviewIcon />
                    </Avatar>
                  </div>

                  <div style={{ display: "flex", flex: 1 }}>
                    <Avatar sx={{ bgcolor: orange[300] }} variant="rounded">
                      <PageviewIcon />
                    </Avatar>
                  </div>
                  <div style={{ display: "flex", flex: 1 }}>
                    <Avatar sx={{ bgcolor: pink[200] }} variant="rounded">
                      <AssignmentIcon />
                    </Avatar>
                  </div>
                  <div style={{ display: "flex", flex: 1 }}>
                    <Avatar sx={{ bgcolor: cyan[300] }} variant="rounded">
                      <FolderIcon />
                    </Avatar>
                  </div>
                </Stack>
              </Stack>
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item ht={400}>
              {" "}
              <LineChart
                width={600}
                height={400}
                series={[
                  { data: pData, label: "Start Year" },
                  { data: uData, label: "End Year" },
                ]}
                xAxis={[{ scaleType: "point", data: xLabels }]}
              />{" "}
            </Item>
          </Grid>

          <Grid item xs={5}>
            <Item ht={400}>
              <ListIcon />
            </Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default Data;
