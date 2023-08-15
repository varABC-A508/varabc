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

const ProblemDetailedInfo = ({ problemData }) => {
  return (
    <ThemeProvider theme={theme}>
      <div className="mb-3 bg-primaryDark">
        <Accordion sx={{borderRAdius:'6px'}}>
          <AccordionSummary expandIcon="V" sx={{ bgcolor: "primary.main", color: 'white' }}>
            <Typography>문제 설명 보기</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: "secondary.main", color: 'white' }}>
            <div className="p-4">
              <div className="text-[24px] mb-1 font-bold whitespace-pre-wrap">
                {problemData.problemNo}. {problemData.problemTitle}
              </div>
              <div className="text-[20px] mb-5 font-bold">
                {problemData.problemLevel}
              </div>
              <Title text="문제 설명"></Title>
              <Content content={problemData.problemContent}></Content>
              <Title text="입력"></Title>
              <Content content={problemData.problemInputContent}></Content>
              <Title text="출력"></Title>
              <Content content={problemData.problemOutputContent}></Content>
              <Testcase
                inputUrlList={problemData.testCaseInputPublicList}
                outputUrlList={problemData.testCaseOutputPublicList}
              />
            </div>
          </AccordionDetails>
        </Accordion>
      </div>
    </ThemeProvider>
  );
};

export default ProblemDetailedInfo;
