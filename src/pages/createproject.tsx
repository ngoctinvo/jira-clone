import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Container,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import { ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import CategoryCard from "../components/features/createProject/CategoryCard";
import HeaderOnlyLayout from "../containers/HeaderOnlyLayout";

type Props = {};

const categories = [
  {
    id: 1,
    projectCategoryName: "Web Application",
    image:
      "https://jira-clone-cybersoft.atlassian.net/s/azc3hx/b/8/4ed3dc70fdcb811c1329d1d2622dfe302379af79/_/download/resources/com.atlassian.jira.project-templates-plugin:project-templates-next-icons/icons/kanban.svg",
    description:
      "Visualize and advance your project forward using issues on a powerful board.",
  },
  {
    id: 2,
    projectCategoryName: "Desktop Application",
    image:
      "https://jira-clone-cybersoft.atlassian.net/s/azc3hx/b/8/4ed3dc70fdcb811c1329d1d2622dfe302379af79/_/download/resources/com.atlassian.jira.project-templates-plugin:project-templates-next-icons/icons/scrum.svg",
    description:
      "Visualize and advance your project forward using issues on a powerful board.",
  },
  {
    id: 3,
    projectCategoryName: "Mobile Application",
    image:
      "https://jira-clone-cybersoft.atlassian.net/s/azc3hx/b/8/4ed3dc70fdcb811c1329d1d2622dfe302379af79/_/download/resources/com.atlassian.jira.project-templates-plugin:project-templates-next-icons/icons/bug.svg",
    description:
      "Visualize and advance your project forward using issues on a powerful board.",
  },
];

const CreateProject = (props: Props) => {
  const schema = yup
    .object({
      ProjectName: yup.string().required(),
      Description: yup.string(),
    })
    .required();

  const {
    formState: { errors, isValid },
    control,
    trigger,
    handleSubmit,
    getValues,
    clearErrors,
  } = useForm({ resolver: yupResolver(schema) });

  const [activeStep, setActiveStep] = useState(0);
  const [category, setCategory] = useState(1);

  const handleNext = async () => {
    switch (activeStep) {
      case 0:
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        break;
      case 1:
        await trigger();
        console.log(getValues());
        if (getValues()["Project Name"] != "") {
          clearErrors();
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleChooseType = (id: number) => {
    console.log("chose: ", id);
    setCategory(id);
    handleNext();
  };

  const onSubmit = (data: any) => {
    console.log(data);
  };

  const steps = [
    {
      label: "Choose your type of project",
      description: `Plan, track and release great software. Get up and running
					quickly with templates that suit the way your team works.
					Plus, integrations for DevOps teams that want to connect
					work across their entire toolchain.`,
      elements: (
        <>
          <Box display="flex" flexDirection="column" alignItems="center">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                {...category}
                handleChooseType={handleChooseType}
              />
            ))}
          </Box>
        </>
      ),
    },
    {
      label: "Add project details",
      description:
        "You can change these details anytime in your project settings.",
      elements: (
        <>
          <Controller
            name="Project Name"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextField
                error={!!errors?.ProjectName}
                label="Project Name"
                helperText={errors?.ProjectName?.message as ReactNode}
                type="text"
                required
                sx={{ display: "block", my: 1 }}
                {...field}
              />
            )}
          />
          <Controller
            name="Description"
            defaultValue=""
            control={control}
            render={({ field }) => (
              <TextareaAutosize
                required
                minRows={5}
                style={{ minWidth: "100%", padding: 16 }}
                placeholder="Description"
                {...field}
              />
            )}
          />
        </>
      ),
    },
    {
      label: "Summary",
      description: `Take a final look at your incoming project`,
      elements: (
        <>
          <Box display="flex" flexDirection="column" alignItems="center">
            <CategoryCard
              key={category}
              {...categories[category - 1]}
              handleChooseType={handleChooseType}
            />
            <Typography variant="h6">
              Project Name: {getValues()["Project Name"]}
            </Typography>
            <Typography>Description: {getValues()["Description"]}</Typography>
          </Box>
        </>
      ),
    },
  ];

  return (
    <Container maxWidth="xl">
      <Typography variant="h5" mt={2}>
        Create Project
      </Typography>

      <Box onSubmit={handleSubmit(onSubmit)}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel
                optional={
                  index === 2 ? (
                    <Typography variant="caption">Last step</Typography>
                  ) : null
                }
              >
                {step.label}
              </StepLabel>
              <StepContent>
                <Typography variant="caption">{step.description}</Typography>
                {step.elements && step.elements}
                {index >= 1 && (
                  <Box sx={{ mb: 2 }}>
                    <div>
                      <Button
                        type="submit"
                        variant="contained"
                        onClick={handleNext}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        {index === steps.length - 1 ? "Finish" : "Continue"}
                      </Button>
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                )}
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography>All steps completed - you&apos;re finished</Typography>
            <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
              Reset
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

CreateProject.getLayout = (page: ReactNode) => (
  <HeaderOnlyLayout>{page}</HeaderOnlyLayout>
);
export default CreateProject;
