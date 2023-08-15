import { useEffect, useState } from "react";

import "../style/pagination/pagination.css";

export const Pagination = (props) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const changePage = ( newCurrentPage ) =>{
        setCurrentPage(currentPage + newCurrentPage);
        if(newCurrentPage < 0){
            props.setPreviousPage();
        } else {
            props.setNextPage();
        }
    };

    useEffect(() => {
      setCurrentPage(1);
      props.setInitialPage();
    }, [props.data]);

  return (
    <>
      <br />
      <ul className="pagination justify-content-end">
        <li className= {currentPage == 1 ? "page-item disabled" : "page-item"}>
          <a className= "page-link pagination-link" onClick={ () => changePage(-1) }>
            <i className="bi bi-caret-left-fill"></i>
          </a>
        </li>

        <li className="page-item">
          <a className="page-link pagination-link"> { currentPage } de { props.pagesNumber }</a>
        </li>

        <li className={currentPage == props.pagesNumber ? "page-item disabled" : "page-item"}>
          <a className="page-link pagination-link"  onClick={ () => changePage(1) }>
            <i className="bi bi-caret-right-fill"></i>
          </a>
        </li>
      </ul>
    </>
  );
};
