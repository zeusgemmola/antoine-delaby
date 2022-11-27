import { useEffect } from "react";

export const InputField = (props) => {
  const { value, setValue, validInput, setValidInput } = props;

  useEffect(() => {
    if (isNaN(value)) {
      setValidInput(false);
    } else {
      setValidInput(true);
      setValue(Number(value));
    }
  }, [value, setValue, setValidInput]);

  const handleChange = (event) => {
    props.setValue(event.target.value);
  };

  return (
    <div className="input-field col s12">
      <input
        id="amount"
        type="text"
        className={validInput ? "valid" : "invalid"}
        placeholder="0"
        onChange={handleChange}
      />
      <span
        className="helper-text"
        data-error="Erreur"
        data-success="Valide"
      ></span>
      <label htmlFor="amount">Montant</label>
    </div>
  );
};
