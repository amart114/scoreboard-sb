import React, {useState, useEffect} from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import Matchup from "../components/Matchup"

export default function Scoreboard() {
    const [gameData, setGameData] = useState([])
    const [startDate, setStartDate] = useState(new Date())
    const [filterOptions, setFilterOptions] = useState(
        {sport: 0, state: "", gender: "", status: ""}
    )
    const [page, setPage] = useState(1)

    useEffect(() => {
        const date = formatDate(startDate)
        const {sport, state, gender, status} = filterOptions
        fetch(`https://api.scorebooklive.com/v2/games?date=${date}&primary=true&priority_order=true&sport_id=${sport}&state=${state}&gender_id=${gender}&status_id=${status}&page=${page}`)
        .then(res => {
            if(!res.ok) {
                throw Error("Something went wrong")
            }
            return res.json()
        })
        .then(data => {
            if (page > 1) {
                setGameData(prevGameData => ([...prevGameData, ...data.data]))
                } else {
                setGameData(data.data)
            }
        })
        .catch(err => console.error(err))
    }, [filterOptions, startDate, page])

    const onScroll = () => {
        const scrollTop = document.documentElement.scrollTop
        const scrollHeight = document.documentElement.scrollHeight
        const clientHeight = document.documentElement.clientHeight
    
        if (scrollTop + clientHeight >= scrollHeight) {
            setPage(page + 1)
        }
    }

    useEffect(() => {
            window.addEventListener('scroll', onScroll)
            return () => window.removeEventListener('scroll', onScroll)
    }, [page])


    function renderResults(data) {
        return data.map(matchup => {
            const matchupDetails = `https://scorebooklive.com/games/${matchup.slug}`
            return (
                <a href={matchupDetails} target="_blank" className="game-details-link">
                    <Matchup 
                        key={matchup.id}
                        matchup={matchup}
                    />
                </a>
            )   
        })
    }

    function handleChange(event) {
        setFilterOptions(prevFilterOptions => {
            setPage(1)
            return {
                ...prevFilterOptions,
                [event.target.name]: event.target.value
            }
        })
        
    }

    function formatDate(date){
        // setPage(1)
        const month = date.getUTCMonth() + 1; //months from 1-12
        const day = date.getDate();
        const year = date.getUTCFullYear();

        const newdate = year + "-" + month + "-" + day;
        return newdate;
    }
    
    return (
        <div className="main-container">
            <div className="header"></div>

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
                        id="state"
                        value={filterOptions.state}
                        onChange={handleChange}
                        className="state-filter"
                        name="state"
                        aria-label="Filter results by state"
                    >
                        <option value="">--Select State--</option>
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
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

                    <select
                        id="status"
                        value={filterOptions.status}
                        onChange={handleChange}
                        className="status-filter"
                        name="status"
                        aria-label="Filter results by status"
                    >
                        <option value="">--Game Status--</option>
                        <option value={1}>Upcoming</option>
                        <option value={2}>Live</option>
                        <option value={3}>Final</option>
                    </select>
                </form>
            </div>

            <div className="scoreboard-container">
                <>
                    {gameData.length > 0 ? renderResults(gameData) : <p className="no-games-text">No Games Scheduled</p>}
                </>
            </div>
        </div>
        
    )
}
