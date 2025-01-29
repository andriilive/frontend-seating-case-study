import {Error} from "@/components";
import {Seat} from "@/components/Seat";
import {useEffect, useState} from "react";

type EventTicketsResponse = {
  "ticketTypes": TicketType[],
  "seatRows": {
    "seatRow": string,
    "seats": Ticket[]
  }[]
}

export type TicketType = {
  "id": string,
  "name": string,
  "price": number,
}

export type Ticket = {
  "seatId": string,
  "place": number,
  "ticketTypeId": string
}

export const Seating = ({eventId}:{ eventId: string }) => {
  const [state,setState] = useState<{
    loading: boolean,
    error: string | null,
    seatingMap: EventTicketsResponse | null
  }>({
    loading: true,
    error: null,
    seatingMap: null
  })

  useEffect(() => {
    fetch(`https://nfctron-frontend-seating-case-study-2024.vercel.app/event-tickets?eventId=${eventId}`)
    .then<EventTicketsResponse>(response => response.json())
    .then(tickets => {
      console.log('tickets', tickets)
      setState({
        loading: false,
        error: null,
        seatingMap: tickets
      })
    })
    .catch(error => setState({
      loading: false,
      error: error.message,
      seatingMap: null
    }))

  }, [eventId])

  if (state.error) {
    return (
      <Error error={state.error}/>
    );
  }

  if (!state.seatingMap) {
    return (
      <div>
        Loading seating map
      </div>
    );
  }

  const {seatRows} = state.seatingMap
  const rowsCount = seatRows.length
  const rowsLength = seatRows.map(row => row.seats.length)
  const maxRowLength = Math.max(...rowsLength)

  console.log('rowsLength', rowsLength)
  console.log('rowsCount', rowsCount)

  return (
    <>
      <div className="bg-white rounded-md grow flex-col flex p-3 self-stretch shadow-sm">
        {/*	seating map */}
        {
          Array.from({length: seatRows.length}, (_, rowIndex) => {
            rowIndex += 1
            return (
              <span key={'row-' + rowIndex}>
            <span className={'text-black'}>
              {rowIndex} <small>Row:</small>
            </span>
              <span>
              {
                Array.from({length: maxRowLength}, (_, placeNumber) => {
                  placeNumber += 1
                  const ticketData = seatRows[rowIndex - 1].seats.find(seat => seat.place === placeNumber)
                  return (
                    <Seat ticketData={ticketData} key={`${rowIndex}-${placeNumber}`} seatRow={rowIndex} place={placeNumber}/>
                  )
                })
              }
              </span>
            </span>
            )
          })
        }
      </div>
    </>
  );
}