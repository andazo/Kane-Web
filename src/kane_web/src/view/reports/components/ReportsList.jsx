import { useEffect, useState } from "react";
import { Pagination } from "../../shared/components/Pagination";
import { SearchBar } from "../../shared/components/SearchBar";

import kaneWebLogo from "../../shared/assets/kane-logo.png";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";

import "bootstrap-icons/font/bootstrap-icons.css";
import "../styles/reports.css";
import "jspdf-autotable";

export const ReportsList = (props) => {
  const title = props.title;
  const [initialData, setInitialData] = useState([]);
  const [reports, setReports] = useState([]);
  const [minRows, setMinRows] = useState(0);
  const [maxRows, setMaxRows] = useState(props.numberOfRows);

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
    let data = props.data;
    setInitialData(data);
    setReports(data);
  }, []);

  useEffect(() => {
    if (reports.length <= props.numberOfRows) {
      initialPage();
    }
  }, [reports.length, props.numberOfRows]);

  const customStyles = {
    head: {
      style: {
        fontSize: "16px",
      },
    },
  };

  const handleSort = (column, sortDirection) => {
    if(sortDirection == "asc" && column.name == "Identificación"){
      initialData.sort((a, b) => a.userId.localeCompare(b.userId));
    }
    else if(sortDirection == "desc" && column.name == "Identificación"){
      initialData.sort((a, b) => b.userId.localeCompare(a.userId));
    }
    else if(sortDirection == "asc" && column.name == "Nombre"){
      initialData.sort((a, b) => (title != "Reporte de Clientes" ?  a.name + " " + a.surnames : a.name).localeCompare(title != "Reporte de Clientes" ?  b.name + " " + b.surnames : b.name));
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
    else if(sortDirection == "asc" && column.name == "Teléfono"){
      initialData.sort((a, b) => a.phoneNumber.localeCompare(b.phoneNumber));
    }
    else if(sortDirection == "desc" && column.name == "Teléfono"){
      initialData.sort((a, b) => b.phoneNumber.localeCompare(a.phoneNumber));
    }
    else if(sortDirection == "asc" && column.name == "Placa"){
      initialData.sort((a, b) => a.plateNumber.localeCompare(b.plateNumber));
    }
    else if(sortDirection == "desc" && column.name == "Placa"){
      initialData.sort((a, b) => b.plateNumber.localeCompare(a.plateNumber));
    }
    else if(sortDirection == "asc" && column.name == "Puntuación"){
      initialData.sort((a, b) => a.score? a.score.toString().localeCompare(b.score? b.score.toString() : "") : "".localeCompare(b.score? b.score.toString() : ""));
    }
    else if(sortDirection == "desc" && column.name == "Puntuación"){
      initialData.sort((a, b) => b.score? b.score.toString().localeCompare(a.score? a.score.toString() : "") : "".localeCompare(a.score? a.score.toString() : ""));
    }
    //Para que la página se de cuenta que tiene que recargar
    setInitialData(initialData.slice(0));
  };

  const exportPDF = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    var img = new Image();
    img.src = kaneWebLogo;

    const title1 = title;
    const headers = [];
    const columnsName = [];
    var data1 = [];
    for (let index = 0; index < props.columns.length; index++) {
      columnsName.push(props.columns[index].name);
    }
    headers.push(columnsName);

    const report = reports;
    if (title == "Reporte de Clientes") {
      data1 = report.map((elt) => [
        elt.userId,
        elt.name,
        elt.email,
        elt.phoneNumber,
        elt.score?.toString().slice(0, elt.score.toString().length > 4? 4 : elt.score.toString().length),
        //elt.state,              ESPERAR A QUE HAYA UN CAMPO DE STATE EN EL BACKEND
      ]);
    } else {
      data1 = report.map((elt) => [
        elt.userId,
        elt.name + " " + elt.surnames,
        elt.email,
        elt.phoneNumber,
        elt.plateNumber,
        elt.score?.toString().slice(0, elt.score.toString().length > 4? 4 : elt.score.toString().length),
      ]);
    }

    let content = {
      startY: 140,
      headStyles: { fillColor: "#6f82a8" },
      head: headers,
      body: data1,
    };
    if (report.length > 0) {
      doc.addImage(img, "png", marginLeft, 30, 45, 60);
      doc.setFontSize(20);
      doc.setTextColor("#415375");
      doc.text("Kãnè taxi", marginLeft + 60, 68);
      doc.setFontSize(20);
      doc.setFont("Times", "bold");
      doc.text(title1, marginLeft, 130);
      doc.autoTable(content);
      doc.save(title + ".pdf");
    }
  };

  return (
    <>
      <div className="container mt-3">
        <h2 className="text-style text-left">{title}</h2>
        <div className="row p-2 align-items-right">
          <div className="col float-start">
            <div className="text-end searchBoxContainer">
              <SearchBar
                initialData={initialData}
                setInitialData={setInitialData}
                setData={setReports}
              />
            </div>
          </div>
          <button
            id="export"
            type="button"
            className="btn button btn-sm"
            onClick={exportPDF}
          >
            Exportar
          </button>
        </div>

        <br />
        <DataTable
          responsive
          highlightOnHover
          columns={props.columns}
          data={reports.slice(minRows, maxRows)}
          onSort={handleSort}
          noDataComponent="No hay registros que mostrar"
          striped
          customStyles={customStyles}
        />

        {reports.length > props.numberOfRows && (
          <Pagination
            pagesNumber={Math.ceil(reports.length / props.numberOfRows)}
            setPreviousPage={previousPage}
            setNextPage={nextPage}
            setInitialPage={initialPage}
            data={reports}
          />
        )}
      </div>
    </>
  );
};
