import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Pagination } from "../../shared/components/Pagination";
import { SearchBar } from "../../shared/components/SearchBar";

import DataTable from "react-data-table-component";

import "bootstrap-icons/font/bootstrap-icons.css";
import "../style/collaborators.css";

export const CollaboratorsList = (props) => {
  const [initialData, setInitialData] = useState([]);
  const [minRows, setMinRows] = useState(0);
  const [maxRows, setMaxRows] = useState(props.numberOfRows);

  const navigate = useNavigate();

  const previousPage = () => {
    setMinRows(minRows - props.numberOfRows);
    setMaxRows(maxRows - props.numberOfRows);
  };

  const nextPage = () => {
    setMinRows(minRows + props.numberOfRows);
    setMaxRows(maxRows + props.numberOfRows);
  };

  const initialPage = () => {
    setMinRows(0);
    setMaxRows(props.numberOfRows);
  };

  useEffect(() => {
    setInitialData(props.collaborators);
  }, []);

  useEffect(() => {
    if (props.collaborators.length <= props.numberOfRows) {
      initialPage();
    }
  }, [props.collaborators.length, props.numberOfRows]);

  const customStyles = {
    head: {
      style: {
        fontSize: "16px",
      },
    },
  };

  const handleSort = (column, sortDirection) => {
    if(sortDirection == "asc" && column.name == "Cédula"){
      initialData.sort((a, b) => a.userId.localeCompare(b.userId));
    }
    else if(sortDirection == "desc" && column.name == "Cédula"){
      initialData.sort((a, b) => b.userId.localeCompare(a.userId));
    }
    else if(sortDirection == "asc" && column.name == "Nombre"){
      initialData.sort((a, b) => (a.name + " " + a.surnames).localeCompare(b.name + " " + b.surnames));
    }
    else if(sortDirection == "desc" && column.name == "Nombre"){
      initialData.sort((a, b) => (b.name + " " + b.surnames).localeCompare(a.name + " " + a.surnames));
    }
    else if(sortDirection == "asc" && column.name == "Correo electrónico"){
      initialData.sort((a, b) => a.email.localeCompare(b.email));
    }
    else if(sortDirection == "desc" && column.name == "Correo electrónico"){
      initialData.sort((a, b) => b.email.localeCompare(a.email));
    }
    else if(sortDirection == "asc" && column.name == "Estado"){
      initialData.sort((a, b) => a.status.description.localeCompare(b.status.description));
    }
    else if(sortDirection == "desc" && column.name == "Estado"){
      initialData.sort((a, b) => b.status.description.localeCompare(a.status.description));
    }
    //Para que la página se de cuenta que tiene que recargar
    setInitialData(initialData.slice(0));
  };

  return (
    <>
      <div className="container mt-3">
        <h2 className="text-style text-left">Taxistas</h2>
        <br />
        <div className="text-end searchBoxContainer">
          <SearchBar
            initialData={initialData}
            setInitialData={setInitialData}
            setData={props.setCollaborators}
          />
        </div>

        <br />

        <DataTable
          responsive
          highlightOnHover
          columns={props.columns}
          data={props.collaborators.slice(minRows, maxRows)}
          noDataComponent="No hay registros que mostrar"
          striped
          onSort={handleSort}
          customStyles={customStyles}
          onRowClicked={(row, event) => {
            navigate(`/profile/${row.id}`);
          }}
        />

        {props.collaborators.length > props.numberOfRows &&(
          <Pagination
            pagesNumber={Math.ceil(
              props.collaborators.length / props.numberOfRows
            )}
            setPreviousPage={previousPage}
            setNextPage={nextPage}
            setInitialPage={initialPage}
            data = {props.collaborators}
          />
        )}
      </div>
    </>
  );
};
