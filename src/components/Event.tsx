import {Loading} from "@/components";
import {Seat} from "@/components/Seat";
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
  const [event, setEvent] = useState<EventResponse | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch("https://nfctron-frontend-seating-case-study-2024.vercel.app/event");
        if (!response.ok) throw new Error("Failed to fetch event");

        const data = await response.json();
        setEvent({
          ...data,
          dateFrom: new Date(data.dateFrom),
          dateTo: new Date(data.dateTo),
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchEvent();
  }, []);

  if (!event) {
    return <Loading/>;
  }

  return (
      <main className="grow flex flex-col justify-center">
        {/* inner content */}
        <div className="max-w-screen-lg m-auto p-4 flex items-start grow gap-3 w-full">
          {/* seating card */}
          <div className="bg-white rounded-md grow grid p-3 self-stretch shadow-sm" style={{
            gridTemplateColumns: 'repeat(auto-fill, minmax(40px, 1fr))',
            gridAutoRows: '40px'
          }}>
            {/*	seating map */}
            {
              Array.from({length: 100}, (_, i) => (
                <Seat key={i}/>
              ))
            }
          </div>

          {/* event info */}
          <aside className="w-full max-w-sm bg-white rounded-md shadow-sm p-3 flex flex-col gap-2">
            {/* event header image placeholder */}
            <Avatar>
              <AvatarImage className={'aspect-auto'} src={event.headerImageUrl} />
              <AvatarFallback asChild>
                <div className="bg-zinc-100 rounded-md h-32"/>
              </AvatarFallback>
            </Avatar>
            {/* event name */}
            <h1 className="text-xl text-zinc-900 font-semibold">{event.namePub}</h1>
            {/* event description */}
            <p className="text-sm text-zinc-500">
              {event.description}
            </p>
            <dl>
              <dt className="text-xs text-zinc-500">Place</dt>
              <dd className="text-sm text-zinc-900">
                <address>{event.place}</address>
              </dd>
              <dt className="text-xs text-zinc-500">Start</dt>
              <dd className="text-sm text-zinc-900">
                <time dateTime={event.dateFrom.toISOString()}>
                  {event.dateFrom.toLocaleString("cs-CZ", DATE_OPTIONS)}
                </time>
              </dd>
              <dt className="text-xs text-zinc-500">End</dt>
              <dd className="text-sm text-zinc-900">
                <time dateTime={event.dateFrom.toISOString()}>
                  {event.dateTo.toLocaleString("cs-CZ", DATE_OPTIONS)}
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