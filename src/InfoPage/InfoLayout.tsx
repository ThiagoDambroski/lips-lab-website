import type { ReactNode } from "react";
import Navbar from "../Navbar/Navbar";
import "../styles/InfoPage.css";

type InfoLayoutProps = {
  title: string;
  breadcrumb: string;
  children: ReactNode;
};

export default function InfoLayout({ title, breadcrumb, children }: InfoLayoutProps) {
  return (
    <>
      <Navbar css={1} />
      <main id="main-content" className="info-page">
        <header className="info-hero">
          <div className="info-hero-inner">
            <h1 className="info-title">{title}</h1>
            <div className="info-breadcrumb">{breadcrumb}</div>
          </div>
        </header>

        <section className="info-content">{children}</section>
      </main>
    </>
  );
}
