import { FC } from 'react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    className?: string;
    color?: string;
    backgroundColor?: string;
    borderColor?: string;
}

const PrimaryButton: FC<PrimaryButtonProps> = ({
    className = '',
    color = '#fff',
    backgroundColor = 'transparent',
    borderColor = '#fff',
    children,
    ...props
}) => {
    const customStyles = {
        color,
        backgroundColor,
        border: `1px solid ${borderColor}`,
    };

    return (
        <button className={`primary-button ${className}`} style={customStyles} {...props}>
            {children}
        </button>
    );
};

export default PrimaryButton;
