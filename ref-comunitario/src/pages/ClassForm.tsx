import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function ClassForm() {
  const navigate = useNavigate();

  const [helpType, setHelpType] = useState<"video" | "online" | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [description, setDescription] = useState("");

  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const dayNumber = i - 1;
    return dayNumber > 0 && dayNumber <= 31 ? dayNumber : null;
  });

  const timeSlots = ["14:00", "14:30", "15:00"];

  const handleSubmit = () => {
    console.log({ helpType, selectedDate, selectedTime, description });

    if (!helpType) {
      alert("Selecione um tipo de ajuda!");
      return;
    }

    navigate("/inbox");
  };

  return (
    <div className="classform-page container">
      <h1 className="classform-title">Solicitar Ajuda</h1>

      <div className="classform-content">
        
        <div className="form-section">
          <label className="section-label">TIPO DE AJUDA</label>
          
          <div
            className={`selection-box ${helpType === "video" ? "selected" : ""}`}
            onClick={() => setHelpType(helpType === "video" ? null : "video")}
          >
            <span>VIDEOAULA</span>
            <div className="radio-circle">
              {helpType === "video" && <div className="radio-dot" />}
            </div>
          </div>

          <div
            className={`selection-box ${helpType === "online" ? "selected" : ""}`}
            onClick={() => setHelpType(helpType === "online" ? null : "online")}
          >
            <span>AULA ONLINE</span>
            <div className="radio-circle">
              {helpType === "online" && <div className="radio-dot" />}
            </div>
          </div>
        </div>

        {helpType === "online" && (
          <div className="form-section fade-in">
            <label className="section-label">CALENDÁRIO</label>
            
            <div className="calendar-grid">
              {["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"].map((d) => (
                <div key={d} className="calendar-header">{d}</div>
              ))}

              {calendarDays.map((day, index) => (
                <div key={index} className="calendar-cell">
                  {day && (
                    <button
                      className={`day-btn ${selectedDate === day ? "active" : ""}`}
                      onClick={() => setSelectedDate(selectedDate === day ? null : day)}
                    >
                      {day}
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="time-slots">
              {timeSlots.map((time) => (
                <div
                  key={time}
                  className={`time-box ${selectedTime === time ? "selected" : ""}`}
                  onClick={() => setSelectedTime(selectedTime === time ? null : time)}
                >
                <span>{time}</span>
                <div className="radio-circle small">
                  {selectedTime === time && <div className="radio-dot small" />}
                </div>
              </div>
            ))}
            </div>
          </div>
        )}

        <div className="form-section">
          <label className="section-label">DESCREVA SUA SOLICITAÇÃO</label>
          <textarea
            className="desc-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="form-actions">
          <button className="btn-submit" onClick={handleSubmit}>
            Enviar
          </button>
        </div>

      </div>
    </div>
  );
}
