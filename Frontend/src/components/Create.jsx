import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import FTextField from "./forms/FTextField";
import FDatePickerField from "./forms/FDatePickerField";
import FSelectField from "./forms/FSelectField";
import FMultilineField from "./forms/FMultilineField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import Dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FMultiSelectField from "./forms/FMultiSelectField";

const Create = () => {

  // states
  const [projectmanager, setProjectManager] = useState();
  const [employees, setEmployees] = useState();
  const [loading, setLoading] = useState(true);

  const hardcoded_options = [
    { id: "", name: "None" },
    { id: "Open", name: "Open" },
    { id: "In progress", name: "In progress" },
    { id: "Completed", name: "Completed" },
  ];

  const getData = () => {
    AxiosInstance.get(`projectmanager/`).then((response) => {
      if (response.status === 200) {
        setProjectManager(response.data);
        console.log(response.data);
      }
    });

    AxiosInstance.get(`employees/`).then((response) => {
      if (response.status === 200) {
        setEmployees(response.data);
        setLoading(false);
        console.log(response.data);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const navigate = useNavigate();

  const defaultValues = {
    name: "",
    status: "",
    comments: "",
  };

  const schema = yup.object({
    name: yup.string().required("Name is required"),
    projectmanager: yup.string().required("Project Manager is required"),
    employees: yup.array().min(1, "Pick at least 1 option from the list"),
    status: yup.string().required("Status is required"),
    commnets: yup.string(),
    start_date: yup.date().required("Start date is required"),
    end_date: yup
      .date()
      .required("End date is required")
      .min(yup.ref("start_date"), "End date must be after start date"),
  });

  const { handleSubmit, reset, control } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  const submission = (data) => {
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD");
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD");

    AxiosInstance.post(`project/`, {
      name: data.name,
      projectmanager: data.projectmanager,
      employees: data.employees,
      status: data.status,
      comments: data.comments,
      start_date: StartDate,
      end_date: EndDate,
    }).then((response) => {
      if (response.status === 200) {
        navigate("/");
        reset();
      }
    });
  };

  return (
    <div>
      {loading ? (
        <div>Loading</div>
      ) : (
        <form onSubmit={handleSubmit(submission)}>
          <Box
            sx={{
              display: "flex",
              width: "100%",
              backgroundColor: "#00003f",
              marginBottom: "10px",
            }}
          >
            <Typography sx={{ marginLeft: "20px", color: "white" }}>
              Create Records
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
                justifyContent: "space-around",
                marginBottom: "40px",
              }}
            >
              <FTextField
                name="name"
                label="Name"
                control={control}
                placeholder="Provide a project name"
                width={"30%"}
              />

              <FDatePickerField
                label="Start Date"
                name="start_date"
                control={control}
                width={"30%"}
              />

              <FDatePickerField
                label="End Date"
                name="end_date"
                control={control}
                width={"30%"}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-around" }}>
              <FMultilineField
                name="comments"
                label="Comments"
                control={control}
                placeholder="Provide project comments"
                width={"30%"}
              />

              <FSelectField
                control={control}
                label="Status"
                name="status"
                width={"30%"}
                options={hardcoded_options}
              />

              <FSelectField
                control={control}
                label="Project Manager"
                name="projectmanager"
                width={"30%"}
                options={projectmanager}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                marginTop: "25px",
              }}
            >
              <FMultiSelectField
                control={control}
                name="employees"
                label="Employees"
                width={"30%"}
                options={employees}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <Button variant="contained" type="submit" sx={{ width: "30%" }}>
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
};

export default Create;
