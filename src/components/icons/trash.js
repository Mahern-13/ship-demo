import React from "react";
import Wrapper from "../wrapper";
import { DISABLED_COLOR } from "../../consts";

const disabledFill = DISABLED_COLOR;

function TrashIcon({ size, onClick, disabled }) {
  return (
    <Wrapper disabled={disabled} styling={{ padding: "0" }}>
      <svg
        data-testid="trash-icon-id"
        onClick={onClick}
        disabled={disabled}
        height={`${size}pt`}
        viewBox={`-48 0 512 512`}
        width={`${size}pt`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
      >
        <linearGradient id="lg1">
          <stop offset="0" stopColor="#003f8a" />
          <stop offset=".518" stopColor="#00d7df" />
          <stop offset="1" stopColor="#006df0" />
        </linearGradient>
        <linearGradient
          id="linear0"
          gradientUnits="userSpaceOnUse"
          x1="-41.264"
          x2="474.504"
          xlinkHref="#lg1"
          y1="497.264"
          y2="-18.504"
        />
        <linearGradient
          id="linear1"
          gradientUnits="userSpaceOnUse"
          x1="-29.264"
          x2="486.504"
          xlinkHref="#lg1"
          y1="509.264"
          y2="-6.504"
        />
        <linearGradient
          id="linear2"
          gradientUnits="userSpaceOnUse"
          x1="-69.264"
          x2="446.504"
          xlinkHref="#lg1"
          y1="469.264"
          y2="-46.504"
        />
        <linearGradient
          id="linear3"
          gradientUnits="userSpaceOnUse"
          x1="14.736"
          x2="530.504"
          xlinkHref="#lg1"
          y1="553.264"
          y2="37.496"
        />
        <linearGradient
          id="linear4"
          gradientUnits="userSpaceOnUse"
          x1="84.736"
          x2="600.504"
          xlinkHref="#lg1"
          y1="623.264"
          y2="107.496"
        />
        <linearGradient
          id="linear5"
          gradientUnits="userSpaceOnUse"
          x1="116.736"
          x2="632.504"
          xlinkHref="#lg1"
          y1="655.264"
          y2="139.496"
        />
        <path
          d="m392 168h-32v-56h8c4.417969 0 8-3.582031 8-8v-64c0-4.417969-3.582031-8-8-8h-120v-8c0-13.253906-10.746094-24-24-24h-48c-13.253906 0-24 10.746094-24 24v8h-120c-4.417969 0-8 3.582031-8 8v64c0 4.417969 3.582031 8 8 8h8v56h-32c-4.417969 0-8 3.582031-8 8s3.582031 8 8 8h32v304c0 4.417969 3.582031 8 8 8h304c4.417969 0 8-3.582031 8-8v-304h32c4.417969 0 8-3.582031 8-8s-3.582031-8-8-8zm-224-144c0-4.417969 3.582031-8 8-8h48c4.417969 0 8 3.582031 8 8v8h-64zm-128 24h320v48h-320zm304 432h-288v-368h288zm0 0"
          fill={(disabled && disabledFill) || "url(#linear0)"}
        />
        <path
          d="m200 416c4.417969 0 8-3.582031 8-8v-256c0-4.417969-3.582031-8-8-8s-8 3.582031-8 8v256c0 4.417969 3.582031 8 8 8zm0 0"
          fill={(disabled && disabledFill) || "url(#linear1)"}
        />
        <path
          d="m120 416c4.417969 0 8-3.582031 8-8v-256c0-4.417969-3.582031-8-8-8s-8 3.582031-8 8v256c0 4.417969 3.582031 8 8 8zm0 0"
          fill={(disabled && disabledFill) || "url(#linear2)"}
        />
        <path
          d="m288 416c4.417969 0 8-3.582031 8-8v-256c0-4.417969-3.582031-8-8-8s-8 3.582031-8 8v256c0 4.417969 3.582031 8 8 8zm0 0"
          fill={(disabled && disabledFill) || "url(#linear3)"}
        />
        <path
          d="m216 464h72c4.417969 0 8-3.582031 8-8s-3.582031-8-8-8h-72c-4.417969 0-8 3.582031-8 8s3.582031 8 8 8zm0 0"
          fill={(disabled && disabledFill) || "url(#linear4)"}
        />
        <path
          d="m312 464h8c4.417969 0 8-3.582031 8-8s-3.582031-8-8-8h-8c-4.417969 0-8 3.582031-8 8s3.582031 8 8 8zm0 0"
          fill={(disabled && disabledFill) || "url(#linear5)"}
        />
      </svg>
    </Wrapper>
  );
}

export default TrashIcon;
