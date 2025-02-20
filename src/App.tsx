import { useState, useEffect } from 'react';
import './App.css';
import Artwork from "./components/Artwork.tsx";
import { Painting } from "./interfaces/Art.ts";
import styled from "styled-components";

const MainDiv = styled.div`
  width: 80vw;
  margin: auto;
  border: 5px darkgoldenrod solid;
  body {
  font-family: 'Poppins', sans-serif;
  color: #333; }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 15px;
  font-family: 'Poppins', sans-serif;
`;

const StyledInput = styled.input`
  width: 250px;
  padding: 10px 15px;
  font-size: 1rem;
  border: 2px solid #ccc;
  border-radius: 8px;
  margin: 15px;
  outline: none;
  transition: all 0.3s ease-in-out;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.1);
  background-color: white;
  color: #333;
`;

function App() {
  const [numTotal, setTotal] = useState(20);
  const [data, setData] = useState<Painting[]>([]);

  useEffect(() => {
      async function fetchData(): Promise<void> {
        const res = await fetch("https://collectionapi.metmuseum.org/public/collection/v1/search?isOnView=true&hasImages=true&q=*");
        const { objectIDs }: { objectIDs: number[] } = await res.json();

        if (objectIDs) {
          const selectedIDs = objectIDs.slice(0, numTotal);

          const paintingPromises = selectedIDs.map(async (objectID) => {
              const paintingRes = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`);
              return paintingRes.json();
          });

          const paintings = await Promise.all(paintingPromises);

          setData(paintings);
        }
      }

      fetchData()
        .then(() => console.log("Data fetched successfully"))
        .catch((e: Error) => console.log("There was the error: " + e));
  }, [numTotal]);

  return (
    <MainDiv>
      <Title> The Met Artwork Gallery </Title>
      <label> Select Number of Artworks for Display: </label>
      <StyledInput type="number" placeholder="Number of Artworks" value={numTotal} onChange={(e) => setTotal(Math.max(1, Number(e.target.value)))}/>
      <Artwork data={data}/>
    </MainDiv>
  );
}

export default App;
