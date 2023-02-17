import { shallow } from "enzyme";
import Header from "./Header";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Header Component test suite", () => {
  it("Header Component test case", () => {
    const headerComponent = shallow(<Header />);
    expect(headerComponent).toMatchSnapshot();
  });
});
