import React, { useEffect } from "react";
import { Typography, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import useAxios from "./hooks/useAxios";
import ApiResult from "./models/apiResult";
import Characters from "./models/characters";
import { useCharactersState } from "./providers/GlobalProvider";

export default function Characters(props: any) {
  const { data, fetchData, loading, error } = useAxios<ApiResult<Characters>>();
  const { setCharacters } = useCharactersState();

  useEffect(() => {
    if (!data) {
      fetchData("https://swapi.dev/api/people/");
    } else {
      setCharacters(data.results);
    }
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error :(</h1>;

  return (
    <div>
      <Typography variant="h2">Characters</Typography>
      {data?.results.map((person: any) => {
        const personUrlParts = person.url.split("/").filter(Boolean);
        const personId = personUrlParts[personUrlParts.length - 1];
        return (
          <article key={personId} style={{ margin: "16px 0 0" }}>
            <Link component={RouterLink} to={`/characters/${personId}`}>
              <Typography variant="h6">{person.name}</Typography>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
