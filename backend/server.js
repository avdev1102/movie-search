const express = require("express");
const axios = require("axios");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

app.use(cors());
app.use(express.json());

// Helper function to make TMDb API requests
const tmdbRequest = async (url) => {
  try {
    const response = await axios.get(url, {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TMDB_API_KEY}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch data from TMDb");
  }
};

// Endpoint to search movies by keyword
app.get("/api/search", async (req, res) => {
    const { query, genre, provider, page = 1 } = req.query;
  
    if (!query && !genre && !provider) {
      return res.status(400).json({ error: "Search query OR/AND genre AND provider required" });
    }

    try {
      if(query){
        const data = await tmdbRequest(
          `https://api.themoviedb.org/3/search/movie?query=${query}&page=${page}&region=CA`
        );
    
        // fetch watch providers for each movie
        const moviesWithProviders = await Promise.all(
          data.results.map(async (movie) => {
            const providers = await tmdbRequest(
              `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers`
            );
            return { ...movie, watch_providers: providers.results.CA || {} };
          })
        );

        let finalRes = { ...data, results: moviesWithProviders };

        finalRes.results.sort((moviea, movieb) => movieb.vote_average - moviea.vote_average);

        res.json(finalRes);

      } else{
        if (!genre || !provider) {
          return res.status(400).json({ error: "Genre AND provider is required" });
        }
        else{
          const url = `https://api.themoviedb.org/3/discover/movie?region=CA&watch_region=CA&sort_by=vote_average.desc&page=${page}&with_genres=${genre}&with_watch_providers=${provider}`;

          // Fetch movies from TMDb
          const response = await tmdbRequest(url);

          // Fetch watch providers for each movie
          const moviesWithProviders = await Promise.all(
            response.results.map(async (movie) => {
              const providers = await tmdbRequest(
                `https://api.themoviedb.org/3/movie/${movie.id}/watch/providers`
              );
              return { ...movie, watch_providers: providers.results.CA || {} };
            })
          );
          // console.log(moviesWithProviders);
          const finalRes = { ...response, results: moviesWithProviders };
          // console.log(finalRes.results.length);
          res.json(finalRes);
        }
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }  
});


// Endpoint to get watch providers for a movie
app.get("/api/movie/:id/watch-providers", async (req, res) => {
  const { id } = req.params;

  try {
    const data = await tmdbRequest(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Endpoint to get all watch providers
app.get("/api/watch-providers", async (req, res) => {
    try {
      const data = await tmdbRequest(
        "https://api.themoviedb.org/3/watch/providers/movie?language=en-US&watch_region=CA"
      );
      res.json(data.results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

// Endpoint to get genres
app.get("/api/genres", async (req, res) => {
  try {
    const data = await tmdbRequest(
      `https://api.themoviedb.org/3/genre/movie/list?language=en-US`
    );
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});