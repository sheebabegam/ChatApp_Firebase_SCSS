import React, { useState, useEffect, useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase";
import { getDatabase, ref, onDisconnect } from "firebase/database";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  const [todos, setTodos] = useState([]);

  // console.log("TODOs are", todos);

  const fetchPost = async () => {
    await getDocs(collection(db, "users")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
      // console.log(todos, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const find = todos.filter((element) => {
    // const p = element.isOnline === true;
    // console.log(p);
    return element.isOnline === true;
  });

  console.log("Online", find);

  const handleSignout = async () => {
    console.log("In Find", currentUser.uid);
    const dbRef = doc(db, "users", currentUser.uid);

    console.log("Nav DB", dbRef);

    updateDoc(dbRef, {
      isOnline: false,
    });

    await signOut(auth);
  };

  // --------------
  // const db = getDatabase();
  // const presenceRef = ref(db, "disconnectmessage");
  // console.log("presenceRef is------->", presenceRef);

  // // Write a string when this client loses connection
  // onDisconnect(presenceRef).set("I disconnected!");

  // --------------

  const db = getDatabase();
  const presenceRef = ref(db, "users", currentUser.uid);
  console.log("presenceRef is------->", presenceRef);

  // Write a string when this client loses connection
  const dbRef = doc(db, "users", currentUser.uid);
  onDisconnect(presenceRef).set("I disconnected!");

  return (
    <div>
      <div className="navbar">
        <span className="logo">Lama Chat</span>
        <div className="user">
          <img src={currentUser.photoURL} alt="" />
          <span>{currentUser.displayName}</span>
          <button onClick={handleSignout}>logout</button>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <p style={{ fontSize: "13px", padding: "0px 15px", color: "white" }}>
          Online: <span style={{ fontWeight: "bold" }}>{find.length}</span>
        </p>
      </div>
    </div>
  );
};

export default Navbar;
