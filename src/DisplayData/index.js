import { useState } from "react";
import styles from "./styles.module.css";

function DisplayData() {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [resume, setResume] = useState([]);
  const [error, setError] = useState("");
  const [searchBy, setSearchBy] = useState("id");

  const fetchResumeById = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/getResumeById/${id}`
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to fetch resume");
      }
      const data = await response.json();
      setResume(data);
      setId("");
      setError("");
    } catch (err) {
      setError(err.message);
      setResume(null);
    }
  };

  const fetchResumeByName = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/getResumeByName/${encodeURIComponent(
          name.replace(/\s+/g, "+")
        )}`
      );
      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || "Failed to fetch resume");
      }
      const data = await response.json();
      setResume(data);
      setName("");
      setError("");
    } catch (err) {
      setError(err.message);
      setResume(null);
    }
  };

  const handleSearch = () => {
    if (searchBy==="id") {
      fetchResumeById();

    } else if (searchBy==="name") {
      fetchResumeByName();
    } else {
      setError("Please enter an ID or a name.");
    }
  };

  return (
    <div className={styles.container}>
      <h2>Search Resume</h2>

      <div className={styles.searchContainer}>
        <div className={styles.toggleContainer}>
          <button
            className={`${styles.toggleButton} ${
              searchBy === "id" ? styles.active : ""
            } ${styles.toggleButton1}`}
            onClick={() => setSearchBy("id")}
          >
            Search by ID
          </button>
          <button
            className={`${styles.toggleButton} ${
              searchBy === "name" ? styles.active : ""
            } ${styles.toggleButton2}`}
            onClick={() => setSearchBy("name")}
          >
            Search by Name
          </button>
        </div>
        {searchBy === "id" && (
          <div className={styles.inputGroup}>
            <label htmlFor="id">Search by ID:</label>
            <input
              type="text"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              autoComplete="off"
            />
          </div>
        )}
        {searchBy === "name" && (
          <div className={styles.inputGroup}>
            <label htmlFor="name">Search by Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
          </div>
        )}
        <button className={styles.searchButton} onClick={handleSearch}>Search</button>
      </div>
      {error && <p className={styles.error}>{error}</p>}
      {!error &&
        resume.length > 0 &&
        resume.map((item) => {
          return (
            <div className={styles.resumeCard}>
              <h3 className={styles.cardTitle}>Resume Details</h3>
              <div className={styles.cardContent}>
                <p>
                  <strong>Name:</strong> {item.name}
                </p>
                <p>
                  <strong>Job Title:</strong> {item.job_title}
                </p>
                <p>
                  <strong>Job Description:</strong> {item.job_description}
                </p>
                <p>
                  <strong>Job Company:</strong> {item.job_company}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default DisplayData;
