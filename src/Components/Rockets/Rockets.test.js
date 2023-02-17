import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Rockets, { filteredData, handleFilterChange } from "./Rockets";
import React from "react";
import toJson from "enzyme-to-json";

Enzyme.configure({ adapter: new Adapter() });

describe("Rockets test suite", () => {
  const rocketComponent = shallow(<Rockets />);
  const useEffectMock = jest.spyOn(React, "useEffect");
  beforeEach(() => {
    useEffectMock.mockClear();
  });
  it("Rocket component  test case", () => {
    const rocketComponent = shallow(<Rockets />);
    expect(rocketComponent).toMatchSnapshot();
  });
  it("Rocket component test for useffect", async () => {
    const rocketsData = [
      {
        id: "1",
        rocket_name: "Falcon 9",
        active: false,
        description: "This is Falcon 9 Rocket",
        flickr_images: [{}],
      },
    ];

    const mockUseEffect = () => {
      useEffectMock.mockImplementationOnce((f) => f());
    };
    mockUseEffect();
    mockUseEffect();
    mockUseEffect();
    mockUseEffect();
    React.useState = jest
      .fn()
      .mockReturnValueOnce([rocketsData, (val) => val])
      .mockReturnValueOnce([false, (val) => val])
      .mockReturnValueOnce([{ name: "" }, (val) => val]);
    const rocketComponent = shallow(<Rockets />);
    expect(rocketComponent).toBeDefined();
    expect(toJson(rocketComponent)).toMatchSnapshot();
  });
  it("Rocket component test for rocket status true", () => {
    const rocketsData = [
      {
        id: "1",
        rocket_name: "Falcon 9",
        active: true,
        description: "This is Falcon 9 Rocket",
        flickr_images: [{}],
      },
    ];

    React.useState = jest
      .fn()
      .mockReturnValueOnce([rocketsData, (val) => val])
      .mockReturnValueOnce([false, (val) => val])
      .mockReturnValueOnce([{ name: "" }, (val) => val]);
    const rocketComponent = shallow(<Rockets />);
    expect(rocketComponent).toBeDefined();
  });
  it("Rocket component test for search value", async () => {
    const rocketsData = [
      {
        id: "1",
        rocket_name: "Falcon 9",
        active: true,
        description: "This is Falcon 9 Rocket",
        flickr_images: [{}],
        cost_per_launch: 9000000,
      },
    ];

    const mockUseEffect = () => {
      useEffectMock.mockImplementationOnce((f) => f());
    };
    mockUseEffect();
    mockUseEffect();
    mockUseEffect();
    mockUseEffect();
    React.useState = jest
      .fn()
      .mockReturnValueOnce([rocketsData, (val) => val])
      .mockReturnValueOnce([false, (val) => val])
      .mockReturnValueOnce([{ name: "Falcon 9" }, (val) => val]);
    const rocketComponent = shallow(<Rockets />);
    expect(rocketComponent).toBeDefined();
  });
  it("handleFilterChange testcase", () => {
    const event = {
      target: {
        name: "status",
        value: "true",
      },
    };
    const setFilter = jest.fn();
    const filter = {
      name: "",
      status: "",
      cost: "",
    };
    handleFilterChange(event, setFilter, filter);
  });
  it("filtereredData test case", () => {
    const rockets = [
      {
        id: "1",
        rocket_name: "Falcon 9",
        active: true,
        description: "This is Falcon 9 Rocket",
        flickr_images: [{}],
        cost_per_launch: 9000000,
      },
    ];
    const filter = {
      name: "Falcon 9",
      status: true,
      cost: 9000000,
    };
    const result = filteredData(rockets, filter);
    expect(result).toEqual(rockets);
  });
  it("test case for input onChange", () => {
    rocketComponent.find("input").forEach((textInput) => {
      textInput.props().onChange();
    });
  });
});
