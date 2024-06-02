import moment from "moment-timezone";
import React, { useEffect, useState } from "react";
import schedule from "./schedule.json";
import TwitchPlayer from "./TwitchPlayer";
import ScrollUpButton from "./ScrollUpButton";

function App() {
  const ORIGIN_TIMEZONE = "America/Los_Angeles";
  const [timezone, setTimezone] = useState(ORIGIN_TIMEZONE);

  useEffect(() => {
    // get correct timezone
    const browserTimezone = moment.tz.guess();
    setTimezone(browserTimezone);
  }, []);

  const uniqueDays = [
    ...new Set(
      schedule.map((event) =>
        moment
          .tz(`${event.Date}T${event.Time}`, ORIGIN_TIMEZONE)
          .tz(timezone)
          .format("YYYY-MM-DD")
      )
    ),
  ];

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="App">
      <header>
        <div className="flex flex-row bg-gray-900 items-center top-0 left-0 right-0 fixed z-10 justify-center lg:justify-normal">
          <div className="w-1/12 hidden lg:block"></div>
          <a href="/">
            <img src="logo.svg" alt="Logo" className="w-24" />
          </a>
          {uniqueDays.map((day, index) => (
            <div
              key={index}
              className="text-white px-4 py-2 m-2 rounded hover:bg-gray-800 hover:cursor-pointer text-center hidden lg:block"
              onClick={() => scrollToSection(day)}
            >
              <p>{moment(day).format("dddd")}</p>
              <p>{moment(day).format("Do MMM")}</p>
            </div>
          ))}
        </div>
      </header>

      {/* Background Video */}
      <video
        src="hero-video.mp4"
        loop
        autoPlay
        muted
        className="object-cover h-screen w-screen -z-10 fixed top-0 bottom-0"
      />

      <main>
        <div className="flex flex-row my-32">
          <div className="w-1/12 hidden lg:block"></div>
          <div className="flex flex-col gap-y-5 mx-5 lg:mr-20 text-white">
            {schedule.map((event, index) => {
              const eventTime = moment
                .tz(`${event.Date}T${event.Time}`, ORIGIN_TIMEZONE)
                .tz(timezone);
              const eventDay = eventTime.format("YYYY-MM-DD");
              const previousEventDay =
                index > 0
                  ? moment
                      .tz(
                        `${schedule[index - 1].Date}T${
                          schedule[index - 1].Time
                        }`,
                        ORIGIN_TIMEZONE
                      )
                      .tz(timezone)
                      .format("YYYY-MM-DD")
                  : null;
              const isNewDay = eventDay !== previousEventDay;

              return (
                <div key={index}>
                  {isNewDay && (
                    <div
                      className="text-xl font-bold text-cyan-900 my-4 pt-24 -mt-24"
                      id={eventDay}
                    >
                      {eventTime.format("dddd, MMMM Do YYYY")}
                    </div>
                  )}
                  <div
                    className={`flex flex-row rounded opacity-90 gap-x-5 py-3 pr-5 items-center max-w-2xl ${
                      index % 2 === 0 ? "bg-cyan-800" : "bg-cyan-900"
                    }`}
                  >
                    <div className="w-36 text-center font-bold">
                      {`${eventTime.format("HH:mm")} ${moment()
                        .tz(timezone)
                        .format("z")}`}
                    </div>
                    <div>
                      <div className="font-bold text-amber-300">
                        {event.Event}
                      </div>
                      {event.Category !== "" && <div>{event.Category}</div>}
                      {Array.isArray(event.Runners) && event.Runners.length > 0
                        ? event.Runners.map((runner, i) =>
                            i === 0
                              ? `Runners: ${runner}`
                              : i < event.Runners.length
                              ? `, ${runner}`
                              : runner
                          )
                        : event.Runners.length > 0 && (
                            <div>Runners: {event.Runners && event.Runners}</div>
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

          <TwitchPlayer
            channel="MogulMoves"
            className="fixed right-10 hidden 2xl:block"
          />

          <ScrollUpButton
            className={
              "fixed bottom-10 right-10 bg-cyan-900 text-white p-4 rounded-full shadow-lg hover:bg-cyan-800 transition duration-300 w-16 h-16 z-10 hidden md:block"
            }
          />
        </div>
      </main>
    </div>
  );
}

export default App;
