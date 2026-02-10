export default function Boton({ children, variant = "primary", onClick }) {
  // Definimos los estilos base
  const baseStyles = "w-full font-bold text-lg h-14 rounded-lg transition-colors shadow-sm active:scale-[0.99] transform flex items-center justify-center gap-3";
  
  // Definimos variantes
  const variants = {
    primary: "bg-primary hover:bg-[#52c918] text-earth-dark",
    outline: "bg-white dark:bg-gray-800 border border-earth-border dark:border-gray-700 text-earth-dark dark:text-white hover:bg-background-light dark:hover:bg-gray-700"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]}`} 
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}