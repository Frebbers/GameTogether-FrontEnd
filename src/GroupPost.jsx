import Tag from "./Tag"

const GroupPost = ({ name, owner, members, description, tags }) => {

    return(

        <div className = "bg_gray-700 text-white p-4 rounded-md m-2">
            <div className = "flex justify-between front-bold">
                <span>{name}</span>
                <span>{owner}</span>
                <span>Members: {members}</span>
            </div>
            <p className = "bg-gray-500 p-2 rounded my-2"> {description} </p>
            <div className = "flex flex-wrap">
                {tags.map((tag, index) => (
                    <Tag key = {index} text = {tag}></Tag>
                ))}
            </div>
            <button className = "bg-green-500 text-white w-full mt-2 py-2 rounded"> Reguest to join </button>
        </div>
    );
}
