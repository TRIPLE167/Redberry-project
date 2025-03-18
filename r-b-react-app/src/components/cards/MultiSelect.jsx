function MultiSelect({ label, options, isOpen, toggleOpen }) {
  const toggleSelection = (value) => {};

  return (
    <div className="multi-select">
      <div className="select-box">
        <div id="filter" tabIndex={0} onClick={toggleOpen}>
          <span id="filter-name">{label}</span>
          <i className="material-icons">keyboard_arrow_down</i>
        </div>
        {isOpen && (
          <div className="dropdown">
            <div>
              {options.map((option) => (
                <label key={option.id}>
                  <input
                    type="checkbox"
                    onChange={() => toggleSelection(option)}
                  />
                  <span>
                    {option.name} {option.surname}
                  </span>
                </label>
              ))}
            </div>
            <button onClick={toggleOpen}>არჩევა</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MultiSelect;
