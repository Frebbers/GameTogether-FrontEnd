const ControlPanel = () => {

    return(
        <div className = "flex justify-between p-2">
            <button className = "bg-gray-500 text-white px-4 py-2"> Filter </button>
            <span className = "bg-gray-300 px-4 py-2"> Available groups: ??? </span>
            <button className = "bg-green-500 text-white px-4 py-2"> Create </button>
        </div>
    );
}

export default ControlPanel