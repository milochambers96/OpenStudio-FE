const shippingZones: { [key: string]: number } = {
  // London
  EC: 1,
  WC: 1,
  N: 1,
  E: 1,
  SE: 1,
  SW: 1,
  W: 1,
  NW: 1,

  // South East
  BR: 2,
  CR: 2,
  DA: 2,
  KT: 2,
  ME: 2,
  RH: 2,
  SM: 2,
  TN: 2,
  TW: 2,

  // East of England
  AL: 2,
  CB: 2,
  CM: 2,
  CO: 2,
  EN: 2,
  HP: 2,
  IG: 2,
  LU: 2,
  RM: 2,
  SG: 2,
  SS: 2,

  // South West
  BA: 3,
  BH: 3,
  BS: 3,
  DT: 3,
  EX: 3,
  GL: 3,
  PL: 3,
  PO: 3,
  SN: 3,
  SP: 3,
  TA: 3,
  TQ: 3,
  TR: 3,

  // West Midlands
  B: 2,
  CV: 2,
  DY: 2,
  HR: 2,
  ST: 2,
  TF: 2,
  WR: 2,
  WS: 2,
  WV: 2,

  // East Midlands
  DE: 2,
  DN: 2,
  LE: 2,
  LN: 2,
  NG: 2,
  NN: 2,
  PE: 2,

  // Yorkshire and the Humber
  BD: 3,
  HD: 3,
  HG: 3,
  HU: 3,
  HX: 3,
  LS: 3,
  S: 3,
  WF: 3,
  YO: 3,

  // North West
  BB: 3,
  BL: 3,
  CA: 3,
  CH: 3,
  CW: 3,
  FY: 3,
  L: 3,
  LA: 3,
  M: 3,
  OL: 3,
  PR: 3,
  SK: 3,
  WA: 3,
  WN: 3,

  // North East
  DH: 3,
  DL: 3,
  NE: 3,
  SR: 3,
  TS: 3,

  // Wales
  CF: 3,
  LD: 3,
  LL: 3,
  NP: 3,
  SA: 3,
  SY: 3,

  // Scotland
  AB: 4,
  DD: 4,
  DG: 4,
  EH: 4,
  FK: 4,
  G: 4,
  HS: 4,
  IV: 4,
  KA: 4,
  KW: 4,
  KY: 4,
  ML: 4,
  PA: 4,
  PH: 4,
  TD: 4,
  ZE: 4,

  // Northern Ireland
  BT: 4,

  // Channel Islands and Isle of Man
  GY: 4,
  IM: 4,
  JE: 4,
};

const getZone = (postcode: string): number => {
  const pCode = postcode.substring(0, 2).toUpperCase();
  return shippingZones[pCode] || shippingZones[pCode[0]] || 4;
};

interface ShippingParams {
  weight: string | number;
  width: string | number;
  depth: string | number;
  height: string | number;
  price: string | number;
  fromPostcode: string;
  toPostcode: string;
}

interface ShippingCosts {
  baseShippingCost: number;
  insuranceCost: number;
  totalShippingCost: number;
  totalPrice: number;
}

export const calculateShippingCost = ({
  weight,
  width,
  depth,
  height,
  price,
  fromPostcode,
  toPostcode,
}: ShippingParams): ShippingCosts => {
  // Parse string values to numbers
  const weightNum = parseFloat(weight.toString());
  const widthNum = parseFloat(width.toString());
  const depthNum = parseFloat(depth.toString());
  const heightNum = parseFloat(height.toString());
  const priceNum = parseFloat(price.toString());

  console.log("Parsed input params:", {
    weightNum,
    widthNum,
    depthNum,
    heightNum,
    priceNum,
    fromPostcode,
    toPostcode,
  });

  const baseRate = 5;
  const weightFactor = 2;
  const volumeFactor = 0.001;
  const insuranceRate = 0.01;

  const volume = widthNum * depthNum * heightNum;
  console.log("Calculated volume:", volume);

  const volumeCost = volume * volumeFactor;
  const weightCost = weightNum * weightFactor;
  console.log("Volume cost:", volumeCost, "Weight cost:", weightCost);

  const fromZone = getZone(fromPostcode);
  const toZone = getZone(toPostcode);
  console.log("From zone:", fromZone, "To zone:", toZone);

  const zoneDifference = Math.abs(fromZone - toZone);
  const zoneMultiplier = 1 + zoneDifference * 0.2;
  console.log("Zone multiplier:", zoneMultiplier);

  const baseShippingCost =
    (baseRate + weightCost + volumeCost) * zoneMultiplier;
  console.log("Base shipping cost:", baseShippingCost);

  const insuranceCost = priceNum * insuranceRate;
  console.log("Insurance cost:", insuranceCost);

  const totalShippingCost = baseShippingCost + insuranceCost;
  console.log("Total shipping cost:", totalShippingCost);

  const totalPrice = priceNum + totalShippingCost;
  console.log("Total price:", totalPrice);

  return {
    baseShippingCost: parseFloat(baseShippingCost.toFixed(2)),
    insuranceCost: parseFloat(insuranceCost.toFixed(2)),
    totalShippingCost: parseFloat(totalShippingCost.toFixed(2)),
    totalPrice: parseFloat(totalPrice.toFixed(2)),
  };
};
