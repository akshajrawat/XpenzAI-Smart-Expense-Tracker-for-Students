interface props {
  message: string;
}

const Loading = ({ message = "" }: props) => {
  return (
    <div className="mt-4 flex items-center justify-center">
      <div className="w-6 h-6 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
      <span className="ml-2 text-green-700 font-medium"> {message}</span>
    </div>
  );
};

export default Loading;
