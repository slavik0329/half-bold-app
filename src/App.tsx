import React, { useState } from "react";
import "./App.css";
import {
  Box,
  Container,
  createTheme,
  TextField,
  ThemeProvider,
  Paper,
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
  font-size: 24px;
  line-height: 40px;
`;
const NotBold = styled.span`
  font-family: Roboto;
  font-size: 24px;
  line-height: 40px;

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
                  const paragraphs = input.split(/[\n]+/)

                  let final: JSX.Element[] = [];

                  for (const paragraph of paragraphs) {
                    const words = paragraph.split(/[\s]+/)

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

                    final = [...final, ...out, <span>{'\n\n'}</span>]
                  }



                  setOutput(final);
                }}
              >
                Fix the autism
              </Button>
            </Box>
          </>
        ) : (
          <>
            <Box display={'flex'} justifyContent={'center'} flexDirection={'row'} alignItems={'center'}>
              <Box paddingTop={2} whiteSpace={"pre-wrap"} maxWidth={360}>
                <Paper sx={{padding: 3, borderRadius: 2}} elevation={20} >
                  {output}
                </Paper>
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
