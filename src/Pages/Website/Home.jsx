// import "./Website.css";

function Home(props) {
    const styleClasses = 'Home ' + props.className;
    return (
        <div className={styleClasses}>
            <p>Hello Home</p>
        </div>
    )
}
export default Home