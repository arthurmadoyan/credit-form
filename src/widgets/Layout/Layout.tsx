import { Outlet } from "react-router-dom";
import styles from "./Layout.module.scss";

export default function Layout() {
    return (
        <main className={styles.layout}>
            <div className={styles.container}>
                <h1 className={styles.title}>Credit form</h1>

                <div className={styles.formWrapper}>
                    <Outlet />
                </div>
            </div>
        </main>
    );
}
