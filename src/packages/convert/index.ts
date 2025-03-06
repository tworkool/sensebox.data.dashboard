import _convert, { getMeasureKind as _getMeasureKind } from "./build";
// types
import { Unit, Temperature, MeasuresByUnit } from "./build";

// INTERNAL MAPPING FOR MEASURE KINDS IN CONVERT LIBRARY
enum MeasureKind {
  Angle = 0,
  Area = 1,
  Data = 2,
  Energy = 3,
  Force = 4,
  Length = 5,
  Mass = 6,
  Power = 7,
  Pressure = 8,
  Temperature = 9,
  Time = 10,
  Volume = 11,
  // EXTENSION STARTS HERE
  Light = 12,
}

function getPrimaryConversionUnits(measureKind: MeasureKind): { shortName: string, fullName: string }[] {
  switch (measureKind) {
  case MeasureKind.Angle:
    return [
      { shortName: "deg", fullName: "degrees" },
      { shortName: "rad", fullName: "radians" },
      { shortName: "grad", fullName: "gradians" }
    ];
  case MeasureKind.Area:
    return [
      { shortName: "m²", fullName: "square meters" },
      { shortName: "ha", fullName: "hectares" },
      { shortName: "ac", fullName: "acres" },
      { shortName: "ft²", fullName: "square feet" }
    ];
  case MeasureKind.Data:
    return [
      { shortName: "B", fullName: "bytes" },
      { shortName: "KB", fullName: "kilobytes" },
      { shortName: "MB", fullName: "megabytes" },
      { shortName: "GB", fullName: "gigabytes" },
      { shortName: "TB", fullName: "terabytes" }
    ];
  case MeasureKind.Energy:
    return [
      { shortName: "J", fullName: "joules" },
      { shortName: "cal", fullName: "calories" },
      { shortName: "kWh", fullName: "kilowatt-hours" }
    ];
  case MeasureKind.Force:
    return [
      { shortName: "N", fullName: "newtons" },
      { shortName: "lbf", fullName: "pounds-force" },
      { shortName: "kgf", fullName: "kilograms-force" }
    ];
  case MeasureKind.Length:
    return [
      { shortName: "m", fullName: "meters" },
      { shortName: "km", fullName: "kilometers" },
      { shortName: "mi", fullName: "miles" },
      { shortName: "ft", fullName: "feet" },
      { shortName: "in", fullName: "inches" }
    ];
  case MeasureKind.Mass:
    return [
      { shortName: "g", fullName: "grams" },
      { shortName: "kg", fullName: "kilograms" },
      { shortName: "lb", fullName: "pounds" },
      { shortName: "oz", fullName: "ounces" }
    ];
  case MeasureKind.Power:
    return [
      { shortName: "W", fullName: "watts" },
      { shortName: "kW", fullName: "kilowatts" },
      { shortName: "hp", fullName: "horsepower" }
    ];
  case MeasureKind.Pressure:
    return [
      { shortName: "Pa", fullName: "pascals" },
      { shortName: "bar", fullName: "bars" },
      { shortName: "psi", fullName: "pounds per square inch" },
      { shortName: "atm", fullName: "atmospheres" }
    ];
  case MeasureKind.Temperature:
    return [
      { shortName: "°C", fullName: "celsius" },
      { shortName: "F", fullName: "fahrenheit" },
      { shortName: "K", fullName: "kelvin" }
    ];
  case MeasureKind.Time:
    return [
      { shortName: "s", fullName: "seconds" },
      { shortName: "min", fullName: "minutes" },
      { shortName: "h", fullName: "hours" },
      { shortName: "d", fullName: "days" }
    ];
  case MeasureKind.Volume:
    return [
      { shortName: "L", fullName: "liters" },
      { shortName: "mL", fullName: "milliliters" },
      { shortName: "m³", fullName: "cubic meters" },
      { shortName: "gal", fullName: "gallons" }
    ];
  case MeasureKind.Light:
    return [
      { shortName: "lx", fullName: "lux" },
      { shortName: "lm/m²", fullName: "Lumen per square meter" },
      { shortName: "lm/ft²", fullName: "lumen per square foot" },
    ];
  default:
    return [];
  }
}

function convert(value: number, unit: Unit) {
  // FIX floating point precision errors by multiplying and dividing (https://www.w3schools.com/js/js_numbers.asp)
  const _value = (value * 10) / 10;

  const measureKind = getMeasureKind(unit);
  if (measureKind === MeasureKind.Light) {
    // only lx to ... conversion for now!
    if (unit as string === "lx") {
      return {
        to: (targetUnit: Unit | string) => {
          if (targetUnit === "lx") {
            return _value;
          } else if (targetUnit === "lm/m²") {
            return _value;
          } else if (targetUnit === "lm/ft²") {
            return _value * 0.092903;
          }

          return undefined;
        }
      };
    }

    return undefined;
  }

  return _convert(_value, unit);
}

const CustomUnits = {
  12: ["lx", "lm/m²", "lm/ft²"],
};

function getMeasureKind(unit: Unit): MeasureKind {
  // Check if the unit exists in any of our custom unit collections
  /* for (const [kindStr, units] of Object.entries(CustomUnits)) {
    if (units.includes(unit as string)) {
      return Number(kindStr) as MeasureKind;
    }
  } */

  // Fall back to the original library's implementation
  return _getMeasureKind(unit);
}

export {
  getMeasureKind,
  getPrimaryConversionUnits,
};
export type { Unit, MeasureKind };
export default convert;
