export type PaginationItem = {
  id: string;
  label: string | number;
  goToPage: number | null;
  active?: boolean;
  disabled?: boolean;
};

export const getPaginationItems = (
  page: number,
  totalPages: number,
  delta: number = 1,
): PaginationItem[] => {
  const range: number[] = [];
  const result: PaginationItem[] = [];

  const push = (item: Omit<PaginationItem, 'id'>) => {
    result.push({ ...item, id: `${item.label}-${result.length}` });
  };

  push({
    label: 'previous',
    goToPage: page > 1 ? page - 1 : null,
    disabled: page === 1,
  });

  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= page - delta && i <= page + delta)
    ) {
      range.push(i);
    }
  }

  let last: number | undefined;
  for (const current of range) {
    if (last !== undefined) {
      if (current - last === 2) {
        const middle = last + 1;
        push({
          label: middle,
          goToPage: middle,
          active: middle === page,
        });
      } else if (current - last > 2) {
        push({
          label: '...',
          goToPage: null,
        });
      }
    }

    push({
      label: current,
      goToPage: current,
      active: current === page,
    });

    last = current;
  }

  push({
    label: 'next',
    goToPage: page < totalPages ? page + 1 : null,
    disabled: page === totalPages,
  });

  return result;
};
