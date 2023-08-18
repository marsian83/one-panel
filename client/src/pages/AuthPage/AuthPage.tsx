import { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "./components/AuthForm";
import useModal from "../../hooks/useModal";
import api from "../../helpers/api";
import bcrypt from "bcryptjs";
import { hashPassword } from "../../helpers/utils";

export default function AuthPage() {
  const modal = useModal();

  const formTypes = {
    login: {
      inputs: [
        {
          icon: "e7fd",
          name: "name",
          placeholder: "Name",
        },
        {
          icon: "e158",
          name: "email",
          placeholder: "Email Address",
        },
        {
          icon: "e0da",
          name: "password",
          password: true,
          showPasswordToggle: true,
          placeholder: "Enter Password",
        },
        {
          icon: "e0da",
          name: "confirmPassword",
          password: true,
          placeholder: "Confirm Password",
        },
      ],

      submitAction: (data: any) => {
        if (data.password === data.confirmPassword) {
          hashPassword(data.password).then((password) =>
            api.register(data.name, data.email, password)
          );
        } else {
          alert("Passwords don't match");
        }
      },

      toggleText: "Already have an account?",
      toggleCTA: "Sign in",
      toggleTo: "register",

      texts: {
        title: "Register your organization",
        subtitle: "Designed for scaling communities",
        btnText: "Create my account",
      },
    },

    register: {
      inputs: [
        {
          icon: "e158",
          name: "email",
          placeholder: "Email Address",
        },
        {
          icon: "e0da",
          name: "password",
          password: true,
          showPasswordToggle: true,
          placeholder: "Enter Password",
        },
      ],

      submitAction: (data: any) => {
        if (data.email && data.password) {
          api.login(data.email, data.password);
        } else {
          alert("Input all fields");
        }
      },

      toggleText: "Don't have an account?",
      toggleCTA: "Sign up",
      toggleTo: "login",

      texts: {
        title: "Sign In",
        subtitle: "Login to manage your community",
        btnText: "Sign in",
      },
    },
  };

  const [formType, setFormType] = useState(formTypes.login);

  return (
    <section className="p-page relative flex min-h-[80vh] flex-col items-center justify-center overflow-hidden">
      <div className="flex flex-col items-center">
        <Link to="/" className="group flex items-center gap-x-4">
          <img
            src="/logo.png"
            alt="inverse logo"
            className="aspect-square w-[4.5rem] duration-300 group-hover:-scale-y-100"
          />
          <h1 className="text-4xl font-medium">Onepanel</h1>
        </Link>
        <AuthForm
          texts={formType.texts}
          inputs={formType.inputs}
          submitAction={formType.submitAction}
        />
        <button
          className="mt-10"
          onClick={() => {
            setFormType(formTypes[formType.toggleTo as "login" | "register"]);
          }}
        >
          <p className="flex items-center gap-x-2">
            <span className="font-medium text-front text-opacity-70">
              {formType.toggleText}
            </span>
            <span className="font-semibold text-primary">
              {formType.toggleCTA}
            </span>
          </p>
        </button>
      </div>
    </section>
  );
}
