import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Capsules, { filteredData } from "./Capsules";
import React from "react";

Enzyme.configure({ adapter: new Adapter() });

describe("Capsules test suite", () => {
  const capsulesComponent = shallow(<Capsules />);
  const useEffectMock = jest.spyOn(React, "useEffect");
  beforeEach(() => {
    useEffectMock.mockClear();
  });
  it("Capsules component  test case", () => {
    expect(capsulesComponent).toMatchSnapshot();
  });
  it("Capsules test case for useeffect", () => {
    const capsules = [
      {
        capsule_serial: "C102",
        type: "Dragon 1.0",
        reuse_count: 0,
        landings: 0,
        details: "Dragon capsule",
        original_launch: "2010-12-08T15:43:00.000Z",
        original_launch_unix: 1291822980,
        status: "active",
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
      .mockReturnValueOnce([capsules, (val) => val])
      .mockReturnValueOnce([1, (val) => val])
      .mockReturnValueOnce([false, (val) => val])
      .mockReturnValueOnce([
        { type: "C102", status: "active", landings: "0" },
        (val) => val,
      ]);
    const capsulesComponent = shallow(<Capsules />);
    expect(capsulesComponent).toBeDefined();
  });
  it("filtereredData test case", () => {
    const capsules = [
      {
        capsule_serial: "C102",
        type: "Dragon 1.0",
        reuse_count: 0,
        landings: 0,
        details: "Dragon capsule",
        original_launch: "2010-12-08T15:43:00.000Z",
        original_launch_unix: 1291822980,
        status: "active",
      },
    ];
    const filter = {
      type: "C102",
      status: "active",
      landings: 0,
    };
    const result = filteredData(capsules, filter);
    expect(result).toEqual(capsules);
  });
  it("filtereredData test case when filter data is empty", () => {
    const capsules = [
      {
        capsule_serial: "C102",
        type: "Dragon 1.0",
        reuse_count: 0,
        landings: 0,
        details: "Dragon capsule",
        original_launch: "2010-12-08T15:43:00.000Z",
        original_launch_unix: 1291822980,
        status: "rejected",
      },
    ];
    const filter = {
      type: "",
      status: "",
      landings: "",
    };
    const mockUseEffect = () => {
      useEffectMock.mockImplementationOnce((f) => f());
    };
    mockUseEffect();
    mockUseEffect();
    mockUseEffect();
    mockUseEffect();
    React.useState = jest
      .fn()
      .mockReturnValueOnce([capsules, (val) => val])
      .mockReturnValueOnce([1, (val) => val])
      .mockReturnValueOnce([false, (val) => val])
      .mockReturnValueOnce([
        { type: "d", status: "b", landings: "" },
        (val) => val,
      ]);
    const capsulesComponent = shallow(<Capsules />);
    expect(capsulesComponent).toBeDefined();
    const result = filteredData(capsules, filter);
    expect(result).toEqual(capsules);
  });
});
