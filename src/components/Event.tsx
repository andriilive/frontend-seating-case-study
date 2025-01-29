import {Error, Loading} from "@/components";
import {Seating} from "@/components/Seating";
import {AvatarImage} from "@/components/ui/avatar";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarFallback} from "@radix-ui/react-avatar";
import {useEffect, useState} from "react";


type EventResponse = {
  eventId: string,
  namePub: string,
  description: string,
  currencyIso: string,
  dateFrom: Date,
  dateTo: Date,
  headerImageUrl: string,
  place: string
}

const DATE_OPTIONS : Intl.DateTimeFormatOptions = {year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit"}

export const Event = () => {

  const [
    state,
    setState
  ] = useState<{
    loading: boolean,
    error: string | null,
    event: EventResponse | null
  }>({
    loading: true,
    error: null,
    event: null
  })

  useEffect(() => {
    fetch("https://nfctron-frontend-seating-case-study-2024.vercel.app/event")
      .then<EventResponse>(response => response.json())
      .then(response => {
        setState({
          loading: false,
          error: null,
          event: {
            ...response,
            dateFrom: new Date(response.dateFrom),
            dateTo: new Date(response.dateTo)
          },
        })
      }).catch(error => setState({
        loading: false,
        error: error.message,
        event: null
    }))
  }, []);

  if (state.error) {
    return (
      <Error error={state.error}/>
    );
  }

  if (!state.event) {
    return <Loading/>;
  }

  return (
      <main className="grow flex flex-col justify-center">
        {/* inner content */}
        <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
          {/* seating card */}
          <Seating eventId={state.event.eventId} />


          {/* event info */}
          <aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">
            {/* event header image placeholder */}
            <Avatar>
              <AvatarImage className={'aspect-auto'} src={state.event.headerImageUrl} />
              <AvatarFallback asChild>
                <div className="bg-zinc-100 rounded-md h-32"/>
              </AvatarFallback>
            </Avatar>
            {/* event name */}
            <h1 className="text-xl text-zinc-900 font-semibold">{state.event.namePub}</h1>
            {/* event description */}
            <p className="text-sm text-zinc-500">
              {state.event.description}
            </p>
            <dl>
              <dt className="text-xs text-zinc-500">Place</dt>
              <dd className="text-sm text-zinc-900">
                <address>{state.event.place}</address>
              </dd>
              <dt className="text-xs text-zinc-500">Start</dt>
              <dd className="text-sm text-zinc-900">
                <time dateTime={state.event.dateFrom.toISOString()}>
                  {state.event.dateFrom.toLocaleString("cs-CZ", DATE_OPTIONS)}
                </time>
              </dd>
              <dt className="text-xs text-zinc-500">End</dt>
              <dd className="text-sm text-zinc-900">
                <time dateTime={state.event.dateFrom.toISOString()}>
                  {state.event.dateTo.toLocaleString("cs-CZ", DATE_OPTIONS)}
                </time>
              </dd>
            </dl>

            {/* add to calendar button */}
            <Button variant="secondary" disabled>
              Add to calendar
            </Button>
          </aside>
        </div>
      </main>
  );
}