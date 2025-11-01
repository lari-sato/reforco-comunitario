type Props = {
  label?: string;
  hint?: string;
  accept?: string;
  onFile?: (file: File) => void;
};

export function UploadCertification({
  label = "CERTIFICAÇÃO",
  hint = "*necessário para instruir",
  accept = ".pdf,.png,.jpg,.jpeg",
  onFile,
}: Props) {
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f && onFile) onFile(f);
  }
  const id = "cert-file-input";

  return (
    <>
      <label className="field-label">
        {label} <span className="inline-hint">{hint}</span>
      </label>
      <div className="cert-upload">
        <label htmlFor={id} className="upload-btn">ENVIAR</label>
        <input
          id={id}
          type="file"
          accept={accept}
          onChange={handleChange}
          style={{ display: "none" }}
        />
        <span className="hint">(PDF, PNG ou JPG)</span>
      </div>
    </>
  );
}
