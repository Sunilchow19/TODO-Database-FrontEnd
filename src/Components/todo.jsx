import axios from "axios";
import { useEffect, useState } from "react";
import "./toto.css";
function Todo() {
  let [valu, setval] = useState("");
  let [str, setstr] = useState([]);

  //Main Get Function
  function Main() {
    axios
      .get("http://localhost:3015/get", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((val) => {
        // console.log(val.data);
        setstr(val.data);
      });
  }

  //Onchange Function
  let chn = (e) => {
    setval(e.target.value);
  };

  //Initial Rendering UseEffect Method
  useEffect(() => {
    Main();
  }, []);

  //For Delete Functionality
  let remove = (val, ind) => {
    axios
      .delete(`http://localhost:3015/delete/${val.id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((val) => {
        // console.log(val);
        Main();
      });
  };

  //To Submit form data
  let submit = (e) => {
    e.preventDefault();
    if (!valu) {
      alert("Input cannot be empty!");
      return;
    }

    if (str.find((item) => item.work === valu)) {
      alert("This item already exists!");
      return;
    }

    let data = {
      work: e.target[0].value,
    };

    axios
      .post("http://localhost:3015/post", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((val) => {
        // console.log(val);
        Main();
      });

    setval("");
  };

  //For Edit Functionality
  let edit = (val, ind) => {
    let rep = {
      work: prompt(`Edit ${val.work}`),
    };

    axios
      .patch(`http://localhost:3015/patch/${val.id}`, rep, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((val) => {
        // console.log(val);
        Main();
      });
  };

  //For Result Data
  let res = str.map((val, ind) => {
    return (
      <div key={ind}>
        <li>
          {val.work}
          <button
            onClick={() => {
              remove(val, ind);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              edit(val, ind);
            }}
          >
            Edit
          </button>
        </li>
      </div>
    );
  });

  return (
    <>
      {/* {console.log(str)} */}
      <h1>Todo List</h1>

      <form onSubmit={submit}>
        <input type="text" name="work" value={valu} onChange={chn} />
        <input type="submit" value="Add" />
      </form>

      {res}
    </>
  );
}

export default Todo;
