import React, { useContext, useState, useEffect } from "react";
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
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [option, setOption] = useState("");
  const [arr, setArr] = useState([]);
  // console.log("Options", option);

  // const { currentUser } = useContext(AuthContext);

  // console.log(currentUser.uid); //rnD2Pc09L9gGMdHL5XIPiByKhCp1

  // ////////////

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

  // todos.map((data, i) => {
  //   console.log("Filter Data", data.category);
  // });

  const { currentUser } = useContext(AuthContext);

  // console.log("Current Username", currentUser);

  const currentObject = todos.find(
    (catg) => catg.displayName == currentUser.displayName
  );
  const searchObject = todos.find((catg) => catg.displayName == username);

  // console.log("Current User Name", currentObject);
  // console.log("Display Name", searchObject);

  const handleSearch = async () => {
    if (currentObject.category == searchObject.category) {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", username)
        // where("category", "==", "User")
      );

      try {
        const querySnapshot = await getDocs(q); //  you can retrieve all documents in a collection by omitting the where() filter entirely:
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      } catch (err) {
        setErr(true);
      }
    } else {
      // console.log("User Not Found");
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const find = todos.find((element) => {
    return element.category === option;
  });

  console.log("Find", find);

  const handleDropdown = async () => {
    const q = query(collection(db, "users"), where("category", "==", option));

    try {
      // const querySnapshot = await getDocs(q); //  you can retrieve all documents in a collection by omitting the where() filter entirely:
      // querySnapshot.forEach((doc) => {
      //   console.log("Search Users are -->", doc.data());
      //   setArr([...arr, doc.data()]);
      //   setUser(doc.data());
      // });

      onSnapshot(q, (querySnapshot) => {
        const cities = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          cities.push(doc.data());
          setUser(cities);
        });
        console.log("Current cities in CA: ", cities);
      });
    } catch (err) {
      // console.error(err);
      // setErr(true);
    }
  };

  console.log("My ARRAY", user);

  useEffect(() => {
    handleDropdown();
  }, [option]);

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId = //rnD2Pc09L9gGMdHL5XIPiByKhCp1BoAbcWnJyeaZ2BBLZYNmE97xog42
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    // console.log("user.uid", user.uid); //ByKhCp1BoAbcWnJyeaZ2BBLZYNmE97xog42
    // console.log("combinedId", combinedId);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("");
  };

  console.log("USERRRRR", user);

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
        <select
          required
          name="options"
          value={option}
          className="controlOptions"
          onChange={(e) => {
            setOption(e.target.value);
          }}
        >
          <option className="option">Filter category</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="business">Business</option>
        </select>
      </div>
      {err && (
        <span style={{ color: "red", fontSize: "15px", textAlign: "center" }}>
          User not found!
        </span>
      )}
      {user &&
        user.map((data, i) => (
          <div key={i} className="userChat" onClick={handleSelect}>
            <img src={data.photoURL} alt="" />
            <div className="userChatInfo">
              <div className="userState">
                <span>{data.displayName}</span>
                <div>
                  {data.isOnline ? (
                    <p style={{ color: "green", fontWeight: "bold" }}>Online</p>
                  ) : (
                    <p style={{ color: "red" }}>Offline</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Search;
