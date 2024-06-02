import moment from "moment-timezone";
import schedule from "./schedule.json";

const EventList = ({ timezone }) => {
  return (
    <div className="flex flex-col gap-y-5 mr-20 text-white">
      {schedule.map((event, index) => {
        const eventDay = moment.tz(event.Date, timezone).format("YYYY-MM-DD");
        const previousEventDay =
          index > 0
            ? moment.tz(schedule[index - 1].Date, timezone).format("YYYY-MM-DD")
            : null;
        const isNewDay = eventDay !== previousEventDay;

        return (
          <div key={index}>
            {isNewDay && (
              <div
                className="text-xl font-bold text-cyan-900 mb-4 pt-24 -mt-24"
                id={moment.tz(`${event.Date}`, timezone).format("YYYY-MM-DD")}
              >
                {moment.tz(event.Date, timezone).format("dddd, MMMM Do YYYY")}
              </div>
            )}
            <div
              className={`flex flex-row rounded opacity-90 gap-x-5 py-3 pr-5 items-center max-w-2xl ${
                index % 2 === 0 ? "bg-cyan-800" : "bg-cyan-900"
              }`}
            >
              <div className="w-32 text-center font-bold">
                {moment
                  .tz(`${event.Date}T${event.Time}`, timezone)

                  .format("HH:mm")}
              </div>
              <div>
                <div className="font-bold text-amber-300">{event.Event}</div>
                {event.Category !== "" && <div>Category: {event.Category}</div>}
                {event.Runners.length > 0 && (
                  <div>Runners: {event.Runners}</div>
                )}
                {event.Casters.length > 0 && (
                  <div>Casters: {event.Casters}</div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EventList;
