import {
  AlertCircle,
  BadgeCheck,
  CircleCheck,
  Loader2,
  Mail,
  Send,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Reveal from "./scrollAnimation/Reveal.jsx";
import { AnimatePresence, motion } from "framer-motion";
import { connect } from "../lib/data.js";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(
    sessionStorage.getItem("formSubmitted") === "true",
  );
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const validateForm = () => {
    const errors = {};
    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName) {
      errors.name = "Please enter your name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail) {
      errors.email = "Please enter your email address.";
    } else if (!emailRegex.test(trimmedEmail)) {
      errors.email =
        "Please enter a valid email address (e.g. name@example.com).";
    }

    if (!trimmedMessage) {
      errors.message = "Please enter a message before sending.";
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (fieldErrors[field]) {
      setFieldErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus({
        type: "error",
        message: "Please fix the highlighted errors in the form.",
      });
      return;
    }

    setIsLoading(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const serviceId = import.meta.env.VITE_EMAIL_JS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "Email service configuration is currently unavailable. Please try again later.",
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          year: new Date().getFullYear(),
          site_name: "Rupam Portfolio",
          owner_name: "Rupam Dhote",
        },
        publicKey,
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });

      setTimeout(() => {
        setIsSubmitted(true);
        sessionStorage.setItem("formSubmitted", "true");
      }, 1500);

      setFormData({
        name: "",
        email: "",
        message: "",
      });
      setFieldErrors({});
    } catch (error) {
      console.error("EmailJS Error:", error);
      setSubmitStatus({
        type: "error",
        message:
          error?.text ||
          error?.message ||
          "Failed to send message. Please check your internet connection or try again later.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Auto-dismiss floating toast notifications after 5 seconds
  useEffect(() => {
    if (submitStatus.type) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null, message: "" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  const rightTransition = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  };

  const downTransition = {
    hidden: { opacity: 0, x: 140 },
    visible: {
      opacity: [0, 0.2, 0.4, 0.8, 1],
      x: 0,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section
      id="cont"
      className="w-full py-8 md:py-12 px-4 md:px-8 lg:px-20 xl:px-32 overflow-hidden md:scroll-mt-4"
    >
      <div className="relative container mx-auto pt-6 md:pt-12 z-10">
        <Reveal direction="left" duration={1} delay={0.5}>
          <span className="bg-linear-to-l from-indigo-300 via-indigo-400 to-indigo-500 text-transparent text-md md:text-lg bg-clip-text px-2 py-1 md:px-4 rounded-full shadow font-bold shadow-slate-600">
            Contact Me
          </span>
        </Reveal>

        {/* Content Container */}
        <div className="mt-5 w-full overflow-hidden rounded-xl flex gap-2 shadow-md shadow-slate-800 border-slate-800 border">
          {/* Left Illustration Section */}
          <Reveal
            delay={0.5}
            duration={1}
            direction="left"
            className="hidden md:flex flex-col w-1/2 justify-evenly gap-2 px-2 bg-slate-900/30"
          >
            <div>
              <img
                src="./contactn.png"
                className="w-[85%] mx-auto"
                alt="Contact Illustration"
              />
              <Reveal
                duration={1.2}
                delay={1}
                direction="left"
                distance={150}
                className="h-0.5 w-[90%] rounded-full mx-auto bg-linear-to-l from-violet-300 via-violet-400 to-violet-500"
              />
            </div>
            <Reveal
              delay={0.5}
              duration={1}
              direction="up"
              className="mb-4 flex-col flex"
            >
              <h2 className="inline-block bg-linear-to-r from-indigo-300 via-indigo-400 to-indigo-500 text-transparent text-xl font-bold bg-clip-text mx-auto">
                Want to connect with Me?
              </h2>
              <Reveal delay={0.5} duration={1} direction="up">
                <span className="flex gap-4 py-2 w-fit mx-auto rounded-full">
                  {connect.map((con, i) => (
                    <a
                      key={i}
                      target={con.path === "/" ? "" : "_blank"}
                      rel="noopener noreferrer"
                      href={con.path}
                      className="gap-1 w-fit flex hover:drop-shadow-[0_0_12px_#477ad0] flex-col items-center justify-center group"
                    >
                      <div className="p-2 rounded-lg bg-slate-800/40 group-hover:scale-105 transition-transform duration-200">
                        <img src={con.img} alt={con.name} className="w-7" />
                      </div>
                      <p className="text-xs font-semibold text-slate-600">
                        {con.name}
                      </p>
                    </a>
                  ))}
                </span>
              </Reveal>
            </Reveal>
          </Reveal>

          {/* Right Form Section */}
          <div className="w-full md:w-1/2 px-2">
            {isSubmitted ? (
              <Reveal className="py-10 md:py-12 flex items-center justify-center h-full w-full">
                <div className="flex flex-col items-center text-center max-w-md px-4">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full" />
                    <BadgeCheck className="relative size-16 text-emerald-500" />
                  </div>

                  <h3 className="text-xl md:text-2xl font-semibold text-slate-100">
                    Message Sent Successfully
                  </h3>

                  <p className="mt-2 text-slate-400 text-sm leading-relaxed">
                    Thank you for reaching out! Your message has been received,
                    and I'll get back to you as soon as possible.
                  </p>

                  <span className="mt-4 text-sm text-slate-500">
                    Usually within 24–48 hours.
                  </span>
                </div>
              </Reveal>
            ) : (
              <form onSubmit={handleSubmit} noValidate>
                <div className="flex flex-col px-0 md:px-6 pb-4">
                  <Reveal
                    group={true}
                    delay={0.6}
                    className="mt-5 flex flex-col gap-2"
                  >
                    <motion.h2
                      variants={rightTransition}
                      className="inline-block text-lg px-2 md:p-0 sm:text-2xl font-bold text-transparent bg-linear-to-l from-violet-300 via-violet-400 to-violet-500 bg-clip-text drop-shadow-[0_0_12px_#c751ef]"
                    >
                      Let's Build Something Together
                    </motion.h2>
                    <motion.p
                      variants={rightTransition}
                      className="text-xs sm:text-sm px-2 md:px-0 text-slate-400"
                    >
                      Got an idea, project, or collaboration in mind? Let’s
                      connect and build something amazing together.
                    </motion.p>
                  </Reveal>

                  <Reveal group={true} className="flex flex-col mt-6 gap-4">
                    {/* User Name Input */}
                    <div>
                      <motion.div
                        variants={downTransition}
                        className={`flex items-center w-full bg-transparent border h-12 rounded-lg overflow-hidden pl-4 shadow transition ${
                          fieldErrors.name
                            ? "border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.25)]"
                            : "border-slate-800 focus-within:border-indigo-500/60 focus-within:shadow-slate-500"
                        }`}
                      >
                        <User className="size-5 text-gray-400" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          autoComplete="off"
                          placeholder="Your name"
                          className="bg-transparent border-none ring-0 text-gray-200 placeholder-gray-400 outline-none text-sm w-full h-full pl-2 cursor-pointer"
                        />
                      </motion.div>
                      {fieldErrors.name && (
                        <span className="text-xs text-red-400 mt-1 pl-1 block">
                          {fieldErrors.name}
                        </span>
                      )}
                    </div>

                    {/* Email Input */}
                    <div>
                      <motion.div
                        variants={downTransition}
                        className={`flex items-center w-full bg-transparent border h-12 rounded-lg overflow-hidden pl-4 shadow transition ${
                          fieldErrors.email
                            ? "border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.25)]"
                            : "border-slate-800 focus-within:border-indigo-500/60 focus-within:shadow-gray-500"
                        }`}
                      >
                        <Mail className="size-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          autoComplete="off"
                          placeholder="Your Email"
                          className="bg-transparent border-none ring-0 text-gray-200 placeholder-gray-400 outline-none text-sm w-full h-full pl-2 cursor-pointer"
                        />
                      </motion.div>
                      {fieldErrors.email && (
                        <span className="text-xs text-red-400 mt-1 pl-1 block">
                          {fieldErrors.email}
                        </span>
                      )}
                    </div>

                    {/* Text Area */}
                    <div>
                      <motion.div
                        variants={downTransition}
                        className={`flex w-full bg-transparent border rounded-lg pl-2 gap-2 shadow transition ${
                          fieldErrors.message
                            ? "border-red-500/80 shadow-[0_0_10px_rgba(239,68,68,0.25)]"
                            : "border-slate-800 focus-within:border-indigo-500/60 focus-within:shadow-gray-400"
                        }`}
                      >
                        <textarea
                          rows={5}
                          name="message"
                          value={formData.message}
                          onChange={(e) =>
                            handleInputChange("message", e.target.value)
                          }
                          autoComplete="off"
                          placeholder="Write your message..."
                          className="bg-transparent border-none ring-0 text-gray-200 placeholder-gray-400 outline-none text-sm w-full h-full cursor-pointer resize-none pl-2 pt-2"
                        />
                      </motion.div>
                      {fieldErrors.message && (
                        <span className="text-xs text-red-400 mt-1 pl-1 block">
                          {fieldErrors.message}
                        </span>
                      )}
                    </div>
                  </Reveal>

                  {/* Submit Button */}
                  <Reveal delay={0.4} duration={0.8} direction="right">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="mt-5 w-full py-2.5 flex items-center justify-center gap-2 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 transition-all duration-200 cursor-pointer active:scale-95 font-medium shadow-md shadow-indigo-600/20"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="size-4 text-violet-200 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Message Me
                          <Send className="size-4 text-violet-200" />
                        </>
                      )}
                    </button>
                  </Reveal>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Floating Custom Toast Notification Overlay (Zero Form Dimension Impact) */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {submitStatus?.type && (
              <motion.div
                key={submitStatus.type}
                initial={{ opacity: 0, y: -25, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
                className="fixed top-7 right-5 sm:right-6 z-99999 max-w-sm w-[90vw] pointer-events-auto"
              >
                <div
                  className={`flex items-start justify-between gap-3 p-4 rounded-2xl border backdrop-blur-xl shadow-2xl ${
                    submitStatus.type === "success"
                      ? "bg-slate-950/90 border-emerald-500/40 text-emerald-200 shadow-[0_0_25px_rgba(16,185,129,0.2)]"
                      : "bg-slate-950/90 border-red-500/40 text-red-200 shadow-[0_0_25px_rgba(239,68,68,0.2)]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {submitStatus.type === "success" ? (
                      <CircleCheck className="size-5 shrink-0 text-emerald-400 mt-0.5" />
                    ) : (
                      <AlertCircle className="size-5 shrink-0 text-red-400 mt-0.5" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        {submitStatus.type === "success" ? "Success" : "Notice"}
                      </h4>
                      <p className="text-xs sm:text-sm mt-0.5 leading-snug">
                        {submitStatus.message}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSubmitStatus({ type: null, message: "" })}
                    className="text-slate-400 hover:text-white p-1 rounded-lg bg-slate-900/60 border border-slate-800 transition cursor-pointer shrink-0"
                    aria-label="Close notification"
                  >
                    <X className="size-3.5" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  );
};

export default Contact;
