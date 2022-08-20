import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

export default function CompleteDetailsPage() {
  const data = useSelector((state) => state.dataReducer);

  return (
    <Grid container p={3}>
      <Grid
        container
        justifyContent={"center"}
        mb={3}
        fontWeight="bold"
        fontSize={"calc(2px + 5vmin)"}
      >
        Complete Details
      </Grid>
      <Grid item xs={12}>
        {Object.keys(data.data).map((key) => (
          <Grid container>
            <Grid item xs={2}>
              <b style={{ margin: "10px" }}>{key}</b>
            </Grid>
            <Grid item xs={1}>
              <b>:</b>
            </Grid>
            <Grid item xs={9} sx={{ wordBreak: "break-word" }}>
              {data.data[key]}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
