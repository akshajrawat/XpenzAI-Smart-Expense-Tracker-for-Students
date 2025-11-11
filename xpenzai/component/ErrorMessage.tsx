interface Props {
  message: string;
}

const ErrorMessage = ({ message }: Props) => {
  return (
    <div className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-50 border border-red-200 text-red-700 rounded-xl shadow-sm transition-all duration-300 animate-fade-in">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-5 h-5 text-red-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.58-1.276.832-2.03L13.83 4.47a1.2 1.2 0 00-1.66 0L5.27 16.97c-.748.754-.222 2.03.832 2.03z"
        />
      </svg>
      <span className="font-medium">{message}</span>
    </div>
  );
};

export default ErrorMessage;
