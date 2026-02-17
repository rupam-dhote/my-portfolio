import {
  AlertCircle,
  CircleCheck,
  Loader2,
  Mail,
  Send,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
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
  const [isLoading, setLoding] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    type: null,
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoding(true);
    setSubmitStatus({
      type: null,
      message: "",
    });
    try {
      const serviceId = import.meta.env.VITE_EMAIL_JS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAIL_JS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAIL_JS_PUBLIC_KEY;
      // if any of key is missing error
      if (!serviceId || !templateId || !publicKey) {
        throw new Error(
          "Email Js Configuration is Missing, check environment variables",
        );
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
          year: new Date().getFullYear(),
          site_name: "Rupam Portfolio",
          owner_name: "Rupam Dhote",
        },
        publicKey,
      );

      // set the status success
      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });

      // reset the form data if success
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log("Emailjs Error: ", error);
      setSubmitStatus({
        type: "error",
        message:
          error.text || "Failed to send message. Please try again later.",
      });
    } finally {
      setLoding(false);
    }
  };
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
  useEffect(() => {
    if (submitStatus.type) {
      const timer = setTimeout(() => {
        setSubmitStatus({ type: null });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitStatus]);
  return (
    <section
      id="cont"
      className=" min-h-screen flex flex-col  w-full py-2 px-4 md:px-8 lg:px-20 xl:px-32 overflow-hidden"
    >
      <div className=" relative container mx-auto pt-16 md:pt-24 z-10">
        <Reveal direction="left" duration={1} delay={0.5}>
          <span className="bg-linear-to-l from-indigo-300 via-indigo-400 to-indigo-500 text-transparent text-md md:text-lg bg-clip-text px-2 py-1 md:px-4 rounded-full shadow font-bold shadow-slate-600 ">
            Contact Me
          </span>
        </Reveal>

        {/* content ka div */}
        <div className="mt-5 w-full overflow-hidden rounded-xl  flex gap-2 shadow-md shadow-slate-800 border-slate-800 border ">
          {/* left part for the illustration  */}
          <Reveal
            delay={0.5}
            duration={1}
            direction="left"
            className="hidden  md:flex flex-col w-1/2 gap-2 px-2 bg-slate-900/30"
          >
            <img
              src="./contactn.png"
              className="w-[85%] h-80 mx-auto "
              alt="Contact"
            />
            <Reveal
              duration={1.2}
              delay={1}
              direction="left"
              distance={150}
              className="h-0.5 w-[90%] rounded-full mx-auto bg-linear-to-l from-violet-300 via-violet-400 to-violet-500"
            />
            <Reveal
              delay={0.5}
              duration={1}
              direction="up"
              className="mb-4 flex-col flex"
            >
              <h2 className="inline-block bg-linear-to-r from-indigo-300 via-indigo-400 to-indigo-500 text-transparent text-xl font-bold bg-clip-text mx-auto ">
                Want to connect with Me ?
              </h2>
              <Reveal delay={0.5} duration={1} direction="up">
                <span className=" flex gap-4 py-2 w-fit mx-auto rounded-full  ">
                  {connect.map((con, i) => (
                    <a
                      key={i}
                      href={con.path}
                      className="gap-1 w-fit flex hover:drop-shadow-[0_0_12px_#477ad0] flex-col items-center justify-center group "
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
          {/* Right part for the form section */}
          <div className="w-full md:w-1/2 px-2">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col px-0 md:px-6 pb-4">
                <Reveal
                  group={true}
                  delay={0.6}
                  className="mt-5 flex flex-col gap-2"
                >
                  <motion.h2
                    variants={rightTransition}
                    className=" inline-block text-lg px-2 md:p-0 sm:text-2xl font-bold text-transparent bg-linear-to-l from-violet-300 via-violet-400 to-violet-500 bg-clip-text drop-shadow-[0_0_12px_#c751ef]"
                  >
                    Let's Build Something Together
                  </motion.h2>
                  <motion.p
                    variants={rightTransition}
                    className="text-xm sm:text-lg px-2 md:px-0 text-slate-600"
                  >
                    Got an idea, project, or collaboration in mind? Let’s
                    connect and build something amazing together.
                  </motion.p>
                </Reveal>
                <Reveal group={true} className="flex flex-col mt-6">
                  {/* user Name */}

                  <motion.div
                    variants={downTransition}
                    className="flex items-center w-full bg-transparent border border-slate-800 h-12 rounded-lg overflow-hidden pl-4   shadow hover:cursor-pointer transition focus-within:shadow-slate-500"
                  >
                    <User className="size-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      autoComplete="off"
                      placeholder="John joe"
                      className="bg-transparent border-none ring-0 cursor-pointer text-gray-200 placeholder-gray-400 outline-none text-sm w-full h-full pl-2 "
                      required
                    />
                  </motion.div>

                  {/* Email */}
                  <motion.div
                    variants={downTransition}
                    className="flex items-center mt-4 w-full bg-transparent border border-slate-800 h-12 rounded-lg overflow-hidden pl-4  shadow hover:cursor-pointer transition focus-within:shadow-gray-500"
                  >
                    <Mail className="size-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      autoComplete="off"
                      placeholder="Email id"
                      className="bg-transparent border-none ring-0 text-gray-200 placeholder-gray-400 outline-none text-sm w-full h-full cursor-pointer pl-2 "
                      required
                    />
                  </motion.div>

                  {/* text area */}
                  <motion.div
                    variants={downTransition}
                    className="flex  mt-4 w-full bg-transparent border border-slate-800 rounded-lg pl-2 gap-2  shadow hover:cursor-pointer transition focus-within:shadow-gray-400"
                  >
                    <textarea
                      rows={6}
                      name="meassage"
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      autoComplete="off"
                      placeholder="write your message"
                      className="bg-transparent border-none ring-0 text-gray-200 placeholder-gray-400 outline-none text-sm w-full h-full cursor-pointer resize-none pl-2 pt-2"
                      required
                    />
                  </motion.div>
                </Reveal>
                <AnimatePresence>
                  {submitStatus.type && (
                    <motion.div
                      key={submitStatus.type}
                      initial={{ opacity: 0, y: -50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                      exit={{ opacity: 0, y: -50 }}
                      className={` mx-auto flex items-center gap-3 px-4 py-2 md:py-1 rounded-xl  w-full mt-2  md:absolute md:top-24 md:left-1/2 md:-translate-x-1/2 md:w-fit
          ${
            submitStatus.type === "success"
              ? "bg-green-500/10 border border-green-500/30 text-green-400"
              : "bg-red-500/15 border border-red-500/30 text-red-400"
          }
          `}
                    >
                      {submitStatus.type === "success" ? (
                        <CircleCheck />
                      ) : (
                        <AlertCircle />
                      )}
                      <p className="text-xs md:text-sm">
                        {submitStatus.message}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
                <Reveal delay={0.6} duration={1} direction="right">
                  <button
                    type="submit"
                    className="mt-6 w-full py-2 flex items-center justify-center gap-2 rounded-full text-white bg-indigo-500 hover:opacity-90 transition-all duration-200 cursor-pointer active:scale-95"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="size-4 text-violet-200 animate-spin" />
                        Sending..
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
