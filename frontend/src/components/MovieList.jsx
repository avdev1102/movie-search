import React from "react";

const MovieList = ({ movies }) => {
  // Define the order of watch provider types
  const providerTypes = ["flatrate", "rent", "buy", "free", "ads"];

  return (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            {/* Movie Poster */}
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-4">
              {/* Movie Title and Release Year */}
              <h2 className="text-xl font-semibold">
                {movie.title}{" "}
                <span className="text-gray-500">
                  ({movie.release_date ? movie.release_date.split("-")[0] : "N/A"}) Rating: {movie.vote_average}
                </span>
              </h2>
              {/* Movie Overview */}
              <p className="text-gray-600 mt-2 ">{movie.overview}</p>
              {/* Watch Providers */}
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Watch Providers:</h3>
                {movie.watch_providers && (
                  <div className="space-y-3">
                    {providerTypes.map((type) => {
                      const providers = movie.watch_providers[type];
                      if (providers && providers.length > 0) {
                        return (
                          <div key={type}>
                            <h4 className="font-medium capitalize text-sm text-gray-700">
                              {type == 'flatrate' ? 'Stream' : type}:
                            </h4>
                            <div className="flex flex-wrap gap-2 mt-1">
                              {providers.map((provider) => (
                                <div
                                  key={provider.provider_id}
                                  className="flex items-center bg-gray-100 rounded-lg p-2"
                                >
                                  <img
                                    src={`https://image.tmdb.org/t/p/w45${provider.logo_path}`}
                                    alt={provider.provider_name}
                                    className="w-6 h-6 rounded"
                                  />
                                  <span className="ml-2 text-sm">{provider.provider_name}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        );
                      }
                      return null; // Skip if no providers for this type
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 col-span-full text-center">No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;