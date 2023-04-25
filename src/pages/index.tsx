import Image from "next/image";
import Typed from "typed.js";
import { useRef, useEffect } from "react";
import Img1 from "../../public/images/img1.svg";

export default function Home() {
  const typedRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Create", "Read", "Update", "Delete"],
      typeSpeed: 100,
      backSpeed: 100,
      showCursor: true,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <div>
      <header className="container max-w-3xl flex flex-col-reverse justify-center items-center gap-6 mx-auto text-center md:flex-row md:justify-between">
        <Image
          src={Img1}
          alt="default manager"
          width={300}
          height={300}
          className="w-72 h-64"
          priority
        />
        <div>
          <h1 className="text-3xl font-medium dark:text-white">
            Log in and unlock all features...
          </h1>
          <span
            ref={typedRef}
            className="text-4xl text-sky-400 typed-cursor"
          ></span>
        </div>
      </header>
      <footer className="absolute w-full bottom-0 pb-2">
        <div className="text-2xl text-center dark:text-white">
          <p>&copy; Juan Isturiz</p>
        </div>
      </footer>
    </div>
  );
}
