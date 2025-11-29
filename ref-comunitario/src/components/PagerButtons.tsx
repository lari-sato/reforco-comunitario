import right from "../assets/icons/right.svg";
import left from "../assets/icons/left.svg";

interface PagerButtonsProps {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
}

export function PagerButtons({ page, totalPages, onPrev, onNext }: PagerButtonsProps) {
  return (
    <div className="pager">
      <button
        type="button"
        aria-label="Anterior"
        className="pager__btn"
        onClick={onPrev}
        disabled={page === 1}
      >
        <img src={left} alt="Anterior" className="pager__icon" />
      </button>

      <span className="pager__label">
        {page}/{totalPages}
      </span>

      <button
        type="button"
        aria-label="Próxima"
        className="pager__btn"
        onClick={onNext}
        disabled={page === totalPages}
      >
        <img src={right} alt="Próxima" className="pager__icon" />
      </button>
    </div>
  );
}
