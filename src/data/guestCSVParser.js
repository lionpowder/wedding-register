import React, { useEffect, useState } from "react";
import { generateNewGuestData } from "./guestData";
import { addGuestData } from "../db/cloudDb";

const GuestCSVParser = () => {
  const [csvData, setCSVData] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvString = e.target.result;
        const parsedData = parseCSV(csvString);
        setCSVData(parsedData);
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (csvString) => {
    const rows = csvString.replaceAll("\r", "").split("\n");
    const headers = rows[0].split(",");

    const parsedData = rows.slice(1).map((row) => {
      const columns = row.split(",");

      return headers.reduce((acc, header, index) => {
        let value;

        if (
          header === "Name" ||
          header === "Alias" ||
          header === "TableNo" ||
          header === "Relationship"
        ) {
          value = columns[index].split(" ").filter(Boolean);
        } else if (
          header === "NoOfVegetarian" ||
          header === "NoOfChildren" ||
          header === "NoOfRegular" ||
          header === "TotalPeople"
        ) {
          value = Number.isNaN(parseInt(columns[index], 10))
            ? undefined
            : parseInt(columns[index], 10);
        } else if (header === "NeedCake") {
          value = columns[index].toLowerCase() === "true";
        } else {
          value = columns[index] || undefined;
        }

        return { ...acc, [header]: value };
      }, {});
    });

    return parsedData;
  };

  useEffect(() => {
    csvData.forEach((item) => {
      addGuestData(generateNewGuestData(item));
    });
  }, [csvData]);

  return <input type="file" onChange={handleFileChange} accept=".csv" />;
};

export default GuestCSVParser;
