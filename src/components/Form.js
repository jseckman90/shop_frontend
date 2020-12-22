import React from "react";

const Form = (props) => {
  const { label, submit } = props;
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{label}</h2>
      <input
        name="username"
        placeholder="username"
        value={formData.username}
        type="text"
        onChange={handleChange}
      />
      <input
        name="password"
        placeholder="password"
        value={formData.password}
        type="password"
        onChange={handleChange}
      />
      <input value={label} type="submit" className="submit-button" />
    </form>
  );
};

export default Form;
