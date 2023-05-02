import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import TestCard from "../TestCard/TestCard";
import getAllTests from "../../utils/getAllTests";
import getOneTest from "../../utils/getOneTest";
import SingleTest from "../SingleTest/SingleTest";

export default function TestList() {
  const [singleTestModal, setSingleTestModal] = useState(null);
  const [testList, setTestList] = useState([]);


  const getSingleTest = async (id) => {
    setSingleTestModal(await getOneTest(id));
    localStorage.setItem("currentTestId", id);
  };

  const updateTestList = async () => {
    setTestList(await getAllTests());
  };

  // useEffect(() => {
  //   updateTestList();
  // });


  useEffect(() => {
    updateTestList();
    console.log("testList", testList);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testList.length]);

  useEffect(() => {}, [testList.length]);

  return (
    <Stack
      display={"flex"}
      flexDirection={"row"}
      gap={"35px"}
      flexWrap={"wrap"}
      justifyContent={"center"}
    >
      {testList &&
        testList.map((test) => (
          <div key={test.id} onClick={() => getSingleTest(test.id)}>
            <TestCard title={test.title} testId={test.id} />
          </div>
        ))}

      {singleTestModal && (
        <SingleTest
          singleTestModal={singleTestModal}
          setSingleTestModal={setSingleTestModal}
        />
      )}
    </Stack>
  );
}
