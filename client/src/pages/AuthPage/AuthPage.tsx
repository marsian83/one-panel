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
    <section className="p-page relative flex h-screen flex-col items-center justify-center overflow-hidden">
      <div className="absolute left-1/2 top-0 -z-10 h-[400vh] w-[170vw] -translate-x-1/2 -translate-y-[183vh] animate-[auth-bg-glow_5000ms_infinite] bg-[radial-gradient(#00000055_1%,_transparent_56%)]" />
      <div className="absolute left-0 top-0 -z-20 h-full w-full bg-[url('/images/auth-bg.jpg')] bg-cover" />
      <div className="absolute left-0 top-0 -z-[18] h-full w-full bg-gradient-to-br from-primary to-secondary bg-cover opacity-10" />

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

      <button
        className="group absolute left-14 top-10 flex items-center gap-x-2 text-sm tracking-tight duration-500"
        onClick={() => navigate(-1)}
      >
        <MaterialIcon
          codepoint="e5c4"
          className="text-3xl duration-inherit group-hover:-scale-y-100"
        />
        <p className="duration-inherit hover:drop-shadow-lg group-hover:translate-x-1 group-hover:scale-110">
          Back
        </p>
      </button>
    </section>
  );
}
