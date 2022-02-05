import styles from './Error.module.css';

const Error = (props) => (
  <div className={`${styles.error} alert alert-danger rounded-0`} role="alert">
    {props.message}
  </div>
);

export default Error;
