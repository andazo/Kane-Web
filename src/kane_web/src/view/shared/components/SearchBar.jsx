import "../style/searchBar/searchBar.css";
import { useEffect, useState } from "react";
import {useRef} from "react";

export const SearchBar = (props) => {
  const [theEvent, setTheEvent] = useState({target: { value: "" },});
  const inputRef = useRef(null);

  function handleFilter(event) {
    setTheEvent(event);
    const newData = props.initialData.filter((row) => {
      let name = row.name + (row.surnames? row.surnames : "");
      return toNormalForm(name.toLowerCase()).includes(
        toNormalForm(event.target.value.toLowerCase())
      );
    });
    props.setData(newData);
  }

  function toNormalForm(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  useEffect(() => {
      handleFilter(theEvent);
  }, [props.initialData]);

  return (
    <>
        <div className="divStyle1">
          <input
          ref={inputRef}
            className="searchBox"
            type="text"
            placeholder="Buscar"
            onChange={handleFilter}
          />
          <i className="bi bi-search iconStyle" onClick={() => {inputRef.current.focus()}}></i>
        </div>
    </>
  );
};
