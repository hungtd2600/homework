import axios from "axios";
import { useToast } from "const/toast";
import { ToastProvider } from "@/components/elements/ToastProvider";
import { Box, Button, Input, styled, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

const TodoPage = (): ReactElement => {
  const { error, success } = useToast();
  const router = useRouter();
  const urlApi = "https://jsonplaceholder.typicode.com/todos";
  const [url, setUrl] = useState<string>(urlApi);

  const handleGetTodo = async () => {
    try {
      await axios.get(url);
      success("Get data todo success");
    } catch (e) {
      error("Get data todo error");
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => router.push("/")}>
        Home Page
      </Button>
      <StyledBox>
        <Typography variant="h3">Todo Page</Typography>
        <Input
          fullWidth
          defaultValue={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button variant="contained" onClick={handleGetTodo}>
          Get Todo
        </Button>
      </StyledBox>
    </>
  );
};

TodoPage.getLayout = function getLayout(page: ReactElement) {
  return <ToastProvider>{page}</ToastProvider>;
};

export default TodoPage;

const StyledBox = styled(Box)(
  () => `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 40px;
  `
);
