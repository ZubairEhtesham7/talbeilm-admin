import React from "react";
import "./style.css";
import { DebounceInput } from "react-debounce-input";

function Customsearchinput(props) {
  const handleonChangeSearch = (event) => {
    props.setsearchstring(event.target.value);
  };
  return (
    <div>
      <DebounceInput
        placeholder="Search..."
        className="innputt"
        minLength={3}
        debounceTimeout={500}
        onChange={(event) => handleonChangeSearch(event)}
        value={props.searchstring}
      />
    </div>
  );
}

export default Customsearchinput;
