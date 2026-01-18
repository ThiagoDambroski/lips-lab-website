import React from "react";
import "../scss/InfoPage.css"
import Navbar from "../Navbar/Navbar";

type InfoLayoutProps = {
  title: string;
  breadcrumb: string;
  children: React.ReactNode;
};

export default function InfoLayout({ title, breadcrumb, children }: InfoLayoutProps) {
  return (
    <>
    <Navbar css={1}/>
     <main className="info-page">
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
