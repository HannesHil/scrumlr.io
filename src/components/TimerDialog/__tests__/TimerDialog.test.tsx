import {beforeEach} from "vitest";
import {fireEvent, render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import {Actions} from "store/action";
import getTestStore from "utils/test/getTestStore";
import getTestParticipant from "utils/test/getTestParticipant";
import i18nTest from "i18nTest";
import {I18nextProvider} from "react-i18next";
import {TimerDialog} from "..";
import store from "store";

vi.mock("store");
const storeDispatchSpy = vi.spyOn(store, "dispatch");

const mockedUsedNavigate = vi.fn();
vi.mock("react-router-dom", async () => ({
  ...(await vi.importActual<any>("react-router-dom")),
  useNavigate: () => mockedUsedNavigate,
}));

const createTimerDialog = (isParticipant?: boolean) => (
  <I18nextProvider i18n={i18nTest}>
    <Provider store={getTestStore({participants: {self: getTestParticipant({role: isParticipant ? "PARTICIPANT" : "MODERATOR"}), others: []}})}>
      <TimerDialog />
    </Provider>
  </I18nextProvider>
);

describe("TimerDialog", () => {
  beforeEach(() => {
    const portal = global.document.createElement("div");
    portal.setAttribute("id", "portal");
    global.document.querySelector("body")?.appendChild(portal);
  });

  it("should match the napshot", () => {
    const {container} = render(createTimerDialog(), {container: global.document.querySelector("#portal")!});
    expect(container.firstChild).toMatchSnapshot();
  });

  it("should redirect if the current user isn't a moderator", () => {
    render(createTimerDialog(true), {container: global.document.querySelector("#portal")!});
    expect(mockedUsedNavigate).toHaveBeenCalledWith("..");
  });

  it("should dispatch to store correctly on one minute button click", async () => {
    render(createTimerDialog(), {container: global.document.querySelector("#portal")!});
    fireEvent.click(screen.getByTestId("timer-dialog__1-minute-button"));
    expect(storeDispatchSpy).toHaveBeenCalledWith(Actions.setTimer(1));
  });

  it("should dispatch to store correctly on three minute button click", () => {
    render(createTimerDialog(), {container: global.document.querySelector("#portal")!});
    fireEvent.click(screen.getByTestId("timer-dialog__3-minute-button"));
    expect(storeDispatchSpy).toHaveBeenCalledWith(Actions.setTimer(3));
  });

  it("should dispatch to store correctly on five minute button click", () => {
    render(createTimerDialog(), {container: global.document.querySelector("#portal")!});
    fireEvent.click(screen.getByTestId("timer-dialog__5-minute-button"));
    expect(storeDispatchSpy).toHaveBeenCalledWith(Actions.setTimer(5));
  });

  it("should dispatch to store correctly after custom time change", () => {
    render(createTimerDialog(), {container: global.document.querySelector("#portal")!});
    fireEvent.click(screen.getByTestId("timer-dialog__minus-button"));
    fireEvent.click(screen.getByTestId("timer-dialog__custom-minute-button"));
    expect(storeDispatchSpy).toHaveBeenCalledWith(Actions.setTimer(9));
    fireEvent.click(screen.getByTestId("timer-dialog__plus-button"));
    fireEvent.click(screen.getByTestId("timer-dialog__plus-button"));
    fireEvent.click(screen.getByTestId("timer-dialog__custom-minute-button"));
    expect(storeDispatchSpy).toHaveBeenCalledWith(Actions.setTimer(11));
  });
});
