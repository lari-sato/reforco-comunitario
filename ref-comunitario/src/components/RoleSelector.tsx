export type Role = "aluno" | "instrutor";

type Props = {
  selected: Role[];
  onChange: (roles: Role[]) => void;
  labels?: Partial<Record<Role, string>>;
};

export function RoleSelector({ selected, onChange, labels }: Props) {
  const items: Role[] = ["aluno", "instrutor"];
  function toggle(role: Role) {
    const has = selected.includes(role);
    onChange(has ? selected.filter(r => r !== role) : [...selected, role]);
  }
  return (
    <div className="role-list">
      {items.map(r => (
        <div
          key={r}
          className={`role-item ${selected.includes(r) ? "active" : ""}`}
          onClick={() => toggle(r)}
        >
          <span className="label">{labels?.[r] ?? (r === "aluno" ? "Aluno(a)" : "Instrutor(a)")}</span>
          <span className="circle" />
        </div>
      ))}
    </div>
  );
}
