import './Button.scss';

const Button = ({ children, onClick, ...rest }) => {
  return (
    <button className="btn" onClick={onClick} {...rest}>
      {children}
    </button>
  );
};

export default Button;
