import React from "react";
import { Container } from "./Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { PrimaryButton } from "../components/Button";

function App({ items }) {
  const changeOrder = (arrayStateName) => {
    console.log("iii", arrayStateName);
  };
  const handleClick = () => {
    changeOrder("test")
  };
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Container items={items} />
      </DndProvider>
      <PrimaryButton onClick={handleClick}>Change order</PrimaryButton>
    </>
  );
}

export default App;
