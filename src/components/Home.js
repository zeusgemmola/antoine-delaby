import logo from "../AppBar.logo.svg";
import { useState, useEffect, useRef } from "react";
import { InputField } from "./InputField/InputField";
import Spinner from "./Spinner/index.js";

const devises = ["EUR", "CHF", "GBP", "USD"];

const FromToSelector = (props) => {
  useEffect(() => {
    window.M.updateTextFields();
  }, []);

  return (
    // On aura props.name qui sera égal à "From" ou "To"
    // On aura props.io qui sera soit "inputDevises" soit "outputDevises"
    <div className="col s6">
      <label>{props.name}</label>
      <select
        defaultValue="EUR"
        className="browser-default"
        name={props.io}
        id={props.io}
        onChange={(event) =>
          convert(
            props.name,
            props.devises,
            props.setDevises,
            event.target.value
          )
        }
      >
        {devises.map((element) => (
          <option key={element} value={element}>
            {element}
          </option>
        ))}
      </select>
    </div>
  );
};

function convert(name, devises, setDevises, value) {
  name === "From"
    ? setDevises({ deviseFrom: value, deviseTo: devises.deviseTo })
    : setDevises({ deviseFrom: devises.deviseFrom, deviseTo: value });
}

export const Header = () => (
  <>
    <header>
      <nav className="AppBar">
        <img
          className="AppBar-logo"
          src={logo}
          aria-label="people"
          alt="People"
        />
      </nav>
    </header>
  </>
);

const ResultSection = (props) => {
  return (
    <div className="input-field col s12">
      <h5>Result : {props.result}</h5>
    </div>
  );
};

const Convertisseur = () => {
  const [result, setResult] = useState({
    isLoading: false,
    value: 0
  });
  const [deviseState, setDevides] = useState({
    deviseFrom: "EUR",
    deviseTo: "EUR"
  });
  const [value, setValue] = useState(0);
  const [validInput, setValidInput] = useState(null);
  const first = useRef(true);

  useEffect(() => {
    if (!first.current) {
      setResult({
        isLoading: true,
        value: result.value
      });
      const fetchConvert = async () => {
        if (deviseState.deviseFrom !== 0) {
          const request = await fetch(
            `https://api.currencyapi.com/v3/latest?apikey=4UNY3wyaEFGYct68rj6rR0foFCXry5mlluvGWH5X&base_currency=${deviseState.deviseFrom}`
          );
          const { data } = await request.json();
          setResult({
            isLoading: false,
            value: value / data[deviseState.deviseTo].value
          });
        }
      };
      fetchConvert();
      console.log(deviseState.deviseFrom);
      console.log(deviseState.deviseTo);
    } else {
      first.current = false;
    }
  }, [value, deviseState]);

  return (
    <div className="row">
      <h3>Convertisseur</h3>
      <div className="col s8">
        <div className="row">
          <FromToSelector
            name="From"
            io="inputDevises"
            devises={deviseState}
            setDevises={setDevides}
          />
          <FromToSelector
            name="To"
            io="outputDevises"
            devises={deviseState}
            setDevises={setDevides}
          />
        </div>
        <div className="row">
          <InputField
            value={value}
            setValue={setValue}
            validInput={validInput}
            setValidInput={setValidInput}
          />
          {result.isLoading ? (
            <Spinner />
          ) : (
            <ResultSection result={result.value} />
          )}
        </div>
      </div>
    </div>
  );
};

export const HomeConvertisseur = () => (
  <main>
    <div className="container">
      <Convertisseur />
    </div>
  </main>
);
