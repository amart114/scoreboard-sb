import React from "react"
import Team from "../components/Team"

export default function Matchup({matchup}) {
    return (
        <div className="single-matchup">
            {matchup.game_teams.map(teams => {
                return (
                    <Team 
                        key={teams.id}
                        teams={teams}
                    />
                )
            })}
        </div>
    )
}