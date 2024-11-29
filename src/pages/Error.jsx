const Error = () => {
  return (
    <div className="error-page text-center">
      <h1 className="text-red-500 text-2xl">Transaction Failed!</h1>
      <p>There was an issue with your transaction. Please try again later.</p>
      <button className="mt-4 p-2 bg-blue-500 text-white rounded">
        Go to Dashboard
      </button>
    </div>
  );
};

export default Error;
