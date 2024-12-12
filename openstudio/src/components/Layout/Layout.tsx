import { ReactNode } from "react";

import ConcreteBackground from "./ConcreteBackground";

interface BackgroundProps {
  children: ReactNode;
}

const Layout = ({ children }: BackgroundProps) => {
  return (
    <div style={{ minHeight: "100vh" }}>
      <ConcreteBackground>{children}</ConcreteBackground>
    </div>
  );
};

export default Layout;
