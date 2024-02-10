import { useState } from "react";
import Header from "./components/header";

function App() {
  const students = ["Daniel", "Dian", "Dodi", "Dina"];
  const [likes, setLikes] = useState(0);
  const [number, setNumber] = useState(0);

  const handleLike = () => {
    setLikes(likes + 1);
  };

  return (
    <>
      <Header name="Daniel" />
      <ul>
        {students.map((student) => (
          <li key={student}>{student}</li>
        ))}
      </ul>
      <button onClick={handleLike}>like({likes})</button>
      <br></br>
      <div>
        <button onClick={() => setNumber((n) => n - 1)}>-</button>
        <h1> ({number}) </h1>
        <button onClick={() => setNumber((n) => n + 1)}>+</button>
        <button onClick={() => setNumber(0)}> Reset</button>
      </div>
    </>
  );
}

export default App;
