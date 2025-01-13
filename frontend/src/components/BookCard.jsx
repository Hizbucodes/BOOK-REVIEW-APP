import React from "react";
import empty from "../assets/empty.jpg";
import { NavLink } from "react-router-dom";

const BookCard = ({ title }) => {
  return (
    <div className="bg-white border min-h-[250px] rounded-lg p-3 flex flex-col gap-y-3">
      <NavLink to={"/"}>
        <img
          className="rounded-lg w-full hover:scale-105 duration-100 ease-linear hover:rotate-2"
          src={empty}
          alt="book-image"
        />
      </NavLink>
      <div>
        <h2 className="font-medium mb-2 text-sm">{title}</h2>
      </div>
    </div>
  );
};

export default BookCard;
