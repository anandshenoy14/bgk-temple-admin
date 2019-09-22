import React from 'react';
import MemberCard from './MemberCard'
const MemberCards = (props) => {
    const rows = props.records;
    const cards = rows.map(row => {
        let card = {};
        card["name"] = `${row["First_Name"]} ${row["Surname"]}`
        card["city"] = `${row["City"]}`
        return card
    })
    return (
        <div className="cardsContainer">
            {cards.map(card=>{
                    return (<div className="card"><MemberCard card={card}></MemberCard></div>)
                    })
            }
        </div>
    );
}

export default MemberCards;

