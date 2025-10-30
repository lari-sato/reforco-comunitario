type Props = {
  value: string;
  onChange: (term: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="search-bar">
      <input
        type="search"
        className="search-bar__input"
        placeholder="Pesquise aqui..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
