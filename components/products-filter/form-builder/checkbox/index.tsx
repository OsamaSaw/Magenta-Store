type CheckboxType = {
  type?: string;
  label: string;
  name: string;
  checked?: boolean;
  onChange?: () => void;
};

const Checkbox = ({
  type = "",
  label,
  name,
  checked,
  onChange,
}: CheckboxType) => (
  <label
    htmlFor={label + "-" + name}
    className={`checkbox ${type ? "checkbox--" + type : ""}`}
  >
    <input
      name={name}
      checked={checked}
      onChange={onChange}
      type="checkbox"
      id={label + "-" + name}
    />
    <span className="checkbox__check"></span>
    <p>{label}</p>
  </label>
);

export default Checkbox;
