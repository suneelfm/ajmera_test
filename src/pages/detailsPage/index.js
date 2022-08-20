/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import axios from "axios";
import CustomTable from "../../components/customTable";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
export default function DetailsPage() {
  const [options, setoptions] = useState();
  const [data, setdata] = useState([]);
  const [selectedOption, setselectedOption] = useState();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const headers = [
    { label: "Name", id: "name" },
    { label: "Created", id: "created" },
    { label: "Edited", id: "edited" },
  ];
  const getOptionsList = async () => {
    axios
      .get("https://swapi.dev/api")
      .then((res) => {
        setoptions(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOptionsList();
  }, []);

  useEffect(() => {
    if (options) {
      setselectedOption(Object.keys(options)[0]);
    }
  }, [options]);

  const handleDropdownSelection = () => {
    if (options) {
      axios.get(options[selectedOption]).then((res) => {
        setdata(res.data.results);
      });
    }
  };

  useEffect(() => {
    handleDropdownSelection();
  }, [selectedOption]);

  return (
    <Grid>
      <Autocomplete
        options={options ? Object.keys(options) : []}
        value={options ? Object.keys(options)[0] : []}
        renderInput={(params) => (
          <TextField {...params} label="Select Option" />
        )}
        onChange={(e, newValue) => setselectedOption(newValue)}
        className="dropDown"
        renderOption={(props, option) => <li {...props}>{option}</li>}
      />
      <CustomTable
        rows={data}
        headers={headers}
        onClickRow={(data) => {
          dispatch({ type: "data", data });
          navigate("/details");
        }}
      />
    </Grid>
  );
}
