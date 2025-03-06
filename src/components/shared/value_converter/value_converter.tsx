import { Menu, NumberFormatter } from "@mantine/core";
import React, { useState, useEffect, useMemo } from "react";
import convert, { getMeasureKind, Unit, getPrimaryConversionUnits } from "@packages/convert";

interface ValueConverterProps {
  value: number;
  unit: Unit;
};

const ValueConverter = (props: ValueConverterProps) => {
  const { value, unit } = props;
  const [updatedUnit, setUpdatedUnit] = useState<Unit>(unit);
  const [originalUnit, setOriginalUnit] = useState<Unit>(unit);

  useEffect(() => {
    if (unit !== originalUnit) {
      // unit has changed
      setOriginalUnit(unit);
      setUpdatedUnit(unit);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  const convertedValue = useMemo(() => {
    if (!getMeasureKind(originalUnit)) return value;
    return convert(value, originalUnit).to(updatedUnit);
  }, [value, originalUnit, updatedUnit]);

  const availableConversionUnits = useMemo(() => {
    try {
      return getPrimaryConversionUnits(getMeasureKind(originalUnit));
    } catch (e) {
      console.error(e);
      return [];
    }
  }, [originalUnit]);

  return (
    <Menu offset={5} withArrow>
      <Menu.Target>
        <div className="value-converter">
          <NumberFormatter value={convertedValue} decimalScale={2} thousandSeparator />
          <span>{updatedUnit}</span>
        </div>
      </Menu.Target>

      <Menu.Dropdown>
        {availableConversionUnits.length !== 0 ? availableConversionUnits.map((unit, index) => <Menu.Item key={index} onClick={() => { setUpdatedUnit(unit.shortName as Unit); }}>
          {`${unit.fullName} (${unit.shortName})`}
        </Menu.Item>) : <Menu.Item disabled>No conversion available</Menu.Item>}
      </Menu.Dropdown>
    </Menu>
  );
};

export default ValueConverter;
