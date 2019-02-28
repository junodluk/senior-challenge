export interface ButtonAction {
  caption: string;
  btnClass?: string;
  iconClass?: string;
  onClick: Function;
  isVisible?: Function;
  isDisabled?: Function;
}
