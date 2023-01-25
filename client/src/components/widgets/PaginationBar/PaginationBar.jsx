import React from 'react';
import "./PaginationBar.css";
import Pagination from 'react-js-pagination';

export default function PaginationBar({ currentPage, resultPerPage, productsCount, handleCurrentPageNo }) {
    return (
        <>
            {/* ------ Pagination ------ */}
            <div className="pagination-box">
                <Pagination
                    activePage={currentPage}
                    itemsCountPerPage={resultPerPage}
                    totalItemsCount={productsCount}
                    onChange={handleCurrentPageNo}
                    nextPageText="Next"
                    prevPageText="Prev"
                    firstPageText="1st"
                    lastPageText="Last"
                    itemClass="pageItem"
                    linkClass="pageLink"
                    activeClass="pageItemActive"
                    activeLinkClass="pageLinkActive"
                />
            </div>
        </>
    )
}
