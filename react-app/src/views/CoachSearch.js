import React, { useState, useEffect } from 'react';
import { Container, Spinner, Alert, Row } from 'react-bootstrap';
import SearchNavbar from '../components/CoachSearch/SearchNavbar';
import SearchFiltersModal from '../components/CoachSearch/SearchFiltersModal';
import CoachCard from '../components/CoachSearch/CoachCard'; 

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
  const pageSize = 10;
  const [showModal, setShowModal] = useState(false);
  const [sortOption, setSortOption] = useState({ key: "name", isDescending: false });
  const getSortDirectionIcon = (key) => {
    return sortOption.key === key
      ? sortOption.isDescending
        ? " ↓" // icon or text for descending
        : " ↑" // icon or text for ascending
      : "";
  };

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const createSearchRequestBody = (searchParams) => {
    const [defaultMinHourlyRate, defaultMaxHourlyRate] = [0, 1_000_000];
    const [defaultMinExperienceLevel, defaultMaxExperienceLevel] = [0, 100];

    const pageInfo = { page_num: currentPage, page_size: pageSize };
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

  const fetchCoaches = async () => {
    setIsLoading(true);
    setError(null);

    const headers = { Accept: "application/json", "Content-Type": "application/json" };
    const body = JSON.stringify({
      ...createSearchRequestBody(searchParams),
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
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoaches();
  }, [sortOption]);

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

  return (
    <div>
      <SearchNavbar
        searchParams={searchParams}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleModalShow={handleModalShow}
        handleSortChange={handleSortChange}
        getSortDirectionIcon={getSortDirectionIcon}
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
            <div className="d-flex justify-content-center">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : error ? (
            <Alert variant="danger">Something went wrong. Please try again later.</Alert>
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
      </Container>
    </div>
  );
};

export default CoachSearch;