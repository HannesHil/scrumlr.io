import classNames from "classnames";
import "./TooltipButton.scss";
import {Icon, IconType} from "components/Icon";

type TooltipButtonProps = {
  direction?: "left" | "right";
  onClick: () => void;
  label: string;
  disabled?: boolean;
  icon: IconType;
  className?: string;
  active?: boolean;
  hotkeyKey?: string;
};

export const TooltipButton = (props: TooltipButtonProps) => (
  <button
    disabled={props.disabled}
    className={classNames("tooltip-button", `tooltip-button--${props.direction ?? "right"}`, {"tooltip-button--active": props.active}, props.className)}
    onClick={() => props.onClick()}
    aria-label={props.label}
  >
    <div className="tooltip-button__tooltip" aria-hidden>
      <span className="tooltip-button__tooltip-text">
        {props.label}
        {props.hotkeyKey !== undefined && <span className="tooltip-button__hotkey">{` [${props.hotkeyKey}]`}</span>}
      </span>
    </div>
    <Icon name={props.icon} className="tooltip-button__icon" aria-hidden />
    {/* TODO Close button is missing here */}
  </button>
);
