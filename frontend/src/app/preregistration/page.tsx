"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { AxiosError } from "axios";
import axios from "../https/api";

import logo from "./_assets/Pre-Registration-page-logo.png";
import Background from "./_assets/Background.png";
import dbimg from "./_assets/DownloadOutline.png";

import ErrorBox from "./errorBox";
import ResponseBox from "./responseBox";

const PDF_FILE_URL = "/Brochure.pdf";

const PreRegistrationForm: React.FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const flag = params.get("isVerified");

  const [isVerified, setIsVerified] = useState(false);
  const [responseMsg, setResponseMsg] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    schoolName: "",
    contactNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    category: "",
    schoolName: "",
    contactNumber: "",
    email: "",
    text: "",
  });

  // Sync verified flag
  useEffect(() => {
    setIsVerified(flag === "true");
  }, [flag]);

  // Pre-fill from query params
  useEffect(() => {
    setFormData({
      name: params.get("name") || "",
      category: params.get("category") || "",
      schoolName: params.get("schoolName") || "",
      contactNumber: params.get("contactNumber") || "",
      email: params.get("email") || "",
    });
  }, [params]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((f) => ({ ...f, [e.target.id]: e.target.value }));
  };

  const handleClickVerify = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!formData.email) {
      return setErrors((err) => ({
        ...err,
        email: "Email address cannot be empty",
      }));
    }
    if (!isVerified) {
      try {
        await axios.post("/sendOtp", { email: formData.email });
        router.push(
          `/mailverification?email=${formData.email}&category=${formData.category}&name=${formData.name}&schoolName=${formData.schoolName}&contactNumber=${formData.contactNumber}`
        );
      } catch {
        // ignore errors
      }
    } else {
      setResponseMsg("Email already verified");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResponseMsg("");
    if (!isVerified) {
      return setErrors((err) => ({
        ...err,
        text: "Registration Failed! Verify your email first.",
      }));
    }
    try {
      await axios.post("/auth/register", { formData });
      router.push("/success");
    } catch (err) {
      if (
        err instanceof Error &&
        (err as any).response &&
        (err as any).response.data
      ) {
        const axiosErr = err as AxiosError<{
          errors?: Record<string, string>;
          error?: string;
        }>;
        const errs = axiosErr.response!.data.errors || {};
        setErrors({
          name: errs.name || "",
          category: errs.category || "",
          schoolName: errs.schoolName || "",
          contactNumber: errs.contactNumber || "",
          email: errs.email || "",
          text: axiosErr.response!.data.error || "",
        });
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-3xl mx-auto flex flex-col space-y-6 py-8"
    >
      <h1 className="text-[#AF0034] text-4xl font-extrabold text-center">
        PRE-REGISTRATION
      </h1>

      {/* NAME */}
      <div>
        <label htmlFor="name" className="block font-semibold mb-1">
          NAME
        </label>
        <ErrorBox message={errors.name} />
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={handleInputChange}
          className="w-full border-2 border-[#AF0034] rounded-lg px-4 py-2"
        />
      </div>

      {/* CATEGORY */}
      <div>
        <label htmlFor="category" className="block font-semibold mb-1">
          CATEGORY
        </label>
        <ErrorBox message={errors.category} />
        <select
          id="category"
          value={formData.category}
          onChange={handleInputChange}
          className="w-full border-2 border-[#AF0034] rounded-lg px-4 py-2"
        >
          <option value="">Choose a category</option>
          <option value="ARETEOX">ARETEOX</option>
          <option value="METIOX">METIOX</option>
          <option value="APOLLOX">APOLLOX</option>
          <option value="ATHENOX">ATHENOX</option>
        </select>
      </div>

      {/* SCHOOL NAME */}
      <div>
        <label htmlFor="schoolName" className="block font-semibold mb-1">
          SCHOOL NAME
        </label>
        <ErrorBox message={errors.schoolName} />
        <input
          id="schoolName"
          type="text"
          value={formData.schoolName}
          onChange={handleInputChange}
          className="w-full border-2 border-[#AF0034] rounded-lg px-4 py-2"
        />
      </div>

      {/* CONTACT NUMBER */}
      <div>
        <label htmlFor="contactNumber" className="block font-semibold mb-1">
          CONTACT NUMBER
        </label>
        <ErrorBox message={errors.contactNumber} />
        <input
          id="contactNumber"
          type="text"
          placeholder="Enter your correct mobile number. This cannot be modified later."
          value={formData.contactNumber}
          onChange={handleInputChange}
          className="w-full border-2 border-[#AF0034] rounded-lg px-4 py-2 placeholder-[#AF0034]"
        />
      </div>

      {/* EMAIL & VERIFY */}
      <div>
        <label htmlFor="email" className="block font-semibold mb-1">
          EMAIL ADDRESS
        </label>
        <ErrorBox message={errors.email} />
        <div className="flex items-center space-x-4">
          <input
            id="email"
            type="email"
            disabled={isVerified}
            value={formData.email}
            onChange={handleInputChange}
            className="flex-1 border-2 border-[#AF0034] rounded-lg px-4 py-2"
          />
          {!isVerified ? (
            <button
              onClick={handleClickVerify}
              className="px-4 py-2 border border-[#AF0034] rounded-lg text-[#AF0034] font-semibold hover:bg-[#ec581e]"
            >
              VERIFY
            </button>
          ) : (
            <span className="px-4 py-2 bg-[#39b79c] rounded-lg text-white font-semibold">
              VERIFIED
            </span>
          )}
        </div>
      </div>

      <ErrorBox message={errors.text} />
      <ResponseBox message={responseMsg} />

      <button
        type="submit"
        className="mt-4 w-full bg-[#BC6E26] text-white font-semibold py-3 rounded-lg hover:bg-[#e94a1e]"
      >
        PRE-REGISTER NOW
      </button>
    </form>
  );
};

export default function Page() {
  const bgStyle: React.CSSProperties = {
    backgroundImage: `url(${Background.src})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    minHeight: "150vh",
    width: "100%",
  };

  return (
    <div style={bgStyle} className="relative text-black overflow-auto">
      {/* Navbar */}
      <nav className="flex justify-between items-center py-8 mx-4 sm:mx-16">
        <Image
          src={logo}
          alt="Gambitor Logo"
          className="w-[138px] sm:w-[307px]"
        />
        <a href={PDF_FILE_URL} download>
          <button className="flex items-center border-2 border-black rounded-md p-2 sm:p-4">
            <span className="text-[#AF0034] font-semibold text-[18px] sm:text-[25.5px] mr-2">
              Download Brochure
            </span>
            <Image
              src={dbimg}
              alt="Download Icon"
              className="w-[1rem] sm:w-[2rem]"
            />
          </button>
        </a>
      </nav>

      {/* Pre‑Registration Form below */}
      <div className="relative z-10 px-4 sm:px-8 py-12">
        <Suspense fallback={<div>Loading…</div>}>
          <PreRegistrationForm />
        </Suspense>
      </div>
    </div>
  );
}