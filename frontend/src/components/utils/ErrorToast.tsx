interface ToastProps {
  error: string | null;
}

const ErrorToast = ({ error }: ToastProps) => {
  return (
    <>
      {error && (
        <p className="text-white text-center p-4 py-2 md:py-4 mb-4 bg-red-500/20 border border-red-600 rounded-md">
          {error}
        </p>
      )}
    </>
  );
};

export default ErrorToast;
