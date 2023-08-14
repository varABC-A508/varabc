const AlgorithmTypeCheckbox = ({ idx, children, checked, onCheckChange }) => {
  return (
    <label>
      <input type="checkbox" checked={checked} onChange={onCheckChange} className="me-1" />
      {children}
    </label>
  );
};

export default AlgorithmTypeCheckbox; 