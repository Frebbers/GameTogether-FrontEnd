function Footer(){

    return(
        <footer className = "footer">
        <hr />
           <nav>
            <ul className = "nav-list">
                <li> <button> FAQ </button> </li>
                <li> <button> About </button> </li>
                <li> &copy; {new Date().getFullYear()} GameTogether </li>
                <li> <button> Support </button> </li>
                <li> <button> Private Policy </button> </li>
            </ul>
           </nav>
        </footer>
    );

}

export default Footer