import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

function App() {
  const [name, setname] = useState("");
  const [list, setlist] = useState([]);
  const [isEditing, setisEditing] = useState(false);
  const [editid, seteditid] = useState(null);
  const [alert, setalert] = useState({
    show: false,
    msg: "",
    type: "",
  });

  const showalert = (show = false, type = "", msg = "") => {
    setalert({ show, type, msg });
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // display alert
      showalert(true, "danger", "Please enter something");
    } else if (name && isEditing) {
      // deal with editing
      showalert(true, "success", "item successfully updated");
      setlist(
        list.map((item) => {
          if (item.id === editid) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setname("");
      setisEditing(false);
      seteditid(null);
    } else {
      showalert(true, "success", "item added to the list");
      const newitem = { id: new Date().getTime().toString(), title: name };
      setlist([...list, newitem]);
      setname("");
    }
  };

  function clearlist() {
    showalert(true, "danger", "list is cleared");
    setlist([]);
  }

  function deleteitem(id) {
    const newlist = list.filter((data) => data.id != id);
    showalert(true, "danger", "item deleted");
    setlist(newlist);
  }

  function edititem(id) {
    const specificitem = list.find((item) => item.id === id);
    setisEditing(true);
    seteditid(id);
    setname(specificitem.title);
  }

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handlesubmit}>
        {alert.show && <Alert {...alert} removealert={showalert} list={list} />}
        <h3>Shopping List</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            placeholder="  eg. Buy Perfume"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
        {/* <input type="text" /> */}
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List
            items={list}
            deleteitem={deleteitem}
            showalert={showalert}
            edititem={edititem}
          />
          <button className="clear-btn" onClick={() => clearlist()}>
            clear items
          </button>
        </div>
      )}
    </section>
  );
}

export default App;
