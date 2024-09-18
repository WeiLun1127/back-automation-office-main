import React from "react";
import Flag from "react-world-flags";

const dataTableData = {
  columns: [
    { Header: "id", accessor: "id", width: "5%" },
    { Header: "currency", accessor: "currency", width: "10%" },
    { Header: "country", accessor: "country", width: "15%" }, // Increased width for flag + country name
    { Header: "rate", accessor: "rate", width: "10%" },
    { Header: "ratio", accessor: "ratio", width: "10%" },
  ],

  rows: [
    {
      id: 1,
      currency: "MYR",
      country: (
        <div>
          <Flag code="MY" style={{ width: "20px", marginRight: "10px" }} />
          Malaysia
        </div>
      ),
      rate: "1", // Base rate
      ratio: "1",
      status: 1,
    },
    {
      id: 2,
      currency: "SGD",
      country: (
        <div>
          <Flag code="SG" style={{ width: "20px", marginRight: "10px" }} />
          Singapore
        </div>
      ),
      rate: "0.31", // Example: 1 MYR = 0.31 SGD
      ratio: "1",
      status: 1,
    },
    {
      id: 3,
      currency: "JPY",
      country: (
        <div>
          <Flag code="JP" style={{ width: "20px", marginRight: "10px" }} />
          Japan
        </div>
      ),
      rate: "30.50", // Example: 1 MYR = 30.50 JPY
      ratio: "1",
      status: 1,
    },
    {
      id: 4,
      currency: "KRW",
      country: (
        <div>
          <Flag code="KR" style={{ width: "20px", marginRight: "10px" }} />
          Korea
        </div>
      ),
      rate: "280", // Example: 1 MYR = 280 KRW
      ratio: "1",
      status: 1,
    },
    {
      id: 5,
      currency: "THB",
      country: (
        <div>
          <Flag code="TH" style={{ width: "20px", marginRight: "10px" }} />
          Thailand
        </div>
      ),
      rate: "7.55", // Example: 1 MYR = 7.55 THB
      ratio: "1",
      status: 1,
    },
    {
      id: 6,
      currency: "VND",
      country: (
        <div>
          <Flag code="VN" style={{ width: "20px", marginRight: "10px" }} />
          Vietnam
        </div>
      ),
      rate: "5462", // Example: 1 MYR = 5462 VND
      ratio: "1",
      status: 1,
    },
    {
      id: 7,
      currency: "IDR",
      country: (
        <div>
          <Flag code="ID" style={{ width: "20px", marginRight: "10px" }} />
          Indonesia
        </div>
      ),
      rate: "3300", // Example: 1 MYR = 3300 IDR
      ratio: "1",
      status: 1,
    },
    {
      id: 8,
      currency: "INR",
      country: (
        <div>
          <Flag code="IN" style={{ width: "20px", marginRight: "10px" }} />
          India
        </div>
      ),
      rate: "18.45", // Example: 1 MYR = 18.45 INR
      ratio: "1",
      status: 1,
    },
  ],
};

export default dataTableData;
