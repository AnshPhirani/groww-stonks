import React from "react";
import styles from "./AboutCompany.module.css";

const AboutCompany = ({ companyData }) => {
  if (JSON.stringify(companyData) === "{}") {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.containerHeader}>
        <h1>
          {companyData.Name} <span>({companyData.Symbol})</span>{" "}
        </h1>
        <h3>{companyData.Exchange}</h3>
      </div>
      <h4>About {companyData.Name}</h4>
      <p className={styles.about}>{companyData.Description}</p>
      <div className={styles.tags}>
        <p>Industry : {companyData.Industry}</p>
        <p>Sector : {companyData.Sector}</p>
      </div>
    </div>
  );
};

export default AboutCompany;
