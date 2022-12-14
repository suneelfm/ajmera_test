/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function CustomTable({ rows, headers, onClickRow }) {
  const [recordsPerPage, setrecordsPerPage] = useState("5");
  const [tableData, settableData] = useState([]);
  const [records, setrecords] = useState([]);
  const [pageNo, setpageNo] = useState(1);
  const [searchText, setsearchText] = useState("");

  useEffect(() => {
    settableData(rows);
  }, [rows]);

  useEffect(() => {
    const rowsCopy = [...tableData];
    setrecords(
      rowsCopy.splice(
        parseInt(recordsPerPage) * pageNo - parseInt(recordsPerPage),
        parseInt(recordsPerPage) * pageNo
      )
    );
  }, [tableData, recordsPerPage, pageNo]);

  const getSearchData = () => {
    const rowsCopy = [...rows];
    const filtered = [];
    rowsCopy?.forEach((item) => {
      const matched = headers?.filter((dtl) =>
        item[dtl?.id]?.toLowerCase()?.includes(searchText.toLowerCase())
      );
      if (matched?.length > 0) {
        filtered.push(item);
      }
    });

    settableData(filtered);
  };

  useEffect(() => {
    getSearchData();
  }, [searchText]);

  return (
    <Grid container>
      <Grid container px={2} justifyContent={"flex-end"}>
        <TextField
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setsearchText(e.target.value);
          }}
        />
      </Grid>
      <table className="detailstable">
        <thead>
          <tr>
            {headers?.map((header, index) => (
              <th key={index} className="tableCell">
                {header.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {records?.map((item, index) => (
            <tr
              key={index}
              onClick={() => onClickRow(item)}
              style={{ cursor: "pointer" }}
            >
              {headers?.map((header, ind) => (
                <td key={ind} className="tableCell">
                  {item[header?.id]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <Grid item container xs={12} mx={1}>
        <Grid item xs={6} container justifyContent={"start"}>
          <b>Total Records :</b> {rows?.length}
          <Grid mx={4} item>
            <b>Records per Page :</b>{" "}
            <select
              value={recordsPerPage}
              onChange={(e) => {
                setpageNo(1);
                setrecordsPerPage(e.target.value);
              }}
            >
              <option id={5}>5</option>
              <option id={10}>10</option>
              <option id={20}>20</option>
            </select>
          </Grid>
        </Grid>
        <Grid item xs={6} px={1} container justifyContent={"flex-end"}>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              pageNo > 1 && setpageNo(pageNo - 1);
            }}
          >
            {"<"}
          </span>
          <span className="pageNo">{pageNo}</span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              pageNo < Math.ceil(rows?.length / recordsPerPage) &&
                setpageNo(pageNo + 1);
            }}
          >
            {">"}
          </span>
        </Grid>
      </Grid>
    </Grid>
  );
}
