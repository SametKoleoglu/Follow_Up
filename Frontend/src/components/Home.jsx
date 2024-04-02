import React, { useState, useMemo, useEffect } from "react";
import AxiosInstance from "./Axios";
import { MaterialReactTable } from "material-react-table";
import Dayjs from "dayjs";
import { Box, IconButton } from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";
import { Link } from "react-router-dom";


const Home = () => {

  // states
  const [myData, setMyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = () => {
    AxiosInstance.get(`project/`).then((response) => {
      if (response.status === 200) {
        setMyData(response.data);
        setLoading(false);
        console.log(response.data);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = useMemo(
    () => [
      {
        accessorKey: "name", //access nested data with dot notation
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "status",
        header: "Status",
        size: 150,
      },
      {
        accessorKey: "projectmanager", //normal accessorKey
        header: "Project Manager",
        size: 200,
      },
      {
        accessorKey: "comments", //normal accessorKey
        header: "Comments",
        size: 200,
      },
      {
        accessorFn: (row) => Dayjs(row.start_date).format("DD-MM-YYYY"),
        header: "Start Date",
        size: 150,
      },
      {
        accessorFn: (row) => Dayjs(row.end_date).format("DD-MM-YYYY"),
        header: "End Date",
        size: 150,
      },
    ],
    []
  );

  return (
    <div>
      {loading ? (
        <div style={{ textAlign: "center", alignSelf: "center" }}>
          Loading...
        </div>
      ) : (
        <MaterialReactTable
          columns={columns}
          data={myData}
          enableRowActions
          renderRowActions={({row}) => (
            <Box sx={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
              <IconButton color="secondary" component={Link} to={`edit/${row.original.id}`}>
                <EditIcon />
              </IconButton>
              <IconButton color="error" component={Link} to={`delete/${row.original.id}`}>
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
        />
      )}
    </div>
  );
};

export default Home;
