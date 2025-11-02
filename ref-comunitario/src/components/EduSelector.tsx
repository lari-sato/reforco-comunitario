import { useState } from "react";

type Props = {
  options: string[];
  yearsMap: Record<string, string[]>;
  selectedEdu: string | null;
  selectedYear: string | null;
  onEduChange: (edu: string | null) => void;
  onYearChange: (year: string | null) => void;
};

export function EduSelector({
  options, yearsMap, selectedEdu, selectedYear, onEduChange, onYearChange,
}: Props) {
  const [open, setOpen] = useState<string | null>(null);

  function handleEduClick(edu: string) {
    const willOpen = open === edu ? null : edu;
    setOpen(willOpen);
    onEduChange(willOpen); 
    if (willOpen !== selectedEdu) onYearChange(null);
  }

  return (
    <div className="edu-list">
      {options.map(edu => {
        const isOpen = open === edu;
        const years = yearsMap[edu] ?? [];
        const active = selectedEdu === edu;
        return (
          <div key={edu} className={`edu-item ${isOpen ? "open" : ""}`}>
            <div className="row" onClick={() => handleEduClick(edu)}>
              <span className="label">{edu}</span>
              <span className={`circle ${active ? "active" : ""}`} />
            </div>

            {isOpen && years.length > 0 && (
              <div className="year-row">
                {years.map(y => (
                  <button
                    type="button"
                    key={y}
                    className={`year-btn ${selectedYear === y ? "active" : ""}`}
                    onClick={() => onYearChange(y)}
                  >
                    {y}
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
