import React, {useState, useEffect} from "react"

export default function Scoreboard() {
    const [gameData, setGameData] = useState([])
    const [query, setQuery] = useState("")
    const [sport, setSport] = useState(0)
    const [searchSubmit, setSearchSubmit] = useState(false)

    useEffect(() => {
        fetch(`https://api.scorebooklive.com/v2/games?date=2023-01-15&primary=true&priority_order=true&status_id=1&sport_id=${sport}`)
        .then(res => {
            if(!res.ok) {
                throw Error("Something went wrong")
            }
            return res.json()
        })
        .then(data => setGameData(data.data))
        .catch(err => console.error(err))
    }, [sport])

    // console.log(gameData)

    function renderResults(data) {
        return data.map(matchup => {
            return (
                <div className="single-matchup">
                    {matchup.game_teams.map(team => {
                        return (
                            <div className="single-team">
                                <img src={team.team.image} />
                                <h2>{team.team.name}</h2>
                                <p>{team.team.state}</p>
                            </div>
                        )
                    })}
                </div>
                
            )   
        })
    }
    
    return (
        <div className="main-container">
            <div className="header">

            </div>

            <div className="filters">
                <select>
                    onChange={(e) => {
                        console.log(e.target.value)
                        setSearchSubmit(true)
                    }}
                    className="sport-filter"
                    aria-label="Filter results by sport"
                    <option value={1}>Basketball</option>
                    <option value={2}>Football</option>
                    <option value={3}>Baseball</option>
                    <option value="4">Softball</option>
                    <option value="5">Lacrosse</option>
                    <option value="6">Soccer</option>
                    <option value="7">Volleyball</option>
                    <option value="8">Field Hockey</option>
                    <option value="9">Ice Hockey</option>
                    <option value="10">Water Polo</option>
                    <option value="11">Cross Country</option>
                    <option value="12">Golf</option>
                    <option value="13">Tennis</option>
                </select>
            </div>

            <div className="scoreboard-container">
            <>{gameData.length > 0 ? renderResults(gameData) : null}</>
            </div>

            <div className="sidebar">

            </div>
        </div>
        
    )
}





// "Accept" :	"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
//             "Accept-Encoding" :	"gzip, deflate, br",
//             "Accept-Language" :	"en-US,en;q=0.5",
//             "Connection" :	"keep-alive",
//             "DNT" :	"1",
//             "Host" : "api.scorebooklive.com",
//             "If-None-Match" :'W/"b57c5cd64e085f2c465f56e251b93ec3"',
//             "Sec-Fetch-Dest" :	"document",
//             "Sec-Fetch-Mode" : 	"navigate",
//             "Sec-Fetch-Site" :	"none",
//             "Sec-Fetch-User" : 	"?1",
//             "Upgrade-Insecure-Requests" :	"1",
//             User-Agent	Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:108.0) Gecko/20100101 Firefox/108.0