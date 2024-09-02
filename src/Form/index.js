import { useState } from "react";
import styles from "./styles.module.css";
import SuccessMessage from "../SuccessMessage";

function Form() {
  const [success, setSuccess] = useState("");
  const [fname,setFname] = useState("");
  const [lname,setLname] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    job_title: "",
    job_company: "",
    job_description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const postResumeData = async (data) => {
    try {
        const response = await fetch('http://localhost:8080/api/uploadResumeDetails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorResponse = await response.json();
            throw new Error(errorResponse.error || 'Failed to upload resume');
        }

        const result = await response.json();
        console.log('Resume uploaded successfully:', result);
        return result;
    } catch (err) {
        console.error('Error uploading resume:', err.message);
        throw err;
    }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    const temp = fname + " " + lname;
    setFormData({
      ...formData,
      name:temp,
    });
    console.log("Form Submitted:", formData);
    try {
        const result = await postResumeData({
          ...formData,
          name:temp,
        });
        setSuccess('Details uploaded successfully!');
        setFormData({
          name: "",
          job_title: "",
          job_company: "",
          job_description: "",
        });
        setFname("");
        setLname("");
        console.log(result);
    } catch (err) {
        console.error('Submission failed:', err.message);
        setSuccess("");
    }
};

console.log(formData,'fromdata fname lname');

  return (
    <div className={styles.formContainer}>
      {success && <SuccessMessage message={success} onClose={() => setSuccess("")} />}
      <h2>Upload Resume Details</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="fname">First Name:</label>
          <input
            type="text"
            id="fname"
            name="lname"
            value={fname}
            onChange={(e)=>setFname(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="lname">Last Name:</label>
          <input
            type="text"
            id="lname"
            name="lname"
            value={lname}
            onChange={(e)=>setLname(e.target.value)}
            required
            autoComplete="off"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="role">Current Role:</label>
          <input
            type="text"
            id="job_title"
            name="job_title"
            value={formData.job_title}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="job_company">Current Organization:</label>
          <input
            type="text"
            id="job_company"
            name="job_company"
            value={formData.job_company}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="job_description">Job Description:</label>
          <textarea
            id="job_description"
            name="job_description"
            value={formData.job_description}
            onChange={handleChange}
            required
            autoComplete="off"
          />
        </div>
        <button type="submit" className={styles.formSubmitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default Form;
