export default function StatusCard({ text, number }) {
    return (

        <div className="bg-white p-8 flex flex-col items-center 
        justify-center rounded-lg gap-2 text-center">

            <h2 className="text-[#244D3F] font-semibold text-3xl">{number}</h2>
            <p className="text-[#64748B] text-lg">{text}</p>
        </div>
    )
}