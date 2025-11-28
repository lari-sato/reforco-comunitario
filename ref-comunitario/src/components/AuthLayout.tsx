import { Topbar } from "./Topbar";
import { Link } from "react-router-dom";
import { type ReactNode } from "react";

type Props = {
  variant: "login" | "register";
  title: string;
  ctaText: string;
  ctaLinkText: string;
  ctaHref: string;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
  children: ReactNode;
};

export function AuthLayout({
  variant, title, ctaText, ctaLinkText, ctaHref, onSubmit, children,
}: Props) {
  return (
    <div className={`auth-page ${variant}-page`}>
      <Topbar />
      <form className="auth-form" onSubmit={onSubmit}>
        <h3>{title}</h3>
        <p className="auth-subcta">
          {ctaText} <Link to={ctaHref}>{ctaLinkText}</Link>
        </p>
        {children}
      </form>
    </div>
  );
}
