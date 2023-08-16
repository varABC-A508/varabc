import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  ThemeProvider,
  createTheme,
} from "@mui/material";

import Title from "../../../../components/ide/Problem/Title";
import Content from "../../../../components/ide/Problem/Content";
import Testcase from "../../../../components/ide/Problem/Testcase";

const theme = createTheme({
  palette: {
    primary: {
      main: "#323543",
    },
    secondary: {
      main: "#3C4051",
    },
  },
});

const ProblemDetailedInfo = ({ problemData, problemContent, problemInputContent, problemOutputContent }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="mb-3 bg-primaryDark">
        <Accordion sx={{borderRadius:'6px'}}>
          <AccordionSummary expandIcon="V" sx={{ bgcolor: "primary.main", color: 'white' }}>
            <Typography>문제 설명 보기</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: "secondary.main", color: 'white' }}>
            <div className="p-4">
              <Title text="문제 설명"></Title>
              <Content content={problemContent}></Content>
              <Title text="입력"></Title>
              <Content content={problemInputContent}></Content>
              <Title text="출력"></Title>
              <Content content={problemOutputContent}></Content>
              <Testcase
                inputUrlList={problemData.testCaseInputList}
                outputUrlList={problemData.testCaseOutputList}
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </ThemeProvider>
  );
};

export default ProblemDetailedInfo;
