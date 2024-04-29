'use client';

import Link from 'next/link';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const pagesToRenderBeforeEllipsis = [1];
  const pagesToRenderBetweenEllipsis = [];
  const pagesToRenderAfterEllipsis = [totalPages];

  if (currentPage <= 4) {
    pagesToRenderBeforeEllipsis.push(2, 3, 4);
  }

  if (currentPage > 4 && currentPage < totalPages - 3) {
    pagesToRenderBetweenEllipsis.push(currentPage);
    pagesToRenderBetweenEllipsis.push(currentPage + 1);
  }

  if (currentPage >= totalPages - 3) {
    pagesToRenderAfterEllipsis.pop();
    pagesToRenderAfterEllipsis.push(
      totalPages - 3,
      totalPages - 2,
      totalPages - 1,
      totalPages
    );
  }

  return (
    <div className="flex flex-row items-center justify-center gap-6 sm:gap-10 text-white mt-8 mb-6">
      <Link
        href={`/pokedex?page=${currentPage - 1}`}
        className={`${currentPage === 1 ? 'pointer-events-none' : ''}`}
      >
        &lt; <span className="hidden sm:inline">Prev</span>
      </Link>

      {pagesToRenderBeforeEllipsis.map((page) => (
        <Link
          key={page}
          href={`/pokedex?page=${page}`}
          className={`${currentPage === page ? 'border-b' : ''}`}
        >
          {page}
        </Link>
      ))}

      {pagesToRenderBetweenEllipsis.length > 0 && <div>...</div>}
      {pagesToRenderBetweenEllipsis.length > 0 &&
        pagesToRenderBetweenEllipsis.map((page) => (
          <Link
            key={page}
            href={`/pokedex?page=${page}`}
            className={`${currentPage === page ? 'border-b' : ''}`}
          >
            {page}
          </Link>
        ))}

      <div>...</div>

      {pagesToRenderAfterEllipsis.map((page) => (
        <Link
          key={page}
          href={`/pokedex?page=${page}`}
          className={`${currentPage === page ? 'border-b' : ''}`}
        >
          {page}
        </Link>
      ))}

      <Link
        href={`/pokedex?page=${currentPage + 1}`}
        className={`${currentPage === totalPages ? 'pointer-events-none' : ''}`}
      >
        <span className="hidden sm:inline">Next</span> &gt;
      </Link>
    </div>
  );
};

export default Pagination;
