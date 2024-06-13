import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
};

const PortalComponent = ({ children }: Props) => {
  return createPortal(children, document.getElementById("portal-root")!);
};

export default PortalComponent;
