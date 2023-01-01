import styles from "./Alert.module.css";

const Alert = ({ message, type }) => {
    return (
        <div className={`${styles.alert} ${`${styles}.${type}`}`}>
            <p>{message}</p>
        </div>
    );
};

export default Alert;
