import './Cards.css';

export const Card = ({value, symbol} : { value: string; symbol: string }) => {
    let entity;
    symbol === "Diamonds" ? (entity = "&diams;") : (entity = "&" + symbol.toLowerCase() + ";")
    return <div className={`card ${symbol.toLowerCase()}`}>
        <span className="card-value-suit top">{value} <span dangerouslySetInnerHTML={{__html: entity}}/></span>
        <span className="card-suit"><span dangerouslySetInnerHTML={{__html: entity}}/></span>
        <span className="card-value-suit bot">{value} <span dangerouslySetInnerHTML={{__html: entity}}/></span>
        </div> 
   };