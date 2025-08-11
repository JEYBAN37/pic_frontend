export const AlertComponent: React.FC<{ message: string }> = ({ message }) => (
    <div className={`text-xs text-red-600 min-h-[0.5rem] transition-opacity duration-200 ${message ? 'opacity-100' : 'opacity-0'
        }`}
        role="alert">
        {message}
    </div>
);