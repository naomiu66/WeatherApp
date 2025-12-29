import styled from "styled-components";
import type { ContentContainerCardProps } from "../types/components/ContentContainerCardProps";

const ContentContainerCard = ({ title, children, variant = "black" }: ContentContainerCardProps) => {
  return (
    <StyledWrapper variant={variant}>
      <div className="container-card">
        <h2 className="section-title">{title}</h2>
        <div className="cards-container">{children}</div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div<{ variant: "black" | "pink" }>`
  margin: 20px 0;

  .container-card {
    padding: 25px;
    background: ${({ variant }) => (variant === "pink" ? "#c71175" : "#fff")};
    border: 6px solid #000;
  }

  .section-title {
    font-size: 24px;
    font-weight: 900;
    text-transform: uppercase;
    margin-bottom: 15px;
    border-bottom: 3px solid #212121;
    color: ${({ variant }) => (variant === "pink" ? "#c71175" : "#000")};
    text-align: left;
  }

  .cards-container {
    display: flex;
    flex-direction: column;
  }
`;

export default ContentContainerCard;
