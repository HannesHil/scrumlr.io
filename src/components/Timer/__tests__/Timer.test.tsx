import { vi } from "vitest";
import {render} from "testUtils";
import {Timer} from "components/Timer";
import {useAppSelector} from "store";

vi.mock("store");
const mockedUseAppSelector = vi.mocked(useAppSelector);

describe("Timer", () => {
  test("should render correctly", () => {
    mockedUseAppSelector.mockResolvedValue({} as never);
    const {container} = render(<Timer endTime={new Date(new Date().getTime() + 3 * 60000)} />, {container: document.getElementById("root")!});
    expect(container.firstChild).toMatchSnapshot();
  });

  test("should have cancel button if user is moderator", () => {
    mockedUseAppSelector.mockResolvedValue({} as never);
    const {container} = render(<Timer endTime={new Date(new Date().getTime() + 3 * 60000)} />, {container: document.getElementById("root")!});
    expect(container.firstChild).toContainElement(container.getElementsByTagName("button")[0]);
  });

  test("should have expired class if timer is over", () => {
    mockedUseAppSelector.mockResolvedValue({} as never);
    const {container} = render(<Timer endTime={new Date(new Date().getTime())} />, {container: document.getElementById("root")!});
    expect(container.firstChild).toHaveClass("timer--expired");
  });
});
