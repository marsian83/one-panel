import { useEffect, useState } from "react";
import MaterialIcon from "../../common/MaterialIcon";
import AuthInput from "./components/AuthInput";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "./components/AuthForm";

const formTypes = {
  login: {
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
      {
        icon: "e0da",
        name: "password",
        password: true,
        placeholder: "Confirm Password",
      },
    ],

    submitAction: (data: object) => {
      console.log(data);
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

    submitAction: (data: object) => {
      console.log(data);
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

export default function AuthPage() {
  const [formType, setFormType] = useState(formTypes.login);

  const navigate = useNavigate();

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
