import { useState } from "react";
import "./App.css";
import { Button } from "@chakra-ui/react";

function App() {
  const [data, setData] = useState([]);

  const onClick = async () => {
    const response = await fetch("http://localhost:3035/api/books");
    const data = await response.json();
    setData(data);
  };

  return (
    <div className="App">
      <main>
        <Button colorScheme="blue" onClick={onClick}>
          Button
        </Button>
        {data.map((d: { id: number; name: string }) => (
          <div key={d.id}>{d.name}</div>
        ))}
      </main>
    </div>
  );
}

export default App;
