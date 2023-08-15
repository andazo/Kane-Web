import React from "react";

export const FormInput = ({
  id,
  label,
  value,
  onChange,
  disabled,
  isValid,
  errorMessage,
  prependText,
}) => {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      <div className="input-group">
        {prependText && (
          <div className="input-group-prepend">
            <span className="input-group-text">{prependText}</span>
          </div>
        )}
        <input
          id={id}
          type="text"
          className={`form-control ${isValid ? "is-invalid" : ""}`}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </div>
      {isValid && <div className="text-danger">{errorMessage}</div>}
    </div>
  );
};