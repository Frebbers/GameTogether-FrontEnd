function Footer(){

    return(
        <footer className = "footer">
        <hr />
           <nav>
            <ul className = "nav-list-footer">
                <li> <a> FAQ </a> </li>
                <li> <a> About </a> </li>
                <li> &copy; {new Date().getFullYear()} GameTogether </li>
                <li> <a> Support </a> </li>
                <li> <a> Private Policy </a> </li>
            </ul>
           </nav>
        </footer>
    );

}

export default Footer