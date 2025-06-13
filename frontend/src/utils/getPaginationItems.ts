export const getPaginationItems = (
  page: number,
  totalPages: number,
): (number | string)[] => {
  const delta = 1;
  const range = [];
  const rangeWithDots = [];
  let l: number = 0;

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - delta && i <= page + delta)
    ) {
      range.push(i);
    }
  }

  for (const i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l > 2) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
};

export const per_page = 5;
