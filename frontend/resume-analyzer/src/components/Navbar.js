import Image from "next/image";
import Link from "next/link";
import styles from "../app/page.module.css";

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <div className={styles.brand}>
                <Link href="/">
                <Image
                    src="/next.svg"
                    alt="Next.js logo"
                    width={40}
                    height={60}
                    priority
                />
                </Link>
        </div>
            <ul className={styles.navItems}>
                <li className={styles.navItem}>Upload</li>
                <li className={styles.navItem}>Results</li>
            </ul>
        </nav>
    );
}
