import React, { useState, useEffect, useContext } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

function Home(props) {
  // const [todos, setTodos] = useState([]);

  // console.log("TODOs are", todos);

  // const fetchPost = async () => {
  //   await getDocs(collection(db, "users")).then((querySnapshot) => {
  //     const newData = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     setTodos(newData);
  //     console.log(todos, newData);
  //   });
  // };

  // useEffect(() => {
  //   fetchPost();
  // }, []);

  // todos.map((data, i) => {
  //   console.log("Filter Data", data.category);
  // });

  // const { currentUser } = useContext(AuthContext);

  // console.log("Current Username", currentUser.displayName);

  // const searchObject = todos.find(
  //   (catg) => catg.displayName == currentUser.displayName
  // );

  // console.log("Current user Category is", searchObject.category);

  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
