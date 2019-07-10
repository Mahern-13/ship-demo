import React, { memo } from "react";
import { useDispatch } from "react-redux";
import { setCompletionOfStop } from "../../ducks/actions";
import "./style.scss";

const Checkbox = ({ label, stop }) => {
  const dispatch = useDispatch();

  const toggleCheckboxChange = () => {
    dispatch(setCompletionOfStop(stop));
  };

  return (
    <div className="checkbox">
      <label>
        <input
          type="checkbox"
          checked={stop.completed}
          onChange={toggleCheckboxChange}
        />
        {label}
      </label>
    </div>
  );
};

export default memo(Checkbox);
