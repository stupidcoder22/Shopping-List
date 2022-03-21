import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
const List = ({ items, deleteitem, showalert, edititem }) => {
  return (
    <div className="grocery-list">
      {items.map((data) => {
        const { id, title } = data;
        return (
          <article key={id} className="grocery-item">
            <p className="title">{title}</p>
            <div className="btn-container">
              <button
                type="button"
                className="edit-btn"
                onClick={() => edititem(id)}
              >
                <FaEdit />
              </button>
              <button
                type="button"
                className="delete-btn"
                onClick={() => deleteitem(id)}
              >
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
