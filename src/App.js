import "./App.css";
import { useRef, useEffect, useState } from "react";

export default function App() {
  const lastNameRef = useRef(null);
  const firstNameRef = useRef(null);

  const [firstname, setfirstname] = useState("Kristian");
  const [lastname, setlastname] = useState("Dhimitri");

  const generatejoke = (e) => {
    e.preventDefault();
    setfirstname(firstNameRef.current.value);
    setlastname(lastNameRef.current.value);
  };

  const useGenerateJoke = (firstname, lastname) => {
    const [joke, setJoke] = useState("");
    useEffect(() => {
      const fetchJoke = async () =>
        await fetch(
          `http://api.icndb.com/jokes/random?firstName=${firstname}&lastName=${lastname}`
        )
          .then((res) => res.json())
          .then((data) => {
            setJoke(data.value.joke);
          });
      fetchJoke();
    }, [firstname, lastname]);
    return joke;
  };

  const joke = useGenerateJoke(firstname, lastname);

  return (
    <div className="App">
      <h1> Hello there developers! </h1> <h2> Get your daily joke below </h2>
      <form className="form">
        <input placeholder="first name" ref={firstNameRef} className="item" />
        <input placeholder="last name" ref={lastNameRef} className="item" />
        <button onClick={generatejoke}> Generate </button>
      </form>
      <h2>{joke}</h2>
    </div>
  );
}
