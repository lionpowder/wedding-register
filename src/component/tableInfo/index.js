import React from "react";
import { Doughnut } from "react-chartjs-2";
import styles from "./tableInfo.module.css"; // Create a CSS module for styling
import { Chart, ArcElement } from "chart.js";

Chart.register(ArcElement);

const TableInfo = ({
  tableCode,
  tableName,
  reservedSeats,
  nonreservedSeats,
}) => {
  // const calculateDifference = (seats) => {
  //   const actualSum =
  //     seats?.reduce((sum, seat) => sum + seat?.actual || 0, 0) || 0;
  //   const targetSum =
  //     seats?.reduce((sum, seat) => sum + seat?.target || 0, 0) || 0;
  //   return targetSum - actualSum;
  // };

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
    actualSum: reservedActualSum,
    assignedSum: reservedAssignedSum,
    targetSum: reservedTargetSum,
  } = calculateSum([
    reservedSeats.regular,
    reservedSeats.vegetarian,
    reservedSeats.childSeat,
  ]);

  const {
    // actualSum: nonreservedActualSum,
    // assignedSum: nonreservedAssignedSum,
    targetSum: nonreservedTargetSum,
  } = calculateSum([
    nonreservedSeats?.regular,
    nonreservedSeats?.vegetarian,
    nonreservedSeats?.childSeat,
  ]);

  // const reservedDifference = calculateDifference([
  //   reservedSeats.regular,
  //   reservedSeats.vegetarian,
  //   reservedSeats.childSeat,
  // ]);

  // const nonReservedDifference = calculateDifference([
  //   nonreservedSeats?.regular,
  //   nonreservedSeats?.vegetarian,
  //   nonreservedSeats?.childSeat,
  // ]);

  const remainingAssignable = reservedTargetSum - reservedAssignedSum;
  const unoccupiedAssigned = reservedAssignedSum - reservedActualSum;

  const pieChartData = {
    labels: ["已到 - 指定座", "未到 - 指定座", "可指定 - 指定座", "自由座"],
    datasets: [
      {
        data: [
          Math.max(reservedActualSum, 0),
          Math.max(unoccupiedAssigned, 0),
          Math.max(remainingAssignable, 0),
          Math.max(nonreservedTargetSum, 0),
        ],
        backgroundColor: [
          "rgba(30,144,255,1)",
          "rgba(30,144,255,0.5)",
          "rgba(200,200,200,0.1)",
          "rgba(169,169,169,0.7)",
        ],
      },
    ],
  };

  return (
    <div className={styles.container}>
      <h1>
        {tableCode}
        <div className={styles.chart}>
          <div>
            <Doughnut data={pieChartData} />
          </div>
        </div>
      </h1>
      <p className={styles.subtitle}>{tableName}</p>

      {/* Reserved Seats Section */}
      <div className={styles.section}>
        <h4>{`預定位: ${
          (reservedSeats?.regular?.target || 0) +
          (reservedSeats?.vegetarian?.target || 0)
        }大${
          reservedSeats?.childSeat?.target
            ? ` ${reservedSeats?.childSeat?.target}小`
            : ``
        }`}</h4>
        <p>
          未入席/可指定:{" "}
          <strong>
            {unoccupiedAssigned}/{remainingAssignable}
          </strong>
        </p>
        <ul className={styles.light}>
          <li>{`(已入座/已指定/總座數)`}</li>
          <li>
            一般: {reservedSeats.regular.actual}/
            {reservedSeats.regular.assigned}/{reservedSeats.regular.target}
          </li>
          <li>
            素食: {reservedSeats.vegetarian.actual}/
            {reservedSeats.vegetarian.assigned}/
            {reservedSeats.vegetarian.target}
          </li>
          <li>
            兒童座: {reservedSeats.childSeat.actual}/
            {reservedSeats.childSeat.assigned}/{reservedSeats.childSeat.target}
          </li>
        </ul>
      </div>

      {/* Non-Reserved Seats Section */}
      {Boolean(nonreservedTargetSum) && (
        <div className={styles.section}>
          <h4>{`自由座: ${nonreservedTargetSum}`}</h4>
        </div>
      )}
    </div>
  );
};

export default TableInfo;
