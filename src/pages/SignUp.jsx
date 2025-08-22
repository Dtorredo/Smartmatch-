import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { toast } from "react-hot-toast";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("worker");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        role,
      });
      toast.success("Sign up successful!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        background: "#fff",
        padding: "2.5rem 2rem",
        borderRadius: "0",
        boxShadow: "0 8px 32px 0 rgba(31,38,135,0.15)",
        minWidth: "320px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "2rem",
      }}
    >
      <h2 style={{ color: "#1976d2", marginBottom: "1.5rem" }}>Sign Up</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          padding: "0.8rem",
          marginBottom: "1rem",
          border: "1px solid #bdbdbd",
          borderRadius: "0",
          fontSize: "1rem",
          background: "#f5f6fa",
          color: "#282c34",
          outline: "none",
          transition: "border 0.2s",
        }}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "0.8rem",
          marginBottom: "1rem",
          border: "1px solid #bdbdbd",
          borderRadius: "0",
          fontSize: "1rem",
          background: "#f5f6fa",
          color: "#282c34",
          outline: "none",
          transition: "border 0.2s",
        }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "0.8rem",
          marginBottom: "1rem",
          border: "1px solid #bdbdbd",
          borderRadius: "0",
          fontSize: "1rem",
          background: "#f5f6fa",
          color: "#282c34",
          outline: "none",
          transition: "border 0.2s",
        }}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "0.8rem",
          marginBottom: "1.5rem",
          border: "1px solid #bdbdbd",
          borderRadius: "0",
          fontSize: "1rem",
          background: "#f5f6fa",
          color: "#282c34",
          outline: "none",
          transition: "border 0.2s",
        }}
      />
      <div style={{ marginBottom: "1.5rem", width: "100%" }}>
        <label style={{ marginRight: "1rem" }}>
          <input
            type="radio"
            value="worker"
            checked={role === "worker"}
            onChange={() => setRole("worker")}
          />
          Worker
        </label>
        <label>
          <input
            type="radio"
            value="client"
            checked={role === "client"}
            onChange={() => setRole("client")}
          />
          Client
        </label>
      </div>
      <button
        onClick={handleSignUp}
        style={{
          width: "100%",
          padding: "0.8rem",
          background: "#1976d2",
          color: "#fff",
          border: "none",
          borderRadius: "0",
          fontWeight: "bold",
          fontSize: "1rem",
          cursor: "pointer",
          transition: "background 0.2s",
        }}
      >
        Sign Up
      </button>
    </div>
  );
}