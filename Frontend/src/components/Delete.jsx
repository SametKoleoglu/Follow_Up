import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import AxiosInstance from "./Axios";
import { useNavigate, useParams } from "react-router-dom";

const Delete = () => {
  // states
  const [myData, setMyData] = useState();
  const [loading, setLoading] = useState(true);

  const Myparam = useParams();
  const MyId = Myparam.id;

  const getData = () => {
    AxiosInstance.get(`project/${MyId}`).then((response) => {
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

  const navigate = useNavigate();

  const submission = (data) => {
    AxiosInstance.delete(`project/${MyId}/`).then((response) => {
      if (response.status === 204) {
        navigate("/");
      }
    });
  };

  return (
    <div>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              backgroundColor: "#00003f",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ marginLeft: "20px", color: "white" }}>
              Delete Project : {myData.name}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              width: "100%",
              boxShadow: 3,
              padding: 4,
              flexDirection: "column",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "start",
                marginBottom: "40px",
              }}
            >
              Are you sure you want to delete this project? : {myData.name}
            </Box>

            <Box sx={{ width: "30%" }}>
              <Button
                variant="contained"
                onClick={submission}
                sx={{ width: "100%" }}
              >
                Delete Project
              </Button>
            </Box>
          </Box>
        </div>
      )}
    </div>
  );
};

export default Delete;
