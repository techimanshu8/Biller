function BatchCard(props) {
    const OnChange = () => {
    }
    return (
        <div>
            <label className="name-label-supplier" style={{ paddingRight: '10px' }}>{props.title}: </label>
            <input type="text" value={props.value} style={{ marginRight: '90px' }} onChange={OnChange}/>
        </div>
    )
}

export default BatchCard
