import React from "react";
import PeopleIcon from "@mui/icons-material/People";
import { Grid, Paper, styled, Typography } from "@mui/material";
// import { textAlign } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme, backgroundColor }) => ({
  backgroundColor,
  padding: theme.spacing(3.3),
  textAlign: "center",
  color: "white",
  width: "inherit",
    // height:'20vh'
}));

// colors - #009688 ,#9c27b0 , #ec407a #03a9f4

function CounterWidget({ children, number, title, backgroundcolor }) {
  return (
    <StyledPaper backgroundColor={backgroundcolor}>
      <Grid container justifyContent="space-between">
        <Grid item xs={8}>
          <Typography textAlign="start" variant="h4">
            {number}
          </Typography>
          <Typography textAlign="start" variant="subtitle1">
            {title}
          </Typography>
        </Grid>
        <Grid container item xs={3} alignItems="center" justifyContent="center">
          {children}
        </Grid>
      </Grid>
    </StyledPaper>
  );
}

export default CounterWidget;
