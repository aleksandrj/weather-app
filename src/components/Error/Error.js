const Error = (props) => (
  <div className="alert alert-danger mt-3" role="alert">
    {props.message}
  </div>
);

export default Error;
