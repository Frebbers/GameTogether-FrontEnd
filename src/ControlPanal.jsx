const ControlPanel = () => {

    return(
        <div className = "control-panel">
            <button> Filter </button>
            <span className = "bg-gray-300 px-4 py-2"> Available groups: ??? </span>
            <button className = "create-button"> Create </button>
        </div>
    );
}

export default ControlPanel