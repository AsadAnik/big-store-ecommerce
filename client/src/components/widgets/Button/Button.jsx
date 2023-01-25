import "./Button.css";

const Button = ({ title, variant, onClick }) => {
    if (variant === "primary") {
        return (
            <button
                className="button-primary"
                onClick={onClick}
            >
                {title}
            </button>
        );
    }

    if (variant === "secondary") {
        return (
            <button
                className="button-secondary"
                onClick={onClick}
            >
                {title}
            </button>
        );
    }

    if (variant === "danger") {
        return (
            <button
                className="button-danger"
                onClick={onClick}
            >
                {title}
            </button>
        );
    } 

    if (variant === "agree") {
        return (
            <button
                className="button-agree"
                onClick={onClick}
            >
                {title}
            </button>
        );
    }
};

export default Button;