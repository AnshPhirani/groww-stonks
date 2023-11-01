import React, { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./Header.module.css";
import Link from "next/link";
import Switch from "react-switch";
import SearchInput from "../searchInput/SearchInput";
import { Icon } from "@iconify/react";

const Header = () => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme) {
      document.documentElement.dataset.theme = theme;
      setTheme(theme);
    }
  }, []);

  const handleThemeChange = () => {
    if (theme === "dark") {
      document.documentElement.dataset.theme = "light";
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      document.documentElement.dataset.theme = "dark";
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.header__left}>
          <Image
            src="/images/groww.svg"
            alt="logo"
            width={40}
            height={40}
            objectFit="contain"
          />
          <h2 className={styles.logoText}>Groww Stonks</h2>
        </div>
      </Link>

      <SearchInput />

      <div className={styles.header__right}>
        <Switch
          checked={theme === "dark" ? true : false}
          onChange={handleThemeChange}
          offColor="#00F3BB"
          onColor="#5367FF"
          offHandleColor="#000"
          onHandleColor="#fff"
          boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
          className={styles.switch}
          handleDiameter={15}
          width={60}
          height={30}
          uncheckedIcon={
            <Icon
              icon="twemoji:owl"
              style={{
                display: "block",
                height: "100%",
                fontSize: 25,
                textAlign: "end",
                marginLeft: "10px",
                color: "#353239",
              }}
            />
          }
          checkedIcon={
            <Icon
              icon="noto:sun-with-face"
              style={{
                display: "block",
                height: "100%",
                fontSize: 25,
                textAlign: "end",
                marginLeft: "5px",
                color: "#baaa80",
              }}
            />
          }
          id="icon-switch"
        />
      </div>
    </header>
  );
};

export default Header;
