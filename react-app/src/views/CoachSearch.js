import React, { useState, useEffect } from "react";
import { Container, Spinner, Alert, Row, Pagination } from "react-bootstrap";
import SearchNavbar from "../components/CoachSearch/SearchNavbar";
import SearchFiltersModal from "../components/CoachSearch/SearchFiltersModal";
import CoachCard from "../components/CoachSearch/CoachCard";

const CoachSearch = () => {
  const [searchParams, setSearchParams] = useState({
    name: "",
    minHourlyRate: "",
    maxHourlyRate: "",
    minExperience: "",
    maxExperience: "",
  });
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [sortOption, setSortOption] = useState({ key: "name", isDescending: false });

  const pageSize = 9;

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetchCoaches();
  };

  const handleSortChange = (key) => {
    setSortOption((prevSortOption) => ({
      key: key,
      isDescending: prevSortOption.key === key ? !prevSortOption.isDescending : false,
    }));
  };

  const handleModalShow = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  // Pagination Handlers
  const handlePageChange = (newPageNumber) => {
    setCurrentPage(newPageNumber);
    fetchCoaches(newPageNumber);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const fetchCoaches = async (pageNumber = currentPage) => {
    setIsLoading(true);
    setError(null);

    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const body = JSON.stringify({
      ...createSearchRequestBody(searchParams, pageNumber),
      sort_options: {
        key: sortOption.key,
        is_descending: sortOption.isDescending,
      },
    });

    try {
      const response = await fetch("http://localhost:3500/coaches/search", { method: "POST", headers: headers, body: body });
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setResults(data.coaches);
      setTotalPages(data.page_info.page_count);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const createSearchRequestBody = (searchParams, pageNumber) => {
    const [defaultMinHourlyRate, defaultMaxHourlyRate] = [0, 1_000_000];
    const [defaultMinExperienceLevel, defaultMaxExperienceLevel] = [0, 100];

    const pageInfo = { page_num: pageNumber, page_size: pageSize };
    const filterOptions = {
      name: searchParams.name,
      hourly_rate: {
        min: Number(searchParams.minHourlyRate) || defaultMinHourlyRate,
        max: Number(searchParams.maxHourlyRate) || defaultMaxHourlyRate,
      },
      experience_level: {
        min: Number(searchParams.minExperience) || defaultMinExperienceLevel,
        max: Number(searchParams.maxExperience) || defaultMaxExperienceLevel,
      },
    };

    return { page_info: pageInfo, filter_options: filterOptions };
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchCoaches(1);
  }, [sortOption]);

  const renderPagination = () => {
    let items = [];
    const pageNeighbours = 2; // Number of page numbers to show around the current page
    const totalNumbers = pageNeighbours * 2 + 3; // Total page numbers to display
    const totalBlocks = totalNumbers + 2; // Including Next and Previous buttons

    if (totalPages > totalBlocks) {
      let startPage, endPage;

      if (currentPage <= pageNeighbours + 1) {
        startPage = 1;
        endPage = totalNumbers;
      } else if (currentPage + pageNeighbours >= totalPages) {
        startPage = totalPages - (totalNumbers - 1);
        endPage = totalPages;
      } else {
        startPage = currentPage - pageNeighbours;
        endPage = currentPage + pageNeighbours;
      }

      for (let number = startPage; number <= endPage; number++) {
        items.push(
          <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
            {number}
          </Pagination.Item>
        );
      }

      if (startPage > 1) {
        items.unshift(<Pagination.Ellipsis key="ellipsisStart" onClick={() => handlePageChange(startPage - 1)} />);
      }

      if (endPage < totalPages) {
        items.push(<Pagination.Ellipsis key="ellipsisEnd" onClick={() => handlePageChange(endPage + 1)} />);
      }
    } else {
      for (let number = 1; number <= totalPages; number++) {
        items.push(
          <Pagination.Item key={number} active={number === currentPage} onClick={() => handlePageChange(number)}>
            {number}
          </Pagination.Item>
        );
      }
    }

    return (
      <Container className="d-flex justify-content-center">
        <Pagination>
          <Pagination.Prev onClick={handlePrevious} disabled={currentPage === 1} />
          {items}
          <Pagination.Next onClick={handleNext} disabled={currentPage === totalPages} />
        </Pagination>
      </Container>
    );
  };

  return (
    <div>
      <SearchNavbar
        searchParams={searchParams}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleModalShow={handleModalShow}
        handleSortChange={handleSortChange}
        getSortDirectionIcon={(key) => (sortOption.key === key ? (sortOption.isDescending ? " ↓" : " ↑") : "")}
      />

      <Container>
        <SearchFiltersModal
          show={showModal}
          handleClose={handleModalClose}
          searchParams={searchParams}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />

        <Container className="mt-4">
          {isLoading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : results.length === 0 ? (
            <Alert variant="info">No coaches found. Try adjusting your search criteria.</Alert>
          ) : (
            <Row>
              {results.map((coach, index) => (
                <CoachCard key={index} coach={coach} />
              ))}
            </Row>
          )}
        </Container>

        {totalPages > 1 && renderPagination()}
      </Container>
    </div>
  );
};

export default CoachSearch;
