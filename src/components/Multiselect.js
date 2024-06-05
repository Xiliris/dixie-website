import Select from "react-select";
import "./Multiselect.scss";

function Multiselect({ name, options, selectedOptions, onChange }) {
  const handleChange = (selected) => {
    onChange(name, selected);
  };
  return (
    <>
      <p>{name}</p>
      <Select
        isMulti={true}
        isSearchable={false}
        isClearable={false}
        name={name}
        defaultValue={selectedOptions}
        options={options}
        className="multi-select"
        classNamePrefix="select"
        onChange={handleChange}
      />
    </>
  );
}

export default Multiselect;
