import React from "react";
import { Doughnut } from "react-chartjs-2";
import styles from "./clusterInfo.module.css"; // Create a CSS module for styling
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const ClusterInfo = ({ tableCodes, tableNames, nonreservedSeats }) => {
  const calculateDifference = (seats) => {
    const actualSum =
      seats?.reduce((sum, seat) => sum + seat?.actual || 0, 0) || 0;
    const targetSum =
      seats?.reduce((sum, seat) => sum + seat?.target || 0, 0) || 0;
    return targetSum - actualSum;
  };

  const calculateSum = (seats) => {
    const actualSum =
      seats?.reduce((sum, seat) => sum + seat?.actual || 0, 0) || 0;
    const assignedSum =
      seats?.reduce((sum, seat) => sum + seat?.assigned || 0, 0) || 0;
    const targetSum =
      seats?.reduce((sum, seat) => sum + seat?.target || 0, 0) || 0;
    return { actualSum, assignedSum, targetSum };
  };

  const {
    actualSum: nonreservedActualSum,
    assignedSum: nonreservedAssignedSum,
    targetSum: nonreservedTargetSum,
  } = calculateSum([
    nonreservedSeats?.regular,
    nonreservedSeats?.vegetarian,
    nonreservedSeats?.childSeat,
  ]);

  const nonReservedDifference = calculateDifference([
    nonreservedSeats?.regular,
    nonreservedSeats?.vegetarian,
    nonreservedSeats?.childSeat,
  ]);

  const remainingAssignable = nonreservedTargetSum - nonreservedAssignedSum;
  const unoccupiedAssigned = nonreservedAssignedSum - nonreservedActualSum;

  const pieChartData = {
    labels: ["已到 - 自由座", "空位 - 自由座", "可指定 - 自由座"],
    datasets: [
      {
        data: [nonreservedActualSum, unoccupiedAssigned, remainingAssignable],
        backgroundColor: [
          "rgba(30,144,255,1)",
          "rgba(30,144,255,0.5)",
          "rgba(100,200,100,0.7)",
        ],
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h1>
        {tableCodes.join(", ")}
        <div className={styles.chart}>
          <div>
            <Doughnut data={pieChartData} />
          </div>
        </div>
      </h1>
      <p className={styles.subtitle}>{tableNames.join(", ")}</p>

      {/* Reserved Seats Section */}
      <div className={styles.section}>
        <h4>{`自由座: ${nonreservedTargetSum}`}</h4>
        <p>
          未入席/可指定:{" "}
          <strong>
            {unoccupiedAssigned}/{remainingAssignable}
          </strong>
        </p>
        <ul className={styles.light}>
          <li>{`(已入座/已指定/總座數)`}</li>
          <li>
            一般: {nonreservedSeats?.regular?.actual || 0}/
            {nonreservedSeats?.regular?.assigned || 0}/
            {nonreservedSeats?.regular?.target || 0}
          </li>
          <li>
            素食: {nonreservedSeats?.vegetarian?.actual || 0}/
            {nonreservedSeats?.vegetarian?.assigned || 0}/
            {nonreservedSeats?.vegetarian?.target || 0}
          </li>
          <li>
            兒童座: {nonreservedSeats?.childSeat?.actual || 0}/
            {nonreservedSeats?.childSeat?.assigned || 0}/
            {nonreservedSeats?.childSeat?.target || 0}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ClusterInfo;
