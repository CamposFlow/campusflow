const SectionHeader = ({ title, sub }) => {
    return (
        <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <p className="text-sm text-gray-400 mt-0.5">{sub}</p>
        </div>
    )
}
export default SectionHeader;