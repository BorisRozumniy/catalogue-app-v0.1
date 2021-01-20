import React from "react";
import { Container } from "./Container";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App({ items }) {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <Container items={items} />
      </DndProvider>
    </>
  );
}

export default App;
