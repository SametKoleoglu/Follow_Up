import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import FTextField from "./forms/FTextField";
import FDatePickerField from "./forms/FDatePickerField";
import FSelectField from "./forms/FSelectField";
import FMultilineField from "./forms/FMultilineField";
import { useForm } from "react-hook-form";
import AxiosInstance from "./Axios";
import Dayjs from "dayjs";
import { useNavigate, useParams } from "react-router-dom";
import FMultiSelectField from "./forms/FMultiSelectField";

const Edit = () => {
  // states

  const Myparam = useParams();
  const MyId = Myparam.id;

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
      }
    });

    AxiosInstance.get(`employees/`).then((response) => {
      if (response.status === 200) {
        setEmployees(response.data);
        console.log(response.data);
      }
    });

    AxiosInstance.get(`project/${MyId}`).then((response) => {
      if (response.status === 200) {
        setValue("name", response.data.name);
        setValue("status", response.data.status);
        setValue("employees", response.data.employees);
        setValue("projectmanager", response.data.projectmanager);
        setValue("comments", response.data.comments);
        setValue("start_date", Dayjs(response.data.start_date));
        setValue("end_date", Dayjs(response.data.end_date));
        setLoading(false);
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

  const { handleSubmit, reset, setValue, control } = useForm({ defaultValues });

  const submission = (data) => {
    const StartDate = Dayjs(data.start_date["$d"]).format("YYYY-MM-DD");
    const EndDate = Dayjs(data.end_date["$d"]).format("YYYY-MM-DD");

    AxiosInstance.put(`project/${MyId}/`, {
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
        <div>Loading...</div>
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
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <FMultiSelectField
                label="Employees"
                name="employees"
                control={control}
                width={"30%"}
                options={employees}
              />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                marginTop: "40px",
              }}
            >
              <Button variant="contained" type="submit" sx={{ width: "100%" }}>
                Submit
              </Button>
            </Box>
          </Box>
        </form>
      )}
    </div>
  );
};

export default Edit;
