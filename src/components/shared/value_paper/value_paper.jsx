import CustomCopyButton from "@components/shared/custom_copy_button/custom_copy_button";
import "./value_paper.scss";
import { Group } from "@mantine/core";
import ValueConverter from "@components/shared/value_converter/value_converter";
import { memo, useEffect, useRef } from "react";
import { useSettingsStore } from "@stores";
import OsemIcon from "@components/shared/osem_icon/osem_icon";
import { getTimeFromNow } from "@utils/helpers";
import dayjs from "dayjs";
import DotValueIndicator from "@components/shared/dot_value_indicator/dot_value_indicator";

const ValuePaperItem = (props) => {
  const { sensor, withCopyButton = false } = props;
  const valueRef = useRef(null);
  const settingsStore = useSettingsStore();

  useEffect(() => {
    if (valueRef.current) {
      valueRef.current.classList.remove("value-paper__value--refresh");
      valueRef.current.classList.add("value-paper__value--refresh");
    }
  }, [sensor.lastMeasurement?.value, sensor.unit]);

  return <ValuePaperBare subtitle={sensor.title} withCopyButton={withCopyButton}>
    {sensor.lastMeasurement?.createdAt && 
      <div className="value-paper__last-measure">
        {getTimeFromNow(dayjs(sensor.lastMeasurement.createdAt))}
      </div>
    }
    {sensor?.icon && <OsemIcon className="value-paper__icon" icon={sensor?.icon}></OsemIcon>}
    <div className="value-paper__value" ref={valueRef}>
      {/* <span>{value}</span>
      <span>{unit}</span> */}
      { (sensor.lastMeasurement?.value != undefined && sensor.lastMeasurement?.value != null && sensor.unit) ? 
        <ValueConverter value={sensor.lastMeasurement?.value} unit={sensor.unit}></ValueConverter> : 
        <><span>{settingsStore?.current?.fallbackNullValue}</span> <span></span></> 
      }
      <DotValueIndicator unmappedValue={{ PM10: 200 }} />
    </div>
  </ValuePaperBare>;
};

const ValuePaperItemEmpty = () => {
  return <ValuePaperBare subtitle={"N/A"}>
    <div className="value-paper__value">
      <ValueConverter value={"N/A"} unit={"N/A"}></ValueConverter>
    </div>
  </ValuePaperBare>;
};

const ValuePaperBare = (props) => {
  const { children, subtitle, withCopyButton, className } = props;

  return (
    <div className={`value-paper ${className ?? ""}`}>
      <div className="value-paper__content">
        {children}
      </div>
      {subtitle && <div className="value-paper__subtitle">
        <Group gap="xs">
          <span>{subtitle}</span>
          {withCopyButton && <CustomCopyButton value={subtitle} />}
        </Group>
      </div>}
    </div>
  );
};

const ValuePaper = {
  Bare: memo(ValuePaperBare),
  Item: memo(ValuePaperItem),
  ItemEmpty: memo(ValuePaperItemEmpty),
  Grid: (props) => {
    return <div className="value-paper__grid">{props.children}</div>;
  },
};

export default ValuePaper;
