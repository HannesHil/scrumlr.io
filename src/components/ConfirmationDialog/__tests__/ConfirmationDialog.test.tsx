import { vi } from "vitest";
import {render} from "testUtils";
import {ConfirmationDialog} from "../ConfirmationDialog";

describe("<ConfirmationDialog />", () => {
  test("snapshot test", () => {
    const {container} = render(<ConfirmationDialog headline="headline" acceptMessage="accept" declineMessage="decline" onAccept={vi.fn()} onDecline={jest.fn()} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
