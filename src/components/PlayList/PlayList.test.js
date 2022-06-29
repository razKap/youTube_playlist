import { render } from "@testing-library/react";
import PlayList from "./PlayList";

describe("playList tests", () => {
  it("should item in list", () => {
    const mock = {
      PT1H11M1S: {
        Thumbnails: "https://i.ytimg.com/vi/7Mxg4VkkRRI/default.jpg",
        duration: "PT1H11M1S",
        id: "7Mxg4VkkRRI",
      },
    };
    const { queryAllByTestId } = render(
      <PlayList listOfVideoes={new Map(Object.entries(mock))} />
    );
    expect(queryAllByTestId("input-searchbar").length).toBe(1);
  });
});
