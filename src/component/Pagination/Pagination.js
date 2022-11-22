import { useState } from 'react';
import { Pagination as PaginationPages } from 'react-pagination-bar';
import 'react-pagination-bar/dist/index.css';


function Pagination({perPages, totalPages, limitPages, onPagesChanges}) {
    // const [currentPage, setCurrentPage] = useState(1);
    return (
        <>
            <PaginationPages
                currentPage={perPages}
                itemsPerPage={limitPages}
                onPageChange={onPagesChanges}
                totalItems={totalPages}
                pageNeighbours={2}
            />
        </>
    );
}

export default Pagination;
