import React, { useState } from "react";
//components
import { Button } from "../components/";
//styles
import styles from "../styles/components/SelectFresher.module.scss";

export default function SelectFresher({ freshers, handleClick }) {
  const [fresher, setFresher] = useState(null);

  const handleChange = (e) => {
    setFresher(e.target.value);
  };

  return (
    <div className={styles.select}>
      <label htmlFor="freshers">Selecciona tu Fresher!</label>
      <select name="freshers" id="selectFresher" onChange={handleChange}>
        <option></option>
        {freshers.map((fresher) => (
          <option value={JSON.stringify(fresher)} key={fresher.id}>
            {" "}
            {fresher.name} - {fresher.id}
          </option>
        ))}
      </select>
      <Button onClick={() => handleClick(fresher)}>SELECCIONAR</Button>
    </div>
  );
}
