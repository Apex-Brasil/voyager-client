import { useTheme } from "next-themes";
import { useEffect } from "react";

const ThemeSwitch = () => {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <div className={`relative w-[100px] h-[60px]`}>
      <div className="toggleWrapper z-[1]">
        <input
          onChange={() =>
            setTheme(resolvedTheme === "light" ? "dark" : "light")
          }
          type="checkbox"
          className="dn"
          id="dn"
        />
        <label htmlFor="dn" className="toggle">
          <span className="toggle__handler">
            <span className="crater crater--1"></span>
            <span className="crater crater--2"></span>
            <span className="crater crater--3"></span>
          </span>
          <span className="star star--1"></span>
          <span className="star star--2"></span>
          <span className="star star--3"></span>
          <span className="star star--4"></span>
          <span className="star star--5"></span>
          <span className="star star--6"></span>
        </label>
      </div>
    </div>
  );
};

export default ThemeSwitch;
