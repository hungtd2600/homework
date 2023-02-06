import axios from "axios";
import { useToast } from "const/toast";
import { ToastProvider } from "@/components/elements/ToastProvider";
import { Box, Button, Input, styled, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { ReactElement, useState } from "react";

const PostPage = (): ReactElement => {
  const { error, success } = useToast();
  const router = useRouter();
  const urlApi = "https://jsonplaceholder.typicode.com/posts";
  const [url, setUrl] = useState<string>(urlApi);

  const handleGetPost = async () => {
    try {
      await axios.get(url);
      success("Get data post success");
    } catch (e) {
      error("Get data post error");
    }
  };

  return (
    <>
      <Button variant="contained" onClick={() => router.push("/")}>
        Home Page
      </Button>
      <StyledBox>
        <Typography variant="h3">Post Page</Typography>
        <Input
          fullWidth
          defaultValue={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button variant="contained" onClick={handleGetPost}>
          Get Post
        </Button>
      </StyledBox>
    </>
  );
};

PostPage.getLayout = function getLayout(page: ReactElement) {
  return <ToastProvider>{page}</ToastProvider>;
};

export default PostPage;

const StyledBox = styled(Box)(
  () => `
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 40px;
  `
);
