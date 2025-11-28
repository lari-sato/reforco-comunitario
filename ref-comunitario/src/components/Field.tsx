import { type ReactNode } from "react";

type Props = {
  label: string;
  htmlFor?: string;
  children: ReactNode;
  className?: string;
};

export function Field({ label, htmlFor, children, className }: Props) {
  return (
    <div className={className}>
      <label className="field-label" htmlFor={htmlFor}>{label}</label>
      <div className="field-box">{children}</div>
    </div>
  );
}
