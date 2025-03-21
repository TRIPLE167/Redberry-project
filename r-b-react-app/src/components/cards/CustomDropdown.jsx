import { useState, useEffect } from "react";

const CustomDropdown = ({
  label,
  options,
  selectedValue,
  onSelect,
  width,
  disabled,
  departmentValue,
  setVisible,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedSurname, setSelectedSurname] = useState("");
  const [profile, setProfile] = useState("");

  const filteredOptions =
    label === "პასუხისმგებელი თანამშრომელი"
      ? options.filter((option) => option.department.id === departmentValue)
      : options;
  useEffect(() => {
    if (options.length > 0) {
      let selectedOption = options.find(
        (option) => option.id === selectedValue
      );

      if (!selectedOption && label !== "პასუხისმგებელი თანამშრომელი") {
        selectedOption = options[0];
      } else if (!selectedOption && label === "პასუხისმგებელი თანამშრომელი") {
        selectedOption = options.find(
          (option) =>
            option.department && option.department.id === departmentValue
        );
      }

      if (!selectedOption && filteredOptions.length > 0) {
        selectedOption = filteredOptions[0];
        onSelect(selectedOption.id);
      }

      if (selectedOption) {
        setSelectedIcon(selectedOption.icon || "");
        setProfile(selectedOption.avatar || "");
        setSelectedName(selectedOption.name || "");
        setSelectedSurname(selectedOption.surname || "");
      } else {
        console.error("No matching option found");
      }
    }
  }, [
    options,
    selectedValue,
    departmentValue,
    filteredOptions,
    label,
    onSelect,
  ]);

  useEffect(() => {
    if (label === "პასუხისმგებელი თანამშრომელი" && filteredOptions.length > 0) {
      const defaultOption = filteredOptions[0];
      setSelectedIcon(defaultOption.icon || "");
      setProfile(defaultOption.avatar || "");
      setSelectedName(defaultOption.name || "");
      setSelectedSurname(defaultOption.surname || "");
      onSelect(defaultOption.id);
    }
  }, [departmentValue, filteredOptions, label, onSelect]);

  const toggleDropdown = () => setIsVisible(!isVisible);

  return (
    <div>
      <h6
        style={{
          color: disabled ? "#ADB5BD" : "",
        }}
      >
        {label}
      </h6>
      <div
        className="custom-dropdown-container"
        onClick={toggleDropdown}
        style={{
          width: width,
          borderColor: isVisible ? "#8338EC" : "",
          borderBottomLeftRadius: isVisible ? "0" : "",
          borderBottomRightRadius: isVisible ? "0" : "",
          pointerEvents:
            label === "პასუხისმგებელი თანამშრომელი" && disabled
              ? "none"
              : "auto",
          zIndex: label === "დეპარტამენტი" ? "101" : "",
        }}
      >
        <div className="custom-dropdown-selected">
          <div>
            {label === "პრიორიტეტი" && (
              <img src={selectedIcon} alt="icon" className="icon" />
            )}
            <span>
              {label === "პასუხისმგებელი თანამშრომელი" ? (
                <div className="employee-name-profile">
                  {profile !== "" && (
                    <img className="profile" src={profile} alt="profile" />
                  )}
                  <span>
                    {disabled ? "" : ` ${selectedName} ${selectedSurname}`}
                  </span>
                </div>
              ) : (
                <span>{selectedName}</span>
              )}
            </span>
          </div>
          {isVisible ? (
            <img src="/assets/images/upArrow.svg" alt="arrow" />
          ) : (
            <img src="/assets/images/arrow.svg" alt="arrow" />
          )}
        </div>

        {isVisible && (
          <div
            className="custom-dropdown-options"
            style={{ borderColor: "#8338EC" }}
          >
            {label === "პასუხისმგებელი თანამშრომელი" && (
              <div id="addEmployee" onClick={() => setVisible(true)}>
                <img src="/assets/images/addEmployee.svg" alt="add employee" />
                <p>დაამატე თანამშრომელი</p>
              </div>
            )}
            {filteredOptions.map((option) => (
              <div
                key={option.id}
                className="custom-dropdown-option"
                onClick={() => {
                  onSelect(option.id);
                  setSelectedIcon(option.icon);
                  setSelectedName(option.name);
                  setSelectedSurname(option.surname);
                  setProfile(option.avatar);
                  setIsVisible(false);
                }}
              >
                {label === "პრიორიტეტი" && (
                  <img className="icon" src={option.icon} alt="icon" />
                )}
                {label === "პასუხისმგებელი თანამშრომელი" && (
                  <div className="employee-name-profile">
                    <img
                      src={option.avatar}
                      alt="profile"
                      className="profile"
                    />
                    <span>
                      {option.name} {option.surname}
                    </span>
                  </div>
                )}
                {label !== "პასუხისმგებელი თანამშრომელი" && (
                  <span>
                    {option.name} {option.surname}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
