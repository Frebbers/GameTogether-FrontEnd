import GameTag from "./GameTag.jsx"

const GroupPost = ({ name, owner, members, description, tags }) => {

    return(

        <div className = "group-post">
            <div className = "group-card-header">
                <span>{name}</span>
                <span>{owner}</span>
                <span>Members: {members}</span>
            </div>
            <p className = "description"> {description} </p>
            <div className = "tags">
                {tags.map((tag, index) => (
                    <GameTag key = {index} text = {tag}></GameTag>
                ))}
            </div>
            <button className = "join-button"> Reguest to join </button>
        </div>
    );
}

export default GroupPost