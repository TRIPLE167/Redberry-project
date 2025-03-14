import "./header.scss"

function Header(){
    return(
        <main>
            <img src="/assets/images/logo.png" alt="Logo" />
            <div className="buttons">
                <button>თანამშრომლის შექმნა</button>
                <button><i className="material-icons">add</i>შექმენი ახალი დავალება</button>
            </div>
        </main>
    )
}
export default Header