import { useState } from "react";
import Navbar from "./assets/components/Navbar";
import AddTask from "./assets/components/AddTask";
import DateSection from "./assets/components/DateSection";

function App() {
  return (
    <>
      <Navbar />
      <DateSection />
      <AddTask />

    </>
  );
}

export default App;
