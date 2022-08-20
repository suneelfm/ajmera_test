import React from "react";
import { useSelector } from "react-redux";
import { Grid } from "@mui/material";

export default function CompleteDetailsPage() {
  const data = useSelector((state) => state.dataReducer);

  return (
    <Grid container>
      <Grid item xs={3}>
        {Object.keys(data.data).map((key) => (
          <Grid>
            <b style={{ margin: "10px" }}>{key}:</b>
            {data.data[key]}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}
