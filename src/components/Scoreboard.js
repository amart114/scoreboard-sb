import React, {useState, useEffect} from "react"

export default function Scoreboard() {

    useEffect(() => {
        fetch("https://api.scorebooklive.com/v2/games?date=2022-05-12&primary=true&priority_order=true&status_id=1", {method: 'GET'})
        .then(res => {
            if(!res.ok) {
                throw Error("Something went wrong")
            }
            return res.json()
        })
        .then(data => console.log(data))
        .catch(err => console.error(err))
    })
    return (
        <>
            <h1>Hello</h1>
        </>
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