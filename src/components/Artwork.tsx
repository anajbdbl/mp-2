import styled from "styled-components";
import {Painting} from "../interfaces/Art.ts";

const AllPaintings=styled.div`
    display: flex;
    flex-flow: row wrap;    
    justify-content: space-evenly;
    gap: 20px;
    padding: 20px;
    background-color: #f5f5f5;
`;

const SinglePainting=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    padding: 15px;
    background: white;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
    transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
    img {
        width: 100%;
        height: auto;
        border-radius: 8px;
        object-fit: cover;
    }

    h1 {
        font-size: 1.2rem;
        font-weight: 600;
        color: #333;
        margin: 10px 0;
    }

    h2 {
        font-size: 1rem;
        font-weight: 500;
        color: #666;
        margin: 5px 0;
    }

    p {
        font-size: 0.9rem;
        color: #444;
    }
`;

export default function Artwork(props : { data:Painting[] } ){
    return (
        <AllPaintings>
            {
                props.data.map((painting: Painting) =>
                    <SinglePainting key={painting.objectID}>
                        <img src={painting.primaryImage} alt={`image of ${painting.title}`} />
                        <h1>{painting.title}</h1>
                        <h2>{painting.artistDisplayName}</h2>
                        <p>{painting.artistDisplayBio}</p>
                        <p>{painting.objectDate}</p>
                    </SinglePainting>
                )
            }
        </AllPaintings>
    );
}
