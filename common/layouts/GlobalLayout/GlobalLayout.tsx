import { FC, ReactNode } from "react";
import NavigationBar from "./NavigationBar";

interface GlobalLayoutProps {
  children: ReactNode;
}
const GlobalLayout: FC<GlobalLayoutProps> = ({ children }) => (
  <div>
    <NavigationBar />
    {children}
    {/* <Footer /> */}
  </div>
);

export default GlobalLayout;
