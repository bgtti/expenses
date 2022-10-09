import "../../Styles/Footer.css";
import GithubIcon from "../../Images/github.png";

function Footer() {
    return (
        <footer className='Footer'>
            <p>2022 by </p>
            <a href="https://github.com/bgtti"><img src={GithubIcon} alt="github repo" /></a>
        </footer>
    )
}

export default Footer;