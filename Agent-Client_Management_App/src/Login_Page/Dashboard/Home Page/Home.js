import React from "react";

function Home() {
  const styles = {
    container: {
      backgroundColor: "#1E1E1E",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "Roboto, sans-serif",
      color: "#fff",
    },
    heading: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "1rem",
      textTransform: "uppercase",
      letterSpacing: "0.5rem",
      textAlign: "center",
    },
    subheading: {
      fontSize: "1.5rem",
      fontStyle: "italic",
      marginBottom: "2rem",
      textAlign: "center",
    },
    animation: {
      animationName: "fadeIn",
      animationDuration: "2s",
      animationFillMode: "forwards",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Agent Client Management System</h1>
      <p style={styles.subheading}>
        Made by Rohit Makwana and Darshil Babariya
      </p>
      <div style={styles.animation}>🚀</div>
    </div>
  );
}

export default Home;
