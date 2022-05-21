import React, { useState } from "react";
import "./App.css";
import {
  Box,
  Container,
  createTheme,
  TextField,
  ThemeProvider,
} from "@mui/material";
import { Header } from "./Header";
import styled from "styled-components";
import Button from "@mui/material/Button";

const theme = createTheme({
  palette: {
    primary: {
      main: "#333",
    },
  },
});

const Bold = styled.span`
  font-family: Roboto;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
`;
const NotBold = styled.span`
  font-family: Roboto;
  font-size: 18px;
  line-height: 30px;

`;

function App() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<JSX.Element[]>();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth={"lg"}>
        <Header />

        {!output ? (
          <>
            <Box paddingTop={2}>
              <TextField
                label="Input"
                multiline
                rows={20}
                fullWidth={true}
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </Box>
            <Box
              justifyContent={"flex-end"}
              flexDirection={"row"}
              display={"flex"}
              paddingTop={1}
            >
              <Button
                variant={"contained"}
                onClick={() => {
                  const words = input.split(" ");

                  const out = words.map((word) => {
                    const howManyToBold = Math.ceil(word.length / 2);
                    const firstHalf = word.substring(0, howManyToBold);
                    const secondHalf = word.substring(
                      howManyToBold,
                      word.length
                    );
                    return (
                      <span>
                        <Bold>{firstHalf}</Bold>
                        <NotBold>{secondHalf}</NotBold>
                        <span> </span>
                      </span>
                    );
                  });

                  setOutput(out);
                }}
              >
                Fix the autism
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box display={'flex'} justifyContent={'center'} flexDirection={'row'} alignItems={'center'}>
              <Box paddingTop={2} whiteSpace={"pre-wrap"} maxWidth={300}>
                {output}
              </Box>

            </Box>
            <Box
              justifyContent={"flex-end"}
              flexDirection={"row"}
              display={"flex"}
              paddingTop={1}
            >
              <Button
                variant={"contained"}
                onClick={() => setOutput(undefined)}
              >
                Clear
              </Button>
            </Box>
          </>
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;
