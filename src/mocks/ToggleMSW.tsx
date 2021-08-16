import React, { useEffect } from "react";
import { Button } from "@material-ui/core";
import useLocalStorage from "../hooks/useLocalStorage";
import { worker } from "./browser";

export default () => {
  const { storedValue, setValue } = useLocalStorage<boolean>("msw", false);

  useEffect(() => {
    storedValue ? worker.start() : worker.stop();
  });

  const onClick = () => {
    storedValue ? setValue(false) : setValue(true);
  };

  return (
    <>
      {process.env.NODE_ENV === "development" && (
        <div style={{ position: "fixed", bottom: "0.5em", left: "4em" }}>
          <Button
            onClick={onClick}
            variant="outlined"
            style={{
              backgroundColor: storedValue ? "green" : "",
              color: storedValue ? "whitesmoke" : "",
            }}
          >
            {storedValue ? "Mocking Enabled" : "Mocking Disabled"}
          </Button>
        </div>
      )}
    </>
  );
};
