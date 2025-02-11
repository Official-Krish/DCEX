interface PrimaryButtonProps {
    onClick?: () => void;
    active?: boolean;
    children: React.ReactNode;
}

export default function PrimaryButton({ children, onClick, active }: PrimaryButtonProps) {
    return (
        <button 
            className={`${
                active ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-100 text-blue-600 hover:bg-blue-200"
            }  font-bold py-2 px-12 rounded-lg flex items-center`}
            onClick={onClick}
        >
            {children}
        </button>
    );
}
