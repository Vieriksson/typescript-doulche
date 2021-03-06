/* Notera att jag aldrig jobbat på ett arbete där man kört node. 
Så det här är egenlärt och följer antagligen inte corporate-conventions. */

import express, { response } from 'express'
/* Installerar axios (finns andra, typ node-fetch osv) för att göra http request då det inbyggda i
node är otrevligt att använda */
import axios from 'axios'
import cors from 'cors'
import bodyParser from 'body-parser'
import { exampleMiddleware } from './middleware'

// Skapade en API-nyckel till ett random (nåja, gillar ju väder) gratis API
const API_KEY = '54b5e35678a9a41dc7565484b9bdd781'

// Skapar själva backend-servern
const app = express()

// 3 lax lokalt och plocka ut porten från environment variabler
// i containern eller var du nu sak köra tjänsten
const port = 3000 || process.env.PORT

// Bra middleware för att kunna ställa in så att cross-origin-anrop lirar. Tar emot settings om vilka domäner som får anropa osv.
app.use(cors())
// Middleware för att parsa ut request-bodies vid POSTs tex.
app.use(bodyParser.json())

/* Såhär kan man speca en middleware som körs på alla endpoints.
Kan vara sjyst för att kolla typ auth, så att ingen skurk utan
token kommer åt endpointsen. */
// Godkänd: curl -H "Authorization: JANNE" http://localhost:3000/weather/stockholm
// Denied: curl -H "Authorization: NOT_JANNE" http://localhost:3000/weather/stockholm

app.use((request, response, next) => {
  const token = request.headers['authorization']
  if (token && token !== 'JANNE') {
    return response.status(401).json({ error: 'Försök inte, skurk!' })
  }
  console.log(`Åh, vilken find token (${token})! Välkommen in!`)
  next() // Gå vidare med anropet
})

// Lyssna på get-anrop mot url:en
app.get('/weather/:city', async (request, response) => {
  const city = request.params.city // Här får du ut pathParams (localhost:3000/weather/stockholm)
  console.log(`City: ${city}`)

  const queryParams = request.query // Här får du ut queryParams (localhost:3000/weather/stockholm?skitland=tyskland)
  if (queryParams && queryParams['skitland']) console.log(`Skitland: ${queryParams['skitland']}`)

  if (!city) {
    return response.status(400).json({ err: 'Riktigt bad request. Speca en stad TACK' })
  }

  const weatherResponse = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
  )
  if (weatherResponse.status !== 200) {
    return response
      .status(weatherResponse.status)
      .json({ err: 'Could not fetch data from the weather api' })
  }
  return response.status(200).json(weatherResponse.data)
})

// Lyssna mot post-anrop mot url:en
// Tex: curl -d '{"a":"b"}' -H "Content-Type: application/json" -X POST http://localhost:3000/weather
app.post('/weather', (request, response) => {
  const body = request.body // Kommer som en trevlig json tack vare fina, fina body-parser
  // Skickar tillbaka det man skickade in bara
  return response.status(200).json(body)
})

app.get('/random', exampleMiddleware, (_, response) => {
  return response.send(
    'Exempel för att visa hur man kan lägga på en middleware som endast körs på en endpoint. Se exampleMiddleware.'
  )
})

// Börjar lyssna på anrop på porten
app.listen(port, () => console.log(`Server is listening on ${port}`))
