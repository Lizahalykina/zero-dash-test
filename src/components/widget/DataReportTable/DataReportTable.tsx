import React, { useState } from "react";
import ReactPaginate from "react-paginate";
import { DataType } from "../../dashboard/Dashboard";
import "./DataReportTable.css";

interface DataReportTableProps {
  data: DataType[];
}

const DataReportTable = (props: DataReportTableProps) => {

  const { data } = props;
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 4;

  const handlePageClick = (selectedPage: { selected: number }) => {
    setCurrentPage(selectedPage.selected);
  };

  const offset = currentPage * itemsPerPage;
  const currentData = data.slice(offset, offset + itemsPerPage);

  return (
    <div className="table-container">
        <h3> Data report</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Date Time</th>
            <th>Experiment ID</th>
            <th>Fuel Mass (g)</th>
            <th>Water Mass (g)</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((item, index) => (
            <tr key={index}>
              <td>{item.datetime}</td>
              <td>{item.experiment_id}</td>
              <td>{item.fuel_mass__g}</td>
              <td>{item.water_mass__g}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={<img src="/assets/Arrow.svg" alt="Previous" className="previous-arrow" />}
        nextLabel={<img src="/assets/Arrow.svg" alt="Next" />}
        breakLabel={"..."}
        pageCount={Math.ceil(data.length / itemsPerPage)}
        marginPagesDisplayed={2}
        pageRangeDisplayed={3}
        onPageChange={handlePageClick}
        containerClassName={"pagination"}
        activeClassName={"active"}
        pageLinkClassName={"page-link"}
        previousLinkClassName={"page-link"}
        nextLinkClassName={"page-link"}
        breakLinkClassName={"page-link"}
      />
    </div>
  );
};

export default DataReportTable;
