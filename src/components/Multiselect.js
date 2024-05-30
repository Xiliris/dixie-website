import { useState, useEffect } from "react";
import "./Multiselect.scss";

const Multiselect = ({
  label,
  children,
  initialSelectedValues = [],
  onChange,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [displayDropdown, setDisplayDropdown] = useState({
    arrow: "rotateX(0deg)",
    class: "hidden",
  });

  useEffect(() => {
    setSelectedValues(initialSelectedValues);
  }, [initialSelectedValues]);

  useEffect(() => {
    onChange(selectedValues);
  }, [selectedValues, onChange]);

  function selectValue(value, text) {
    setSelectedValues([...selectedValues, { value, text }]);
  }

  function removeValue(value) {
    setSelectedValues(selectedValues.filter((item) => item.value !== value));
  }

  function toggleDropdown() {
    setDisplayDropdown(
      displayDropdown.class === "hidden"
        ? { arrow: "rotateX(180deg)", class: "active" }
        : { arrow: "rotateX(0deg)", class: "hidden" }
    );
  }

  const selectedValueSet = new Set(selectedValues.map((item) => item.value));

  return (
    <div className="multi-select">
      <p>{label}</p>
      <div className="selected-values">
        <ul>
          {selectedValues.map((item) => (
            <li key={item.value} value={item.value}>
              {item.text}
              <button type="button" onClick={() => removeValue(item.value)}>
                x
              </button>
            </li>
          ))}
        </ul>
        <span
          class="material-symbols-outlined"
          onClick={toggleDropdown}
          style={{ transform: displayDropdown.arrow }}
        >
          expand_more
        </span>
      </div>

      <ul className={`dropdown ${displayDropdown.class}`}>
        {children.map((child) => {
          const { value, children: text } = child.props;
          if (selectedValueSet.has(value)) {
            return null;
          }
          return (
            <li
              key={value}
              value={value}
              onClick={() => {
                selectValue(value, text);
              }}
            >
              {text}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

/*
  Ovaj component radi na nacin da se prosledjuje label, children i onChange funkcija.

  label - labela koja se prikazuje iznad multiselect-a
  children - lista opcija koje se prikazuju u multiselect-u
  initialSelectedValues - pocetno selektovane opcije
  onChange - funkcija koja se poziva kada se promeni selekcija

  Component ima dva useEffect-a:
  - prvi postavlja pocetno selektovane vrednosti
  - drugi poziva onChange funkciju kada se promeni selekcija

  Funkcija selectValue dodaje vrednost u selektovane vrednosti
  Funkcija removeValue uklanja vrednost iz selektovanih vrednosti

  selectedValueSet je Set koji sadrzi samo vrednosti selektovanih opcija

  U renderu se prikazuju selektovane vrednosti i opcije koje nisu selektovane
  Klikom na opciju koja nije selektovana, ona se dodaje u selektovane vrednosti
  Klikom na selektovanu opciju, ona se uklanja iz selektovanih vrednosti

  Na kraju se prikazuju selektovane vrednosti i opcije koje nisu selektovane

  Primjer koriscenja:
  <Multiselect
    label="Allowed Roles"
    initialSelectedValues={initialValues}
    onChange={handleMultiselectChange}
  >
    <li value="1">option 1</li>
    <li value="2">option 2</li>
    <li value="3">option 3</li>
    <li value="4">option 4</li>
    <li value="5">option 5</li>
  </Multiselect>

  u onChange funkciji se dobija niz selektovanih opcija koje mozemo koristiti u useState-u

*/

export default Multiselect;
