import right from "../assets/icons/right.svg";
import left from "../assets/icons/left.svg";

export function PagerButtons() {
  return (
    <div className="pager">
      <button type="button" aria-label="Anterior" className="pager__btn">
        <img src={left} alt="Anterior" className="pager__icon" />
      </button>

      <span className="pager__label">1/30</span>

      <button type="button" aria-label="Próxima" className="pager__btn">
        <img src={right} alt="Próxima" className="pager__icon" />
      </button>
    </div>
  );
}
