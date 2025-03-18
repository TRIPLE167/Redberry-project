import { useState, useEffect } from "react";

const CustomDropdown = ({
  label,
  options,
  selectedValue,
  onSelect,
  width,
  disabled,
  departmentValue,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState("");
  const [selectedName, setSelectedName] = useState("");
  const [selectedSurname, setSelectedSurname] = useState("");
  const [profile, setProfile] = useState("");
  useEffect(() => {
    console.log(departmentValue);
  }, [departmentValue]);

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

      
      if (selectedOption) {
        setSelectedIcon(selectedOption.icon || "");
        setProfile(selectedOption.avatar || "");
        setSelectedName(selectedOption.name || "");
        setSelectedSurname(selectedOption.surname || "");
      }
    }
  }, [options, selectedValue, departmentValue]);

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
            {label === "პრიორიტეტი" && <img src={selectedIcon} alt="icon" />}
            <span>
              {label === "პასუხისმგებელი თანამშრომელი" ? (
                <>
                  <div className="employee-name-profile">
                    {profile !== "" && (
                      <img className="profile" src={profile} />
                    )}
                    <span>
                      {disabled ? "" : ` ${selectedName} ${selectedSurname}`}
                    </span>
                  </div>
                </>
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
              <div id="addEmployee">
                <img src="/assets/images/addEmployee.svg" alt="add employee" />
                <p>დაამატე თანამშრომელი</p>
              </div>
            )}
            {options.map((option) => {
              if (
                label === "პასუხისმგებელი თანამშრომელი" &&
                option.department.id === departmentValue
              ) {
                return (
                  <div
                    key={option.id}
                    className="custom-dropdown-option"
                    onClick={() => {
                      onSelect(option.id);
                      setSelectedName(option.name);
                      setSelectedSurname(option.surname);
                      setIsVisible(false);
                    }}
                  >
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
                  </div>
                );
              } else if (label !== "პასუხისმგებელი თანამშრომელი") {
                return (
                  <div
                    key={option.id}
                    className="custom-dropdown-option"
                    onClick={() => {
                      onSelect(option.id);
                      setSelectedIcon(option.icon);
                      setSelectedName(option.name);
                      setSelectedSurname(option.surname);
                      setIsVisible(false);
                    }}
                  >
                    {label === "პრიორიტეტი" && (
                      <img id="icon" src={option.icon} />
                    )}

                    <span>
                      {option.name} {option.surname}
                    </span>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomDropdown;
