import CamposEntrada from "../components/ui/CamposEntrada.jsx";
import Boton from "../components/ui/Boton.jsx";
import logoMochilista from '../assets/logo.png'; 

// ✅ SÍ puedes cambiar el nombre de la función a español
export default function InicioSesion() {
  return (
    // ⚠️ RESTAURADO: Las clases de Tailwind deben quedarse como estaban en tu configuración original
    // (bg-background-light, text-earth-dark, etc.)
    <div className="flex h-screen w-full flex-row font-display text-earth-dark dark:text-white bg-background-light dark:bg-background-dark overflow-hidden">

      {/* Lado Izquierdo: Imagen */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-earth-dark">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('https://media.istockphoto.com/id/904172104/photo/weve-made-it-all-this-way-i-am-proud.jpg?s=612x612&w=0&k=20&c=MewnsAhbeGRcMBN9_ZKhThmqPK6c8nCT8XYk5ZM_hdg=')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        <div className="absolute bottom-12 left-12 text-white max-w-md p-4">
          <p className="text-lg font-medium opacity-90 mb-2">No volverás a escuchar esta frase:</p>
          <h2 className="text-3xl font-bold leading-tight">"Tengo la sensación de que se me olvida algo."</h2>
        </div>
      </div>

      {/* Lado Derecho: Formulario */}
      <div className="flex flex-1 flex-col justify-center items-center bg-white dark:bg-background-dark p-6 lg:px-24 lg:py-8 relative">

        <div className="w-full max-w-[440px] flex flex-col gap-4">
          
          {/* Header con Logo */}
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary overflow-hidden">
               <img 
                 src={logoMochilista} 
                 alt="Logo Mochilista" 
                 className="w-full h-full object-contain p-1" 
               />
            </div>
            <span className="text-2xl font-bold tracking-tight">Mochilista</span>
          </div>

          <div className="flex flex-col">
            <h1 className="text-[28px] font-bold leading-tight pb-1">Bienvenido, viajero.</h1>
            <p className="text-earth-muted dark:text-gray-400 text-sm">Introduce tus datos para acceder.</p>
          </div>

          {/* Formulario */}
          <form className="flex flex-col gap-4 mt-2">
            
            {/* ⚠️ RESTAURADO: Usamos 'label' en lugar de 'etiqueta' porque el componente CamposEntrada 
               está programado para leer 'label'. Si le pasas 'etiqueta', no sabrá qué leer. */}
            <CamposEntrada 
              label="Email" 
              type="email" 
              placeholder="tu@email.com" 
            />

            <div className="flex flex-col gap-1">
                <CamposEntrada 
                  label="Contraseña" 
                  type="password" 
                  placeholder="Introduce tu contraseña" 
                  icon="visibility" 
                />
                <a className="text-xs font-medium text-primary hover:underline self-end" href="#">
                    ¿Olvidaste la contraseña?
                </a>
            </div>

            <Boton variant="primary">
              Iniciar Sesión
            </Boton>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-earth-border dark:border-gray-700"></div>
              <span className="flex-shrink mx-4 text-earth-muted text-xs">O continúa con</span>
              <div className="flex-grow border-t border-earth-border dark:border-gray-700"></div>
            </div>

            <Boton variant="outline">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
              Google
            </Boton>

          </form>

          <div className="flex justify-center pt-1">
            <p className="text-earth-dark dark:text-gray-300 text-sm">
              ¿No tienes cuenta? <a className="font-bold text-primary hover:underline ml-1" href="#">Regístrate</a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}