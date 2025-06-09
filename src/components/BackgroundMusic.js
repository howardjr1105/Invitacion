import { useEffect } from "react";
import { Howl } from "howler";

const BackgroundMusic = () => {
  useEffect(() => {
    const sound = new Howl({
      src: ["./Me cambiaste la vida.mp3"], // Asegúrate de que la ruta al archivo de audio sea correcta
      loop: true,
      volume: 0.5, // Ajusta el volumen
    });

    sound.play();
  }, []);

  return null; // No es necesario renderizar nada
};

export default BackgroundMusic;
