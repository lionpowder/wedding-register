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
  const calculateDifference = (seats) => {
    const actualSum = seats.reduce((sum, seat) => sum + seat.actual, 0);
    const targetSum = seats.reduce((sum, seat) => sum + seat.target, 0);
    return targetSum - actualSum;
  };

  const calculateSum = (seats) => {
    const actualSum = seats.reduce((sum, seat) => sum + seat.actual, 0);
    const targetSum = seats.reduce((sum, seat) => sum + seat.target, 0);
    return { actualSum, targetSum };
  };

  const { actualSum: reservedActualSum, targetSum: reservedTargetSum } =
    calculateSum([
      reservedSeats.regular,
      reservedSeats.vegetarian,
      reservedSeats.childSeat,
    ]);

  const { actualSum: nonreservedActualSum, targetSum: nonreservedTargetSum } =
    calculateSum([
      nonreservedSeats.regular,
      nonreservedSeats.vegetarian,
      nonreservedSeats.childSeat,
    ]);

  const reservedDifference = calculateDifference([
    reservedSeats.regular,
    reservedSeats.vegetarian,
    reservedSeats.childSeat,
  ]);

  const nonReservedDifference = calculateDifference([
    nonreservedSeats.regular,
    nonreservedSeats.vegetarian,
    nonreservedSeats.childSeat,
  ]);

  const pieChartData = {
    labels: ["自由座", "空位 - 預定坐", "已到 - 預定坐"],
    datasets: [
      {
        data: [
          nonreservedSeats.regular.target +
            nonreservedSeats.vegetarian.target +
            nonreservedSeats.childSeat.target,
          reservedDifference,
          reservedSeats.regular.actual +
            reservedSeats.vegetarian.actual +
            reservedSeats.childSeat.actual,
        ],
        backgroundColor: [
          "rgba(169,169,169,0.7)",
          "rgba(100,200,100,0.7)",
          "rgba(30,144,255,0.7)",
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
      <h3>{tableName}</h3>

      {/* Reserved Seats Section */}
      <div className={styles.section}>
        <h4>{`預定位: ${reservedActualSum}/${reservedTargetSum} (餘: ${
          reservedTargetSum - reservedActualSum
        })`}</h4>
        <ul>
          <li>
            一般: {reservedSeats.regular.actual}/{reservedSeats.regular.target}
          </li>
          <li>
            素食: {reservedSeats.vegetarian.actual}/
            {reservedSeats.vegetarian.target}
          </li>
          <li>
            兒童座: {reservedSeats.childSeat.actual}/
            {reservedSeats.childSeat.target}
          </li>
        </ul>
      </div>

      {/* Non-Reserved Seats Section */}
      <div className={styles.section}>
        <h4>{`自由座: ${nonreservedTargetSum}`}</h4>
      </div>
    </div>
  );
};

export default TableInfo;
