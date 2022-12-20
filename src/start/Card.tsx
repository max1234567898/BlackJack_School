import './Cards.css';

type CardProps = {value?: string, symbol?: string}

export const Card = ({value, symbol = ""}: CardProps) => {
    let entity;
    symbol === "Diamonds" ? (entity = "&diams;") : (entity = "&" + symbol.toLowerCase() + ";")
    return <div className={`card ${symbol.toLowerCase()}`}>
        <span className="card-value-suit top">{value} <span dangerouslySetInnerHTML={{__html: entity}}/></span>
        <span className="card-suit"><span dangerouslySetInnerHTML={{__html: entity}}/></span>
        <span className="card-value-suit bot">{value} <span dangerouslySetInnerHTML={{__html: entity}}/></span>
        </div> 
   };