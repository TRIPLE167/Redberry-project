import "./addEmployee.scss";
import { DataContext } from "../Database-files/DataBase";
import { useContext, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function AddEmployee({ isOpen, setIsOpen, visible, setVisible }) {
  const { departments, token } = useContext(DataContext);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [department, setDepartment] = useState(1);
  const [nameValidation, setNameValidation] = useState("#6C757D");
  const [lastNameValidation, setLastNameValidation] = useState("#6C757D");
  const fileInputRef = useRef(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.size <= 600000 && file.type.startsWith("image/")) {
      setAvatar(file);
    } else {
      alert("File must be an image and less than 600KB.");
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (firstName.length < 2 || firstName.length > 255) {
      setNameValidation("red");
      isValid = false;
    } else {
      setNameValidation("green");
    }

    if (lastName.length < 2 || lastName.length > 255) {
      setLastNameValidation("red");
      isValid = false;
    } else {
      setLastNameValidation("green");
    }
    if (!avatar) {
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    formData.append("name", firstName);
    formData.append("surname", lastName);
    formData.append("avatar", avatar);
    formData.append("department_id", department);

    console.log("name:", firstName);
    console.log("surname:", lastName);
    console.log("avatar:", avatar);
    console.log("department_id:", department);
    
    try {
      await axios.post(
        "https://momentum.redberryinternship.ge/api/employees",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setFirstName("");
      setLastName("");
      setAvatar(null);
      setDepartment(1);
      if (setIsOpen) setIsOpen(false);
      if (setVisible) setVisible(false);
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const handleClosing = () => {
    setFirstName("");
    setLastName("");
    setAvatar(null);
    setDepartment(1);
    setNameValidation("#6c757d");
    setLastNameValidation("#6c757d");
    validateForm();

    if (setVisible) {
      setVisible(false);
    }
    if (setIsOpen) {
      setIsOpen(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: isOpen || visible ? "" : "none" }}
    >
      <div className="main-container">
        <div>
          <button onClick={handleClosing}>
            <img src="/assets/images/closing.svg" alt="" />
          </button>
          <h2>თანამშრომლის დამატება</h2>
          <div className="main-container-middle">
            <div>
              <label>
                <h3>სახელი</h3>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    validateForm();
                  }}
                />
                <p style={{ color: nameValidation }}>
                  <span>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  მინიმუმ 2 სიმბოლო
                </p>
                <p style={{ color: nameValidation }}>
                  <span>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  მაქსიმუმ 255 სიმბოლო
                </p>
              </label>
              <label>
                <h3>გვარი</h3>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    validateForm();
                  }}
                />
                <p style={{ color: lastNameValidation }}>
                  <span>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  მინიმუმ 2 სიმბოლო
                </p>
                <p style={{ color: lastNameValidation }}>
                  <span>
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                  მაქსიმუმ 255 სიმბოლო
                </p>
              </label>
            </div>

            <h3 className="bot-2-h3">ავატარი</h3>
            <label>
              <div className="file-upload">
                <input type="file" id="file" onChange={handleFileChange} ref={fileInputRef} />
                <div>
                  {!avatar && (
                    <div>
                      <img src="/assets/images/upload.svg" />
                      <p>ატვირთე ფოტო</p>
                    </div>
                  )}
                  {avatar && (
                    <>
                      <img
                        src={URL.createObjectURL(avatar)}
                        alt="Selected Avatar"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                        }}
                      />
                      <button
                        onClick={(event) => {
                          event.preventDefault();

                          setAvatar(null);
                          fileInputRef.current.value = null;
                        }}
                      >
                        <img src="/assets/images/trashBin.svg" alt="" />
                      </button>
                    </>
                  )}
                </div>
              </div>
            </label>

            <label>
              <h3 className="bot-2-h3">დეპარტამენტი</h3>
              <div id="select-div">
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  {departments.map((department) => {
                    return (
                      <option value={department.id} key={department.id}>
                        {department.name}
                      </option>
                    );
                  })}
                </select>
                <img src="/assets/images/arrow.svg" alt="" />
              </div>
            </label>
          </div>
          <div className="employee-buttons">
            <button onClick={handleClosing}>გაუქმება</button>
            <button type="submit">დაამატე თანამშრომელი</button>
          </div>
        </div>
      </div>
      <div
        className="background-blur"
        style={{ display: isOpen || visible ? "" : "none" }}
        onClick={handleClosing}
      ></div>
    </form>
  );
}

export default AddEmployee;
