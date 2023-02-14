import React, { useMemo, useState } from "react";
import { customersData } from "./consumersData";
import Subtable from "./Subtable";
import { generateALSQLWhereClause } from "./Filter_utils";
import alasql from "alasql";

function Table() {
  const [tags, setTags] = useState([]);
  const [metricValueVoucher, setMetricValueVoucher] = useState({
    min: 0,
    max: 0,
  });
  const [metricValueIdentityNumber, setMetricValueIdentityNumber] = useState({
    min: 0,
    max: 0,
  });

  // let data = useMemo(() => customersData()[0], []);
  const [data, setData] = useState(customersData()[0]);

  const handleTagChange = (event) => {
    if (event.target.checked) {
      setTags([...tags, event.target.value]);
    } else {
      let newTags = tags.filter((tag) => tag !== event.target.value);
      setTags(newTags);
    }
  };

  const handleMetricVoucher = (event) => {
    let value = parseInt(event.target.value);

    if (event.target.name === "min") {
      setMetricValueVoucher({ ...metricValueVoucher, min: value });
    } else if (event.target.name === "max") {
      setMetricValueVoucher({ ...metricValueVoucher, max: value });
    } else {
      return;
    } // invalid input name provided - do nothing
  };
  const handleMetricIdentityNumber = (event) => {
    let value = parseInt(event.target.value);

    if (event.target.name === "min") {
      setMetricValueIdentityNumber({
        ...metricValueIdentityNumber,
        min: value,
      });
    } else if (event.target.name === "max") {
      setMetricValueIdentityNumber({
        ...metricValueIdentityNumber,
        max: value,
      });
    } else {
      return;
    } // invalid input name provided - do nothing
  };
  let voucherFilterData;

  const handleFilterVoucher = () => {
    voucherFilterData = [metricValueVoucher.min, metricValueVoucher.max];
    mainFilter(voucherFilterData, identityFilterData, searchData);
    console.log(voucherFilterData,"voucherFilterData");
  };
  let identityFilterData;
  const handleFilterIdentityNumber = () => {
    identityFilterData = [
      metricValueIdentityNumber.min,
      metricValueIdentityNumber.max,
    ];
    console.log(identityFilterData,"identityFilterData");
    mainFilter(voucherFilterData, identityFilterData, searchData);
  };
  const mainFilter = (voucherFilterData, identityFilterData, searchData) => {
    let voucherFilter = generateALSQLWhereClause(
      voucherFilterData,
      "voucherNo",
      "rangeFilter"
    );
    let identityNumberFilter = generateALSQLWhereClause(
      identityFilterData,
      "customerNumber",
      "rangeFilter"
    );

    let whereClause =
      "(" + voucherFilter + ") AND (" + identityNumberFilter + ") ";
    if (searchData) {
      whereClause =
        whereClause +
        " AND (customer LIKE '" +
        searchData +
        "%' OR  deposit LIKE '" +
        searchData +
        "%' OR  voucherNo LIKE '" +
        searchData +
        "%' OR  status LIKE '" +
        searchData +
        "%' OR  customerNumber LIKE '" +
        searchData +
        "%')";
    }
    let finalQuery = "SELECT * FROM ? WHERE" + whereClause;
    let resultData = alasql(finalQuery, [data]);
    setData(resultData);
  };
  let searchData = "";
  const handleSearch = (value) => {
    searchData = value;
    mainFilter(voucherFilterData, identityFilterData, searchData);
  };
  const columns = useMemo(
    () => [
      {
        Header: "Tag1 (Name)",
        accessor: "customer",
      },
      {
        Header: "Tag2(Email)",
        accessor: "CustomerEmail",
      },
      {
        Header: "Tag3 (Status)",
        accessor: "status",
      },
      {
        Header: "Metric1",
        accessor: "voucherNo",
      },
      {
        Header: "Metric2",
        accessor: "customerNumber",
      },
    ],
    []
  );
  return (
    <>
      <div>
        <h1 className="flex justify-center items-center w-screem  mt-96 text-3xl text-blue-400">
          Table Content
        </h1>
        <div>
          <input
            type="search"
            placeholder="Search"
            className="border border-2 w-40 p-2"
            onChange={(e) => handleSearch(e.target.value)}
          />
          <div className="flex flex-row space-x-20 mt-4">
            <h3>Filter by Voucher Number</h3>
            <div>
              Min:
              <input
                type="number"
                className="border border-2 w-20"
                name="min"
                onChange={handleMetricVoucher}
              />
              Max:
              <input
                type="number"
                name="max"
                onChange={handleMetricVoucher}
                className="border border-2 w-20"
              />
              <button
                className="bg-blue-400 rounded-md px-2 "
                onClick={handleFilterVoucher}
              >
                Go
              </button>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-row space-x-20 my-5">
            <h3>Filter by Identity Number</h3>
            <div>
              Min:
              <input
                type="number"
                className="border border-2 w-20"
                name="min"
                onChange={handleMetricIdentityNumber}
              />
              Max:
              <input
                type="number"
                name="max"
                onChange={handleMetricIdentityNumber}
                className="border border-2 w-20"
              />
              <button
                className="bg-blue-400 rounded-md px-2 "
                onClick={handleFilterIdentityNumber}
              >
                Go
              </button>
            </div>
          </div>
        </div>

        <Subtable columns={columns} data={data} />
      </div>
    </>
  );
}

export default Table;

//
