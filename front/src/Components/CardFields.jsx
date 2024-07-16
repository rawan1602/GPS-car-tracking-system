import React, { useMemo } from "react";

import DownArrowSVG from "../assets/DownArrowSVG";
import "../Styles/CardFields.css";

export function CardInputField({ label = "", ...props }) {
  const id = useMemo(function () {
    if (!Boolean(props.id)) {
      return "field" + String(Math.random() * 10000);
    }

    return String(props.id);
  }, []);

  return (
    <div className="w-100 d-flex flex-column gap-1 align-items-start">
      <label htmlFor={id}>{label}</label>
      <input {...props} id={id}></input>
    </div>
  );
}

export function CardNumberField({ label = "", ...props }) {
  const id = useMemo(function () {
    if (!Boolean(props.id)) {
      return "field" + String(Math.random() * 10000);
    }

    return String(props.id);
  }, []);

  return (
    <div className="w-100 d-flex flex-column gap-1 align-items-start">
      <label htmlFor={id}>{label}</label>
      <div className="number-wrapper">
        <input {...props} id={id} type="number"></input>
        <span className="unit">km/hr</span>
      </div>
    </div>
  );
}

export function CardSelectField({ label = "", ...props }) {
  const id = useMemo(function () {
    if (!Boolean(props.id)) {
      return "field" + String(Math.random() * 10000);
    }

    return String(props.id);
  }, []);

  return (
    <div className="select-wrapper w-100 d-flex flex-column gap-1 align-items-start">
      <label htmlFor={id}>{label}</label>
      <select {...props} id={id}>
        {props.children}
      </select>

      <DownArrowSVG />
    </div>
  );
}

export function CardCheckbox({ label = "", ...props }) {
  const id = useMemo(function () {
    if (!Boolean(props.id)) {
      return "field" + String(Math.random() * 10000);
    }

    return String(props.id);
  }, []);

  return (
    <div className="w-100 d-flex align-items-start justify-content-between">
      <label htmlFor={id}>{label}</label>
      <input {...props} type="checkbox" id={id}></input>
    </div>
  );
}

export function CardRadioButton({ label = "", ...props }) {
  const id = useMemo(function () {
    if (!Boolean(props.id)) {
      return "field" + String(Math.random() * 10000);
    }

    return String(props.id);
  }, []);

  return (
    <div className="w-100 d-flex align-items-start justify-content-between">
      <label htmlFor={id}>{label}</label>
      <input {...props} type="radio" id={id} name={props.name}></input>
    </div>
  );
}
