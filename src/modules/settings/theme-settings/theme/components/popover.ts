/**
=========================================================
* Material Dashboard 2 PRO React TS - v1.0.2
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-2-pro-react-ts
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// Material Dashboard 2 PRO React TS Helper Functions
import pxToRem from "../functions/pxToRem";

// Material Dashboard 2 PRO React TS Base Styles
import colors from "../base/colors";
import boxShadows from "../base/boxShadows";
import borders from "../base/borders";

const { transparent } = colors;
const { lg } = boxShadows;
const { borderRadius } = borders;

// types
type Types = any;

const popover: Types = {
  styleOverrides: {
    paper: {
      backgroundColor: transparent.main,
      boxShadow: lg,
      padding: pxToRem(8),
      borderRadius: borderRadius.md,
    },
  },
};

export default popover;
