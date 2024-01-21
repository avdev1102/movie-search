import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import MovieList from "./components/MovieList";
import Pagination from "./components/Pagination";
import LoadingSpinner from "./components/LoadingSpinner";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [watchProviders, setWatchProviders] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedProvider, setSelectedProvider] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("/api/genres");
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchWatchProviders = async () => {
      try {
        const response = await fetch("/api/watch-providers");
        const data = await response.json();

        data.sort((namea, nameb) => {
          return namea.provider_name.localeCompare(nameb.provider_name);
        });

        setWatchProviders(data);
      } catch (error) {
        console.error("Error fetching watch providers:", error);
      }
    };
  
    fetchWatchProviders();
  }, []);

  //fetch data for search query, filter by genre/provider
  const handleSearch = async (query, page = 1) => {
    if (!query && !selectedGenre && !selectedProvider) {
      alert("Please enter a search term or select a genre and provider.");
      return;
    }
  
    setIsLoading(true); 
    setError(null);

    try {
      let data;
      const response = await fetch(`/api/search?query=${query}&page=${page}&genre=${selectedGenre}&provider=${selectedProvider}`);
      data = await response.json();

      if(data.error){
        setError(data.error);
      } else {
        // Filter movies by selected genre and provider (only if search query is used)
        if(query){
          const filteredMovies = data.results.filter((movie) => {
        
            const matchesGenre =
              !selectedGenre || movie.genre_ids.includes(Number(selectedGenre));
            
            const providers = Object.values(movie.watch_providers).flat();
        
            const matchesProvider =
              !selectedProvider || providers.some(provider => provider.provider_id === Number(selectedProvider));
  
            //filter out unreleased movies
            const unreleased = movie.release_date === "" ? false : true;
              
            return matchesGenre && matchesProvider && unreleased;
          });

          setMovies(filteredMovies);
        } else {
          setMovies(data.results);
        }  
        setTotalPages(data.total_pages)
        setCurrentPage(page);
      }
      console.log(data);
        
    } catch (error) {
      setError(error.message);
    } finally{
      setIsLoading(false); 
    }
  };

  const handlePageChange = (page) => {
    handleSearch(query, page);
  };

  
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Movie Search</h1>
      <SearchBar onSearch={(query) => { setQuery(query); handleSearch(query, 1); }} />
      <Filters
        genres={genres}
        selectedGenre={selectedGenre}
        onGenreChange={setSelectedGenre}
        watchProviders={watchProviders}
        selectedProvider={selectedProvider}
        onProviderChange={setSelectedProvider}
      />
      {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <MovieList movies={movies} />
          {!error && movies.length > 0 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;