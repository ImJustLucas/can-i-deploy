import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import dayjs from "dayjs";

export default function Date() {
  const router = useRouter();

  const [date] = useState<string>(router.query.date as string);
  const [response, setResponse] = useState<boolean | null>(null);

  const askApi = async () => {
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

  useEffect(() => {
    askApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <IndexContainer>
      <TitleContainer>
        Can i <span>deploy ?</span>
      </TitleContainer>
      <ResponseContainer>
        <span className="response">{response ? "Yes" : "No"}</span>
        <br />
        <span>{dayjs(date).format("DD/MM/YYYY")}</span>
      </ResponseContainer>
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

const ResponseContainer = styled.div`
  color: #f9f9f9;
  font-size: 3rem;
  text-transform: uppercase;
  font-family: "Merienda", cursive;
  text-align: center;

  span.response {
    color: #ff8500;
  }
`;
