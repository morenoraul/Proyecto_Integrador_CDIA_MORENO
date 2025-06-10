function StatsPanel(props) {
    return (
        <div className="pt-5 text-sm">
            <p>Precio Total: <span className="text-pink-800">{props.totalPrice}</span></p>
            <p>Producto más caro:  <span className="text-pink-800">{props.maxName} (${props.max})</span></p>
            <p>Producto más Barato:  <span className="text-pink-800">{props.minName} (${props.min})</span></p>
            <p>Producto Título mayor a 20 caracteres: <span className="text-pink-800">{props.mayor20}</span></p>
            <p>Promedio de Descuento: <span className="text-pink-800">{props.promedioDescuento}%</span></p>
            <p>Producto con mejor valoración: <span className="text-pink-800">{props.maxRatingTitle} {props.maxRatingValue}%</span></p>
        </div>
    );
}

export default StatsPanel;