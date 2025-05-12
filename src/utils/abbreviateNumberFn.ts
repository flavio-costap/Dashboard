  export const abbreviateNumberFn = (value: number): string => {
    const absValue = Math.abs(value);
    let abbreviated = "";

    if (absValue >= 1_000_000) {
      abbreviated = (absValue / 1_000_000).toFixed(1) + "M";
    } else if (absValue >= 1_000) {
      abbreviated = (absValue / 1_000).toFixed(1) + "k";
    } else {
      abbreviated = absValue.toString();
    }

    return value < 0 ? `-${abbreviated}` : abbreviated;
  }