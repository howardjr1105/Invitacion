import React from "react";

const Map = () => {
  return (
    <div className="Map">
      <div className="info">
        <h4>
          <span className="resaltar">Fecha:</span> 28 de Junio 2025
        </h4>
        <h4>
          <span className="resaltar">Hora:</span> 6:00 PM
        </h4>
        <h4>
          <span className="resaltar">Recepción:</span> Hassan Restaurant VIP
        </h4>
      </div>
      <div className="map-info">
        <iframe
          className="map-iframe"
          title="Mapa"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.0092192348443!2d-85.51691452642179!3d12.382314427526941!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8f73735c234fea1d%3A0xe34ba8662cdacadb!2sHassan%20Restaurante!5e0!3m2!1ses!2sni!4v1748481836598!5m2!1ses!2sni"
          width="80%"
          height="300"
        ></iframe>
      </div>
    </div>
  );
};

export default Map;
