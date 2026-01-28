import { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode }) => (
  <div className="container">{children}</div>
);

export default Container;
