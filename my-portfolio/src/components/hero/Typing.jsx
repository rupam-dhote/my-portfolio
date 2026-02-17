import { useEffect, useRef, useState } from "react";

const Typing = ({ typingSpeed = 140, deleteSpeed = 100, roles }) => {
  const [isDeleting, setDeleting] = useState(false);
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isPause, setIsPause] = useState(false);

  const timeoutRef = useRef(null);

  useEffect(() => {
    if (isPause) return;
    // check cuurent role
    const currentRole = roles[index];

    // checking for writing or deliting
    if (!isDeleting && charIndex < currentRole.length) {
      //typing karo
      timeoutRef.current = setTimeout(() => {
        setText(currentRole.slice(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }, typingSpeed);
    } else if (isDeleting && charIndex > 0) {
      // deleting...

      timeoutRef.current = setTimeout(() => {
        setText(currentRole.slice(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      }, deleteSpeed);
    } else if (!isDeleting && charIndex === currentRole.length) {
      // likh ke hogya to wait karo
      timeoutRef.current = setTimeout(() => {
        setDeleting(true);
      }, 1000);
    } else if (isDeleting && charIndex == 0) {
      // delete krna band karo or new role pe jao
      setDeleting(false);
      setIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [index, charIndex, isDeleting, typingSpeed, deleteSpeed, roles, isPause]);

  //  pause when tab is hidden
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsPause(true);
        clearTimeout(timeoutRef.current);
        setCharIndex((p) => p);
      } else {
        setIsPause(false);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  return (
    <>
      <span className="  text-primary drop-shadow-[0_0_12px_rgba(99,102,241,0.8)]">
        {text}
      </span>
      <span className="animate-ping duration-75 text-primary">|</span>
    </>
  );
};

export default Typing;
