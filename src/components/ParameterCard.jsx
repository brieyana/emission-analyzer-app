/* eslint-disable react/prop-types */
const ParameterCard = ({ parameter, value }) => {
    return (
        <div className="flex flex-col gap-2">
            <h3 className="text-center font-bold">{parameter}</h3>
            <p className="text-center">{value}</p>
        </div>
    )
}

export default ParameterCard;