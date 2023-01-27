import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  //   // since I can connect from multiple devices or browser tabs, we store each connection instance separately
  // // any time that connectionsRef's value is null (i.e. has no children) I am offline
  // var myConnectionsRef = firebase.database().ref('users/test/connections');

  // // stores the timestamp of my last disconnect (the last time I was seen online)
  // var lastOnlineRef = firebase.database().ref('users/test/lastOnline');

  // var connectedRef = firebase.database().ref('.info/connected');
  // connectedRef.on('value', function(snap) {
  //   if (snap.val() === true) {
  //     // We're connected (or reconnected)! Do anything here that should happen only if online (or on reconnect)
  //     var con = myConnectionsRef.push();

  //     // When I disconnect, remove this device
  //     con.onDisconnect().remove();

  //     // Add this device to my connections list
  //     // this value could contain info about the device or a timestamp too
  //     con.set(true);

  //     // When I disconnect, update the last time I was seen online
  //     lastOnlineRef.onDisconnect().set(firebase.database.ServerValue.TIMESTAMP);
  //   }
  // });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
