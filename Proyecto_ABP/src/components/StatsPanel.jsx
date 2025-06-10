function StatsPanel(props) {
    return (
        <div className="pt-5 text-sm">
            <p>Total de Productos: <span className="text-pink-800">{props.total}</span></p>
            <p>Total de Productos con stock &gt; 50: <span className="text-pink-800">{props.totalStockMayor50}</span></p>
            <p>Precio Promedio: <span className="text-pink-800">{props.promedioPrecio}</span></p>
            <p>Precio Maximo: <span className="text-pink-800">${props.max}</span></p>
            <p>Precio Mínimo: <span className="text-pink-800">${props.min}</span></p>
            <p>Promedio de rating general (categoría filtrada): <span className="text-pink-800">{props.promedioRating}</span></p>
            <p>Producto más caro:  <span className="text-pink-800">{props.maxName} (${props.max})</span></p>
            <p>Producto más Barato:  <span className="text-pink-800">{props.minName} (${props.min})</span></p>
            <p>Promedio de Descuento: <span className="text-pink-800">{props.promedioDescuento}%</span></p>
            <p>Producto con mejor valoración: <span className="text-pink-800">{props.maxRatingTitle} {props.maxRatingValue}%</span></p>
            <p>Cantidad de productos en la categoría: <span className="text-pink-800">{props.cantidadPorCategoria}</span></p>
            <p>Cantidad de productos con stock &gt; 50: <span className="text-pink-800">{props.cantidadStockMayor50}</span></p>
            <p>Cantidad de productos con rating &gt; 4.5: <span className="text-pink-800">{props.cantidadRatingMayor45}</span></p>
            {props.promedioPrecioCategoriaFiltrada && props.promedioPrecioCategoriaFiltrada !== "-" && (

            <p>Precio promedio de la categoría {" "}
            <span className="text-pink-800">${props.promedioPrecioCategoriaFiltrada}</span></p>)}

        </div>
    );
}

export default StatsPanel;