export default function CamposEntrada({ label, type, placeholder, icon }) {
  return (
    <label className="flex flex-col w-full">
      <p className="text-earth-dark dark:text-gray-200 text-base font-medium leading-normal pb-2">
        {label}
      </p>
      <div className="flex w-full items-stretch rounded-lg relative group">
        <input
          type={type}
          placeholder={placeholder}
          className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-earth-dark dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-earth-border dark:border-gray-700 bg-white dark:bg-gray-800 focus:border-primary h-14 placeholder:text-earth-muted dark:placeholder:text-gray-500 p-[15px] pr-12 text-base font-normal leading-normal transition-all"
        />
        {/* Si pasamos un icono (como el ojo), lo mostramos aquí */}
        {icon && (
          <div className="absolute right-0 top-0 bottom-0 flex items-center justify-center pr-4 cursor-pointer text-earth-muted dark:text-gray-400 hover:text-earth-dark dark:hover:text-white transition-colors">
            <span className="material-symbols-outlined text-2xl">{icon}</span>
          </div>
        )}
      </div>
    </label>
  );
}