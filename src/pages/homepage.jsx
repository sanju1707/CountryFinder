import React, { createContext, useEffect, useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import CustomMoonLoader from "../components/loader";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ".homepage.css"
import { useNavigate } from "react-router-dom";

export const useCountry = createContext();

const HomePage = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [filteredCountry, setFilteredCountries] = useState([]);
  const [loader, setLoader] = useState(true);
  const [isListView, setIsListView] = useState(false);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const itemsPerPage = 12;

  useEffect(() => {
    fetchCountries();
  }, []);

  useEffect(() => {
    if (sortBy) {
      sortCountries();
    }
  }, [sortBy, sortOrder]);

  const fetchCountries = async () => {
    try {
      setLoader(true);
      const response = await axios.get(
        "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,region,population,latlng"
      );
      setCountryData(response.data);
      setFilteredCountries(response.data);
      setLoader(false);
    } catch (error) {
      console.error("Error fetching countries:", error);
      setLoader(false);
    }
  };

  const toggleTheme = () => {
    setDarkTheme((prev) => !prev);
  };

  const changeHandler = (event) => {
    const query = event.target.value.toLowerCase();
    const filteredItems = countryData.filter((each) =>
      each.name.common.toLowerCase().includes(query)
    );
    setFilteredCountries(filteredItems);
  };

  const toggleView = () => {
    setIsListView((prev) => !prev);
  };

  const handleSortChange = (criteria, order) => {
    setSortBy(criteria);
    setSortOrder(order);
  };

  const sortCountries = () => {
    const sortedCountries = [...filteredCountry];
    if (sortBy === "name") {
      sortedCountries.sort((a, b) => {
        const nameA = a.name.common.toLowerCase();
        const nameB = b.name.common.toLowerCase();
        return sortOrder === "asc"
          ? nameA.localeCompare(nameB)
          : nameB.localeCompare(nameA);
      });
    } else if (sortBy === "population") {
      sortedCountries.sort((a, b) => {
        return sortOrder === "asc"
          ? a.population - b.population
          : b.population - a.population;
      });
    }
    setFilteredCountries(sortedCountries);
  };

  const indexOfLastCountry = currentPage * itemsPerPage;
  const indexOfFirstCountry = indexOfLastCountry - itemsPerPage;
  const currentCountries = filteredCountry.slice(
    indexOfFirstCountry,
    indexOfLastCountry
  );

  const totalPages = Math.ceil(filteredCountry.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const detailsPageHandler = (each) => {
    
    navigate("/details", { state: each });
  };

  return (
    <div
      style={{
        backgroundColor: darkTheme ? "#31473A" : "#EDF4F2",
        color: darkTheme ? "#EDF4F2" : "#31473A",
        minHeight: "100vh",
      }}
    >
      <NavbarComponent
        darkTheme={darkTheme}
        toggleTheme={toggleTheme}
        changeHandler={changeHandler}
        handleSortChange={handleSortChange}
      />
      <div className="d-flex justify-content-end p-3">
        <Button variant="outline-secondary" onClick={toggleView}>
          {isListView ? "Switch to Grid View" : "Switch to List View"}
        </Button>
      </div>

      <div className="d-flex flex-wrap justify-content-around p-3">
        {loader ? (
          <CustomMoonLoader />
        ) : currentCountries.length > 0 ? (
          currentCountries.map((each) => (
            <Card
              key={each.name.common}
              className="card-slide-in"
              style={{
                width: isListView ? "50%" : "18rem",
                margin: "10px",
                backgroundColor: darkTheme ? "#4B5D4A" : "#FFFFFF",
                color: darkTheme ? "#EDF4F2" : "#31473A",
              }}
            >
              <Card.Img
                variant="top"
                src={each.flags.svg}
                style={{
                  width: "100%",
                  height: isListView ? "300px" : "150px",
                  objectFit: "cover",
                }}
              />
              <Card.Body>
                <Card.Title>{each.name.common}</Card.Title>
                <Card.Text>
                  <strong>Capital: </strong>
                  {each.capital ? each.capital.join(", ") : "N/A"}
                  <br />
                  <strong>Population: </strong>
                  {each.population.toLocaleString()}
                </Card.Text>
              </Card.Body>
              <Button
                style={{
                  backgroundColor: darkTheme ? "#EDF4F2" : "#31473A",
                  color: darkTheme ? "#31473A" : "#EDF4F2",
                  border: "none",
                }}
                onClick={() => detailsPageHandler(each)}
              >
                See More
              </Button>
            </Card>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>

      <div className="d-flex justify-content-center p-3">
        <Button
          variant="outline-secondary"
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Prev
        </Button>
        <span className="mx-3">{`Page ${currentPage} of ${totalPages}`}</span>
        <Button
          variant="outline-secondary"
          onClick={nextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
