import React from "react"
import logo from "../images/default-logo.png"

export default function Team({teams}) {
    const {team, score} = teams
    return (      
        <>
            <div className="single-team">
            <img src={team.image ? team.image : logo} className="team-logo"/>
                <a className="team-name" href={team.link.webapp} target="_blank" rel="noopener noreferrer">
                    {team.name} 
                </a>
                <p className="team-state">{team.state}</p>
                <p className="team-score">{score}</p>
            </div>
        </>
    )
}