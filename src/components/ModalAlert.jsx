import React from "react";

export default function ModalAlert({
  title = "Title",
  subtitle = "subtitle",
  children,
  classes,
}) {
  return (
    <>
      <div className={`text-white modal-alert ${classes}`}>
        <div className="modal-content flex flex-col justify-center items-center text-center">
          <h4 className="">{title}</h4>
          <div className="flex justify-center items-center my-2 ">
            {children}
          </div>
          <small>{subtitle}</small>
        </div>
      </div>
    </>
  );
}
