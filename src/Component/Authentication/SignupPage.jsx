import { useState } from "react";
import "./SignupPage.css";
import { useForm } from "react-hook-form";
import user from "../../assets/user.webp";
import { getUser, signUp } from "../../services/userServices";
import { Navigate } from "react-router-dom";

// import { z } from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";

// const schema = z.object({
//   name: z.string().min(3),
//   email: z.string().email().min(3),
//   password: z.string().min(8),
//   cpassword: z.string().includes("password"),
//   address: z.string().min(15),
// });

const SignupPage = () => {
  const [profilePic, setProfilePic] = useState();
  const [formError, setFormError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  //   } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (formData) => {
    try {
      await signUp(formData, profilePic);

      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setFormError(error.response.data.message);
      }
    }
  };

  if (getUser()) {
    return <Navigate to="/" />;
  }

  return (
    <section className="align_center form_page">
      <form
        className="authentication_form signup_form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>SignUp Form</h2>

        <div className="image_input_section">
          <div className="image_preview">
            <img
              src={profilePic ? URL.createObjectURL(profilePic) : user}
              id="file-ip-1-preview"
            />
          </div>
          <label htmlFor="file-ip-1" className="image_label">
            Upload Image
          </label>
          <input
            type="file"
            onChange={(e) => setProfilePic(e.target.files[0])}
            id="file-ip-1"
            className="image_input"
          />
        </div>

        {/* Form Inputs */}
        <div className="form_inputs signup_form_input">
          <div>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              className="form_text_input"
              type="text"
              placeholder="Enter your name"
              {...register("name", { required: true, minLength: 3 })}
            />
            {errors.name?.type === "required" && (
              <em className="form_error">Please enter your name</em>
            )}
            {errors.name?.type === "minLength" && (
              <em className="form_error">
                Name should be 3 or more characters
              </em>
            )}
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="form_text_input"
              type="email"
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
              id="password"
              className="form_text_input"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password?.type === "required" && (
              <em className="form_error">Please enter your password</em>
            )}
            {errors.password?.type === "minLength" && (
              <em className="form_error">
                Password should be 8 or more characters
              </em>
            )}
          </div>

          <div>
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              id="cpassword"
              className="form_text_input"
              type="password"
              placeholder="Enter confirm password"
              {...register("confirmPassword", { required: true, minLength: 8 })}
            />
            {/* {errors.cpassword?.type === "required" && (
              <em className="form_error">Please enter your password</em>
            )}
            {errors.cpassword?.type === "minLength" && (
              <em className="form_error">
                Password should be 8 or more characters
              </em>
            )} */}
            {errors.cpassword?.ref.value !== errors.password?.ref.value && (
              <em className="form_error">
                Confirm Password does not match Password
              </em>
            )}
          </div>

          <div className="signup_textares_section">
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              className="input_textarea"
              placeholder="Enter delivery address"
              {...register("address", { required: true, minLength: 15 })}
            />
            {errors.address?.type === "required" && (
              <em className="form_error">Please enter your address</em>
            )}
            {errors.address?.type === "minLength" && (
              <em className="form_error">
                Address must be at least 15 characters.
              </em>
            )}
          </div>
        </div>
        {formError && <em className="form_error">{formError}</em>}
        <button className="search_button form_submit" type="submit">
          Submit
        </button>
      </form>
    </section>
  );
};

export default SignupPage;

// name - Name should be at least 3 characters.
// email - Please enter valid email
// password - Password must be at least 8 characters.
// confirmPassword - Confirm Password does not match Password
// deliveryAddress - Address must be at least 15 characters.
