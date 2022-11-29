import '../Cards.css';

export const Card = ({value, symbol}) => {
    let entity;
    entity = "&" + symbol.toLowerCase() + ";"
    return <div>
        <span className="card-value-suit top">{value} <span dangerouslySetInnerHTML={{__html: entity}}/></span>
        <span className="card-suit"><span dangerouslySetInnerHTML={{__html: entity}}/></span>
        <span className="card-value-suit bot">{value} <span dangerouslySetInnerHTML={{__html: entity}}/></span>;
        </div> 
   };