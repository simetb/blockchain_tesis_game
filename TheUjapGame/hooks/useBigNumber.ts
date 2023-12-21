// Function to solve BigNumber Object and avoid Errors in contract
// If the value is not an BigNumber Object return the entry value
export const useBigNumber = () => {
  //  The function transforms the hexadecimal number to a workable decimal in js,
  //if the given value is not an object it will return the value
  const HexToDec = (val: any) => {
    if (val?._isBigNumber) {
      return parseInt(val._hex, 16);
    } else {
      return val;
    }
  };
  return { HexToDec };
};
