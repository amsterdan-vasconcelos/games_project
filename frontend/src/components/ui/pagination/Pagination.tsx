import type {
  AnchorHTMLAttributes,
  ComponentProps,
  HTMLAttributes,
  LiHTMLAttributes,
} from 'react';

import style from './Pagination.module.css';

type PaginationProps = HTMLAttributes<HTMLElement>;
type PaginationContentProps = HTMLAttributes<HTMLUListElement>;
type PaginationItemProps = LiHTMLAttributes<HTMLLIElement>;
type PaginationLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  isActive?: boolean;
};
type PaginationButtonProps = ComponentProps<typeof PaginationLink>;
type PaginationEllipsisProps = LiHTMLAttributes<HTMLLIElement>;

export function Pagination({ ...props }: PaginationProps) {
  return (
    <nav
      role='navigation'
      aria-label='pagination'
      className={style.pagination}
      {...props}
    />
  );
}

export function PaginationContent({ ...props }: PaginationContentProps) {
  return <ul className={style.content} {...props} />;
}

export function PaginationItem({ ...props }: PaginationItemProps) {
  return <li className={style.item} {...props} />;
}

export function PaginationLink({ isActive, ...props }: PaginationLinkProps) {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-active={isActive}
      className={`${style.link} ${isActive ? style.outline : style.ghost}`}
      {...props}
    />
  );
}

export function PaginationPrevious({ ...props }: PaginationButtonProps) {
  return (
    <PaginationLink
      aria-label='Go to previous page'
      className={`${style.link} ${style.previous}`}
      {...props}>
      {/* <ChevronLeftIcon /> */}
      <span>Previous</span>
    </PaginationLink>
  );
}

export function PaginationNext({ ...props }: PaginationButtonProps) {
  return (
    <PaginationLink
      aria-label='Go to next page'
      className={`${style.link} ${style.next}`}
      {...props}>
      <span>Next</span>
      {/* <ChevronRightIcon />  */}
    </PaginationLink>
  );
}

export function PaginationEllipsis({ ...props }: PaginationEllipsisProps) {
  return (
    <span aria-label='Go to next page' className={style.ellipsis} {...props}>
      ...
      <span className={style.srOnly}>More pages</span>
    </span>
  );
}
