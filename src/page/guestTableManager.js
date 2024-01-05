/*
Table management page (low priority)
Auto assign table based on relationship & side
List of tables (以Table為主的顯示，可能可以使用Card)
Number of checked in people at each table (regular, children, vegetarian)
Number of seats left at each table (regular, children, vegetarian)
(額外按鈕新增人) (額外按鈕移除人) Add new party: names<string>[], aliases<string>[], number of people, relationships<string>[] (Elementary friends), side (男/女/共同), table number, general notes<string>, need cake<bool>
*/

import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import GuestRawTable from "../component/guestRawTable";
import GuestSelect from "../component/guestSelect";
import { GuestDataContext } from "../context/guestDataContext";
import TableInfo from "../component/tableInfo";
import { defaultTables } from "../data/defaultTables";
import ClusterInfo from "../component/clusterInfo";

const clusterRegularCountReduction = {
  "3-3,5-1,5-2,5-3,6-2,6-3,6-5,7-3": 6,
  "6-1,7-1,7-2,7-3": 4,
};

function GuestTableManager() {
  const { fullGuestData } = React.useContext(GuestDataContext);
  const [clusters, setClusters] = React.useState({});
  const [tables, setTables] = React.useState({});
  const [selectedGuest, setSelectedGuest] = React.useState({});

  const guestNameChangeHandler = (e, value) => {
    setSelectedGuest(value ?? {});
  };

  // clear selection if the can't find the selected guest in the guest list anymore
  React.useEffect(() => {
    if (!fullGuestData.find((guest) => selectedGuest.Id === guest.Id)) {
      setSelectedGuest({});
    }
  }, [fullGuestData, selectedGuest.Id]);

  React.useEffect(() => {
    const clusters = {};
    const tables = {};
    fullGuestData.forEach((data) => {
      // Process clusters
      if (data.TableNo.length > 1) {
        const clusterKey = data.TableNo.sort().join(",");
        console.log(clusterKey);
        if (clusters[clusterKey]) {
          clusters[clusterKey].regular.actual += data.IsCheckedIn
            ? data.NoOfRegular
            : 0;
          clusters[clusterKey].vegetarian.actual += data.IsCheckedIn
            ? data.NoOfVegetarian
            : 0;
          clusters[clusterKey].childSeat.actual += data.IsCheckedIn
            ? data.NoOfChildren
            : 0;

          clusters[clusterKey].regular.assigned += data.NoOfRegular;
          clusters[clusterKey].vegetarian.assigned += data.NoOfVegetarian;
          clusters[clusterKey].childSeat.assigned += data.NoOfChildren;
        } else {
          const getDefaultTable = (tableCode) => {
            return defaultTables.find((table) => tableCode === table.tableCode);
          };
          const regularTarget =
            data.TableNo.reduce(
              (accumulator, tableCode) =>
                accumulator +
                (getDefaultTable(tableCode)?.nonreservedSeats?.regular
                  ?.target || 0),
              0
            ) - (clusterRegularCountReduction[clusterKey] || 0);
          const vegetarianTarget = data.TableNo.reduce(
            (accumulator, tableCode) =>
              accumulator +
              (getDefaultTable(tableCode)?.nonreservedSeats?.vegetarian
                ?.target || 0),
            0
          );
          const childSeatTarget = data.TableNo.reduce(
            (accumulator, tableCode) =>
              accumulator +
              (getDefaultTable(tableCode)?.nonreservedSeats?.childSeat
                ?.target || 0),
            0
          );
          clusters[clusterKey] = {
            TableNo: data.TableNo,
            tableNames: data.TableNo.map((tableCode) => {
              return getDefaultTable(tableCode)?.tableName;
            }),
            regular: {
              actual: data.IsCheckedIn ? data.NoOfRegular : 0,
              assigned: data.NoOfRegular,
              target: regularTarget,
            },
            vegetarian: {
              actual: data.IsCheckedIn ? data.NoOfVegetarian : 0,
              assigned: data.NoOfVegetarian,
              target: vegetarianTarget,
            },
            childSeat: {
              actual: data.IsCheckedIn ? data.NoOfChildren : 0,
              assigned: data.NoOfChildren,
              target: childSeatTarget,
            },
          };
        }
      }

      // Process tables
      if (data.TableNo.length === 1) {
        const tableCode = data.TableNo[0];
        if (tables[tableCode]) {
          tables[tableCode].reservedSeats.regular.actual += data.IsCheckedIn
            ? data.NoOfRegular
            : 0;
          tables[tableCode].reservedSeats.vegetarian.actual += data.IsCheckedIn
            ? data.NoOfVegetarian
            : 0;
          tables[tableCode].reservedSeats.childSeat.actual += data.IsCheckedIn
            ? data.NoOfChildren
            : 0;

          tables[tableCode].reservedSeats.regular.assigned += data.NoOfRegular;
          tables[tableCode].reservedSeats.vegetarian.assigned +=
            data.NoOfVegetarian;
          tables[tableCode].reservedSeats.childSeat.assigned +=
            data.NoOfChildren;
        } else {
          const getDefaultTable = (tableCode) => {
            return defaultTables.find((table) => tableCode === table.tableCode);
          };
          const defaultTable = getDefaultTable(tableCode);
          if (!defaultTable) {
            return;
          }
          tables[tableCode] = {
            ...defaultTable,
            reservedSeats: {
              regular: {
                actual: data.IsCheckedIn ? data.NoOfRegular : 0,
                assigned: data.NoOfRegular,
                target: defaultTable.reservedSeats.regular.target,
              },
              vegetarian: {
                actual: data.IsCheckedIn ? data.NoOfVegetarian : 0,
                assigned: data.NoOfVegetarian,
                target: defaultTable.reservedSeats.vegetarian.target,
              },
              childSeat: {
                actual: data.IsCheckedIn ? data.NoOfChildren : 0,
                assigned: data.NoOfChildren,
                target: defaultTable.reservedSeats.childSeat.target,
              },
            },
          };
        }
      }
    });

    // fill in rest of the tables
    defaultTables.forEach((table) => {
      if (!tables[table.tableCode]) {
        tables[table.tableCode] = table;
      }
    });

    setClusters(clusters);
    setTables(tables);
  }, [fullGuestData]);

  return (
    <>
      <Grid item xs={12}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* <GuestSelect
            fullGuestData={fullGuestData}
            selectedGuest={selectedGuest}
            guestNameChangeHandler={guestNameChangeHandler}
          /> */}
          {/* <GuestDetail guest={selectedGuest}></GuestDetail> */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              gap: "20px",
              flexWrap: "wrap",
              // marginTop: "20px",
            }}
          >
            {Object.keys(clusters).map((clusterKey) => (
              <ClusterInfo
                tableCodes={clusters[clusterKey].TableNo}
                tableNames={clusters[clusterKey].tableNames}
                nonreservedSeats={{
                  regular: clusters[clusterKey].regular,
                  vegetarian: clusters[clusterKey].vegetarian,
                  childSeat: clusters[clusterKey].childSeat,
                }}
              />
            ))}
            {Object.keys(tables)
              .sort()
              .map((tableCode) => {
                return tables[tableCode];
              })
              .filter(
                (table) =>
                  table.reservedSeats.regular.target ||
                  table.reservedSeats.vegetarian.target ||
                  table.reservedSeats.childSeat.target
              )
              .map((table) => (
                <TableInfo
                  tableCode={table.tableCode}
                  tableName={table.tableName}
                  reservedSeats={table.reservedSeats}
                  nonreservedSeats={table.nonreservedSeats}
                />
              ))}
          </div>
        </Paper>
      </Grid>
      {/* Guest Data */}
      <Grid item xs={12}>
        <Paper sx={{ p: 2, mt: 2, display: "flex", flexDirection: "column" }}>
          <GuestRawTable />
        </Paper>
      </Grid>
    </>
  );
}

export default GuestTableManager;
