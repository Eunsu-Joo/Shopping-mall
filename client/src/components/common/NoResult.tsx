const NoResult = ({ message }: { message: string }) => {
  return (
    <div className={"empty"}>
      <p>{message}</p>
    </div>
  );
};
export default NoResult;
