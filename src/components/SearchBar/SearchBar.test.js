import React from "react";
import { render } from "@testing-library/react";
import SearchBar from "./SearchBar";

describe("search bar test", () => {
  it("check if the input clean itself when you click on add", () => {
    const { queryByTestId } = render(<SearchBar></SearchBar>);
    queryByTestId("input-searchbar").values = "test";
    expect(queryByTestId("input-searchbar").values).toBe("test");
    queryByTestId("button-searchbar").click();
    setTimeout(() => expect(queryByTestId("input-searchbar").values).toBe(""));
  });

  it("check if we get video inserted to the list", () => {
    const setVideoList = jest.fn();
    const useStateMock = (useState) => [useState, setVideoList];
    jest.spyOn(React, "useState").mockImplementation(useStateMock);

    const { queryByTestId } = render(
      <SearchBar setVideoList={setVideoList}></SearchBar>
    );
    const video =
      "https://www.youtube.com/watch?v=pYU108z8ixg&list=RDpYU108z8ixg&start_radio=1";
    queryByTestId("input-searchbar").values = video;
    queryByTestId("button-searchbar").click();
    expect(setVideoList).toBeCalledWith("");
    setTimeout(() => {
      expect(queryByTestId("input-searchbar").values).toBe("");
    });
  });
});


