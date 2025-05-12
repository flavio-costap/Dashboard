  export const formatNumberK = (value: number) => {
    const absValue = Math.abs(value);
    const formatted =
      absValue >= 1000
        ? `${(absValue / 1000).toFixed(0)}k`
        : absValue.toString();
    return value < 0 ? `-${formatted}` : formatted;
  };