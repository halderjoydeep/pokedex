"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

const PokemonPagination = ({ currentPage, totalPages }: PaginationProps) => {
  const pagesToRenderBeforeEllipsis = [1];
  const pagesToRenderBetweenEllipsis = [];
  const pagesToRenderAfterEllipsis = [];

  const searchParams = useSearchParams();

  if (totalPages <= 4) {
    for (let i = 2; i <= totalPages; i++) {
      pagesToRenderBeforeEllipsis.push(i);
    }
  } else {
    if (currentPage <= 4) {
      for (let i = 2; i < totalPages && i <= 4; i++) {
        pagesToRenderBeforeEllipsis.push(i);
      }
    }

    if (currentPage > 4 && currentPage < totalPages - 3) {
      pagesToRenderBetweenEllipsis.push(currentPage);
      pagesToRenderBetweenEllipsis.push(currentPage + 1);
    }

    if (totalPages > 4) {
      pagesToRenderAfterEllipsis.push(totalPages);
    }

    if (currentPage >= totalPages - 3) {
      pagesToRenderAfterEllipsis.pop();
      for (let i = totalPages - 3; i <= totalPages; i++) {
        pagesToRenderAfterEllipsis.push(i);
      }
    }
  }

  const s = searchParams.get("s");
  const sort = searchParams.get("sort");
  const searchQuery = `${s ? `&s=${s}` : ""}${sort ? `&sort=${sort}` : ""}`;

  return (
    <Pagination className="mb-6 mt-8">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href={
              currentPage > 1
                ? `/pokedex?page=${currentPage - 1}${searchQuery}`
                : ""
            }
            className={`${currentPage === 1 ? "pointer-events-none" : ""}`}
          />
        </PaginationItem>

        {pagesToRenderBeforeEllipsis.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              href={`/pokedex?page=${page}${searchQuery}`}
              className={`${currentPage === page ? "pointer-events-none" : ""}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pagesToRenderBetweenEllipsis.length > 0 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pagesToRenderBetweenEllipsis.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              href={`/pokedex?page=${page}${searchQuery}`}
              className={`${currentPage === page ? "pointer-events-none" : ""}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {pagesToRenderAfterEllipsis.length > 0 && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {pagesToRenderAfterEllipsis.map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              isActive={currentPage === page}
              href={`/pokedex?page=${page}${searchQuery}`}
              className={`${currentPage === page ? "pointer-events-none" : ""}`}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href={
              currentPage === totalPages
                ? ""
                : `/pokedex?page=${currentPage + 1}${searchQuery}`
            }
            className={`${currentPage === totalPages ? "pointer-events-none" : ""}`}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PokemonPagination;
