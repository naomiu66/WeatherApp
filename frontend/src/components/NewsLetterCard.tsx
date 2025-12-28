import styled from "styled-components";
import type { ExtendedCardProps } from "../types/components/ExtendedCardProps";

const NewsLetterCard = ({ text, title, variant = "black" }: ExtendedCardProps) => {
  return (
    <StyledWrapper variant={variant}>
      <div className="card">
        <span className="card__title">{title}</span>
        <p className="card__content">{text}</p>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ variant: "black" | "pink" }>`
  .card {
    width: 350px;
    padding: 25px;
    background: ${({ variant }) => (variant === "pink" ? "#c71175" : "#fff")};
    border: 6px solid #000;
    box-shadow: 12px 12px 0 #000;
    transition: transform 0.3s, box-shadow 0.3s;
    min-height: 200px;
    max-height: 500px; 
    overflow-y: auto; 
  }

  .card:hover {
    transform: translate(-5px, -5px);
    box-shadow: 17px 17px 0 #000;
  }

  .card__title {
    font-size: 28px;
    font-weight: 900;
    color: #000;
    text-transform: uppercase;
    margin-bottom: 15px;
    display: block;
    position: relative;
    overflow: hidden;
  }

  .card__title::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 90%;
    height: 3px;
    background-color: #000;
    transform: translateX(-100%);
    transition: transform 0.3s;
  }

  .card:hover .card__title::after {
    transform: translateX(0);
  }

  .card__content {
    font-size: 16px;
    line-height: 2;
    font-weight: 700;
    color: ${({ variant }) => (variant === "pink" ? "#000" : "#000")};
  }
`;

export default NewsLetterCard;
