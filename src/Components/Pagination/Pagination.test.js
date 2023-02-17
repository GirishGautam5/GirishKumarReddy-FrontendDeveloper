import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Pagination from "./Pagination";

Enzyme.configure({ adapter: new Adapter() });

describe("Pagination Component test suite", () => {
  it("Pagination Component test case", () => {
    const props = {
      totalCapsules: 25,
      capsulesPerPage: 9,
      currentPage: 1,
      setCurrentPage: jest.fn(),
    };
    const paginationComponent = shallow(<Pagination {...props} />);
    expect(paginationComponent).toMatchSnapshot();
  });
});
