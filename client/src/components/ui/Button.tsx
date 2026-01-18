

interface PropInfo {
    text: string,
    style: "primary" | "secondary"
    onClick?: () => void
}

const cstyle = {
        primary:"px-4 py-3 transition-all text-center duration-200 hover:scale-95 cursor-pointer  text-white text-black rounded-xl   bg-sky-600",
        secondary:"p-2 py-3  text-black rounded-xl   bg-green-600"
    };


const Button = ({text, style, onClick}: PropInfo) => {
  return (
    <button onClick={onClick} className={`${style == "primary" ? cstyle.primary : cstyle.secondary}`}>{text}</button>
  )
}

export default Button