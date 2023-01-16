import React, {useState, useEffect} from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import logo from "../images/default-logo.png"

export default function Scoreboard() {
    const [gameData, setGameData] = useState([])
    // const [query, setQuery] = useState("")
    const [startDate, setStartDate] = useState(new Date());
    const [filterOptions, setFilterOptions] = useState(
        {sport: 0, gender: ""}
    )
    // const [searchSubmit, setSearchSubmit] = useState(false)

    useEffect(() => {
        const date = formatDate(startDate)
        
        const {sport, gender} = filterOptions
        fetch(`https://api.scorebooklive.com/v2/games?date=${date}&primary=true&priority_order=true&sport_id=${sport}&gender_id=${gender}`)
        .then(res => {
            if(!res.ok) {
                throw Error("Something went wrong")
            }
            return res.json()
        })
        .then(data => setGameData(data.data))
        .catch(err => console.error(err))
    }, [filterOptions, startDate])


    function renderResults(data) {
        return data.map(matchup => {
            return (
                <div className="single-matchup">
                    <div className="game-status">
                    </div>
                    {matchup.game_teams.map(team => {
                        return (
                            <>
                                <div className="single-team">
                                    <img src={team.team.image ? team.team.image : logo} className="team-logo"/>
                                    <a className="team-name" href={team.team.link.webapp} target="_blank">{team.team.name}</a>
                                    <p className="team-state">{team.team.state}</p>
                                    <p className="team-score">{team.score}</p>
                                </div>
                            </>
                        )
                    })}
                </div>
                
            )   
        })
    }

    function handleChange(event) {
        setFilterOptions(prevFilterOptions => {
            return {
                ...prevFilterOptions,
                [event.target.name]: event.target.value
            }
        })
        
    }

    function formatDate(date){
        const month = date.getUTCMonth() + 1; //months from 1-12
        const day = date.getDate();
        const year = date.getUTCFullYear();

        const newdate = year + "-" + month + "-" + day;
        return newdate;
    }
    
    return (
        <div className="main-container">
            <div className="header">

            </div>

            <div className="filters">
                <div className="date-picker">
                    <DatePicker className="date-inner" selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <form>
                    <select
                        id="sport"
                        value={filterOptions.sport}
                        onChange={handleChange}
                        className="sport-filter"
                        name="sport"
                        aria-label="Filter results by sport"
                    >
                        <option value={0}>--Select a Sport--</option>
                        <option value={1}>Basketball</option>
                        <option value={2}>Football</option>
                        <option value={3}>Baseball</option>
                        <option value={4}>Softball</option>
                        <option value={5}>Lacrosse</option>
                        <option value={6}>Soccer</option>
                        <option value={7}>Volleyball</option>
                        <option value={8}>Field Hockey</option>
                        <option value={9}>Ice Hockey</option>
                        <option value={10}>Water Polo</option>
                        <option value={11}>Cross Country</option>
                        <option value={12}>Golf</option>
                        <option value={13}>Tennis</option>
                    </select>
                    <select
                        id="gender"
                        value={filterOptions.gender}
                        onChange={handleChange}
                        className="gender-filter"
                        name="gender"
                        aria-label="Filter results by gender"
                    >
                        <option value={0}>--Select Gender--</option>
                        <option value={1}>Male</option>
                        <option value={2}>Female</option>
                        <option value={3}>Co-ed</option>
                    </select>
                </form>
            </div>

            <div className="scoreboard-container">
            <>{gameData.length > 0 ? renderResults(gameData) : "No Games Scheduled for Today"}</>
            </div>

            <div className="sidebar">

            </div>
        </div>
        
    )
}
