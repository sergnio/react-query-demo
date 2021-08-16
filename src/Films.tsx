import React, { useEffect, useState } from "react";
import { Link, Typography } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import axios from "axios";

export default function Films(props: any) {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState();
  const [error, setError] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("https://swapi.dev/api/films/");
      setData(data);
    } catch (e) {
      setError(true);
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>Error :( sorry idk what happened</h1>;
  }

  return (
      <div>
        <Typography variant="h2">Films</Typography>
        {/*@ts-ignore*/}
        {data?.results.map((film: any) => {
          const filmUrlParts = film.url.split("/").filter(Boolean);
          const filmId = filmUrlParts[filmUrlParts.length - 1];
          return (
              <article key={filmId}>
                <Link component={RouterLink} to={`/films/${filmId}`}>
                  <Typography variant="h6">
                    {film.episode_id}. {film.title}{" "}
                    <em>
                      ({new Date(Date.parse(film.release_date)).getFullYear()})
                    </em>
                  </Typography>
                </Link>
              </article>
          );
        })}
      </div>
  );
}
