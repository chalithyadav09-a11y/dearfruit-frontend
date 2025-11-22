import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

import "./LoginPage.css";
import { getUser, login } from "../../services/userServices";
import { Navigate, useLocation } from "react-router-dom";

// const schema = z.object({
//   email: z.string().email().min(3),
//   password: z.string().min(8),
// });

// const schema = z.object({
//   email: z
//     .email({ message: "Invalid email address" })
//     .min(3, "Email too short"),
//   password: z.string().min(8, "Password must be at least 8 characters"),
// });

const LoginPage = () => {
  const [formError, setFormError] = useState("");
  const location = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const onSubmit = async (formData) => {
    setFormError("");
    try {
      await login(formData);
      const { state } = location;
      window.location = state ? state.from : "/";
    } catch (error) {
      if (error.response && error.response.status === 400)
        setFormError(error.response.data.message);
    }
  };

  if(getUser()) {
    return <Navigate to="/" />
  }

  return (
    <section className="align_center form_page">
      <form
        action=""
        className="authentication_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login Form</h2>
        <div className="form_inputs">
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="form_text_input"
              placeholder="Enter your email address"
              {...register("email", { required: true, minLength: 3 })}
            />
            {errors.email?.type === "required" && (
              <em className="form_error">Please enter your email</em>
            )}
            {errors.email?.type === "minLength" && (
              <em className="form_error">
                Email should be 3 or more characters
              </em>
            )}
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="form_text_input"
              placeholder="Enter your password"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password?.type === "required" && (
              <em className="form_error">Password is required</em>
            )}
            {errors.password?.type === "minLength" && (
              <em className="form_error">
                Password should be 8 or more characters
              </em>
            )}
          </div>
          {formError && <em className="form_error">{formError}</em>}
          <button type="submit" className="search_button form_submit">
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
