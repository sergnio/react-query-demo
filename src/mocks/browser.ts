// src/mocks/browser.js
import { rest, setupWorker } from "msw";
import mockFilms from "./mockFilms";
import mockCharacters from "./mockCharacters";

const mockApiHandlers = [
  simpleGet("https://swapi.dev/api/films", mockFilms),
  simpleGet("https://swapi.dev/api/people", mockCharacters),
];

function simpleGet<T>(url: string, mockData: T, statusCode: number = 200) {
  return rest.get(url, (req, res, ctx) =>
    res(ctx.delay(1000), ctx.status(statusCode), ctx.json(mockData))
  );
}

// This configures a Service Worker with the given request mockApiHandlers.
export const worker = setupWorker(...mockApiHandlers);
