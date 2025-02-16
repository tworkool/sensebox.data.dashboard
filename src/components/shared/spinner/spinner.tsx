import { Icon } from "@iconify/react";
import { FunctionComponent, PropsWithChildren } from "react";

const SpinnerBase: FunctionComponent<PropsWithChildren> = (props) => {
  return (
    <div className="center" style={{ width: "100%", height: "100%" }}>
      {props.children}
    </div>
  );
};

export interface SpinnerProps {
  size: string | number;
};

const RoundSpinner = (props: SpinnerProps) => {
  const { size = "1rem" } = props;

  return (
    <SpinnerBase>
      <Icon icon="svg-spinners:ring-resize" width={size} height={size} />
      {/* <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
      >
        <g
          stroke="currentColor"
          strokeWidth={1}
        >
          <circle
            cx={12}
            cy={12}
            r={9.5}
            fill="none"
            strokeLinecap="round"
            strokeWidth={3}
          >
            <animate
              attributeName="stroke-dasharray"
              calcMode="spline"
              dur="1.5s"
              keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
              keyTimes="0;0.475;0.95;1"
              repeatCount="indefinite"
              values="0 150;42 150;42 150;42 150">
            </animate>
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="1.5s"
              keySplines="0.42,0,0.58,1;0.42,0,0.58,1;0.42,0,0.58,1"
              keyTimes="0;0.475;0.95;1"
              repeatCount="indefinite"
              values="0;-16;-59;-59">
            </animate>
          </circle>
          <animateTransform
            attributeName="transform"
            dur="2s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          >
          </animateTransform>
        </g>
      </svg> */}
    </SpinnerBase>
  );
};

export default {
  Round: RoundSpinner,
};
