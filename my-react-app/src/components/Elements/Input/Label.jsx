const Label = (props) => {
  const { htmlFor, children } = props;
  return (
    <label
      htmlFor={htmlFor}
      className="block text-slate-700 label-sm font-bold mb-2">
      {children}
    </label>
  );
};

export default Label;
