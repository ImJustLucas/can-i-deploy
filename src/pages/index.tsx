import { useState } from "react";
import router from "next/router";
import styled from "styled-components";

import { Select, Button } from "@chakra-ui/react";

export default function Home() {
  const [response, setResponse] = useState<boolean | null>(null);
  const [date, setDate] = useState<string>("");

  const getSevenNextDays = () => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const setDateLink = (e: any) => {
    setDate(e.target.value);
  };

  const goToDatePage = () => {
    if (date === "") return;
    router.push(`/date/${date}`);
  };

  const askApi = async () => {
    const date = new Date().toISOString().slice(0, 10);

    try {
      const response = await fetch(
        `http://localhost:3000/api/canIDeploy?date=${date}`
      );
      const data = await response.json();
      setResponse(data.validated);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IndexContainer>
      <TitleContainer>
        Can i <span>deploy ?</span>
      </TitleContainer>
      <FormContainer>
        <Button colorScheme="orange" onClick={askApi}>
          Can i Deploy today ?
        </Button>
        <br />
        {response !== null && (
          <ResponseConatiner>
            <span>{response ? "Yes" : "No"}</span>
          </ResponseConatiner>
        )}
      </FormContainer>
      <hr />
      <FormContainer>
        <Select onChange={setDateLink} placeholder="Select a date">
          {getSevenNextDays().map((day, index) => (
            <option key={index} value={day.toISOString().slice(0, 10)}>
              {day.toISOString().slice(0, 10)}
            </option>
          ))}
        </Select>
        <br />
        <Button colorScheme="orange" onClick={goToDatePage}>
          Check
        </Button>
      </FormContainer>
    </IndexContainer>
  );
}

const IndexContainer = styled.div`
  background-color: #1b2021;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TitleContainer = styled.p`
  color: #ff8500;
  font-size: 3rem;
  text-transform: uppercase;
  font-family: "Merienda", cursive;
  color: #f9f9f9;

  span {
    color: #ff8500;
  }
`;

const ResponseConatiner = styled.p`
  color: #f9f9f9;
`;

const FormContainer = styled.div`
  width: 40%;
  margin: 2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
