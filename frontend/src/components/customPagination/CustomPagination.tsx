import type { Dispatch } from 'react';
import { getPaginationItems } from '../../utils/getPaginationItems';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination/Pagination';

type CustomPagination = {
  page: number;
  totalPages: number;
  setPage: Dispatch<React.SetStateAction<number>>;
};

export function CustomPagination({
  page,
  totalPages,
  setPage,
}: CustomPagination) {
  const items = getPaginationItems(page, totalPages);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            style={{
              pointerEvents: page === 1 ? 'none' : 'auto',
              opacity: page === 1 ? '0.5' : '1',
            }}
          />
        </PaginationItem>

        {items.map((item, index) => (
          <PaginationItem key={index}>
            {item === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                isActive={page === item}
                onClick={() => setPage(Number(item))}>
                {item}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            style={{
              pointerEvents: page === totalPages ? 'none' : 'auto',
              opacity: page === totalPages ? '0.5' : '1',
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
