import { useEffect, useState } from "react";
import axios from "axios";
import Title from "./Title";
import Content from "./Content";


const Testcase = ({inputUrlList, outputUrlList}) => {
  const [inputTestcaseList, setInputTestcaseList] = useState([]);
  const [outputTestcaseList, setOutputTestcaseList] = useState([]);
  useEffect(() => {
    if(inputUrlList && outputUrlList){
      inputUrlList.forEach((inputUrl) => {
        axios
          .get(inputUrl)
          .then((res) => {
            setInputTestcaseList((prevList) => [...prevList, res.data]);
          })
          .catch((error) => {
            alert.error('Error fetching input data:', error);
          });
      });

      outputUrlList.forEach((outputUrl) => {
        axios
          .get(outputUrl)
          .then((res) => {
            setOutputTestcaseList((prevList) => [...prevList, res.data]);
          })
          .catch((error) => {
            alert.error('Error fetching output data:', error);
          });
      });
    }
  }, [inputUrlList, outputUrlList]);

  return (
    <>
      {(inputUrlList === undefined || outputUrlList === undefined) ? "로딩 중" : inputTestcaseList.map((inputTestcase, index) => {
        return (
          <div className="flex flex-wrap justify-around" key={index}>
            <div className="w-1/2">
              <Title text={'예제 입력 ' + (index + 1)}></Title>
              <Content content={inputTestcase}></Content>
            </div>
            <div className="w-1/2">
              <Title text={'예제 출력 ' + (index + 1)}></Title>
              <Content content={outputTestcaseList[index]}></Content>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Testcase;