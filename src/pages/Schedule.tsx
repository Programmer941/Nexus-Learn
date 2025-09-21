import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin, Users, Calendar } from "lucide-react";

const schedule = [
  {
    period: "1st Period",
    time: "8:00 - 8:50 AM",
    class: "AP Computer Science A",
    room: "Room 204",
    teacher: "Ms. Sarah Chen",
    color: "bg-primary"
  },
  {
    period: "2nd Period", 
    time: "9:00 - 9:50 AM",
    class: "AP Calculus BC",
    room: "Room 156",
    teacher: "Mr. Michael Rodriguez",
    color: "bg-accent"
  },
  {
    period: "3rd Period",
    time: "10:00 - 10:50 AM",
    class: "Study Hall",
    room: "Library",
    teacher: "Ms. Johnson",
    color: "bg-muted"
  },
  {
    period: "4th Period",
    time: "11:00 - 11:50 AM",
    class: "AP English Literature",
    room: "Room 108",
    teacher: "Ms. Jennifer Walsh",
    color: "bg-secondary"
  },
  {
    period: "Lunch",
    time: "12:00 - 12:30 PM",
    class: "Lunch Break",
    room: "Cafeteria",
    teacher: "",
    color: "bg-chart-1"
  },
  {
    period: "5th Period",
    time: "12:40 - 1:30 PM",
    class: "AP Physics C",
    room: "Room 301",
    teacher: "Mr. Robert Kim",
    color: "bg-chart-2"
  },
  {
    period: "6th Period",
    time: "1:40 - 2:30 PM",
    class: "AP World History",
    room: "Room 112",
    teacher: "Ms. Lisa Anderson",
    color: "bg-chart-3"
  },
  {
    period: "7th Period",
    time: "2:40 - 3:30 PM",
    class: "AP Biology",
    room: "Room 220",
    teacher: "Dr. Maria Santos",
    color: "bg-chart-4"
  }
];

const upcomingEvents = [
  {
    date: "Today",
    events: [
      { time: "10:30 AM", title: "Physics Lab Makeup", location: "Lab 301A" },
      { time: "3:45 PM", title: "CS Club Meeting", location: "Room 204" }
    ]
  },
  {
    date: "Tomorrow",
    events: [
      { time: "8:00 AM", title: "Calculus Tutorial", location: "Math Help Center" },
      { time: "12:15 PM", title: "Student Council", location: "Conference Room" }
    ]
  }
];

export default function Schedule() {
  return (
    <div className="p-6 space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground font-serif">Schedule</h1>
        <p className="text-muted-foreground">Your daily class schedule and upcoming events</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Schedule */}
        <div className="lg:col-span-2">
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">Today's Schedule</CardTitle>
              <CardDescription>Tuesday, December 12, 2024</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {schedule.map((period, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${period.color}`}></div>
                        <div>
                          <h3 className="font-medium">{period.class}</h3>
                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            <div className="flex items-center space-x-1">
                              <Clock className="h-3 w-3" />
                              <span>{period.time}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <MapPin className="h-3 w-3" />
                              <span>{period.room}</span>
                            </div>
                            {period.teacher && (
                              <div className="flex items-center space-x-1">
                                <Users className="h-3 w-3" />
                                <span>{period.teacher}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {period.period}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events */}
        <div>
          <Card className="shadow-elevated">
            <CardHeader>
              <CardTitle className="font-serif">Upcoming Events</CardTitle>
              <CardDescription>Extra activities and meetings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((day, dayIndex) => (
                <div key={dayIndex} className="space-y-2">
                  <h4 className="font-medium text-sm flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{day.date}</span>
                  </h4>
                  {day.events.map((event, eventIndex) => (
                    <div key={eventIndex} className="ml-6 p-3 bg-muted/30 rounded-md">
                      <div className="flex items-center space-x-2 text-sm">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="font-medium">{event.time}</span>
                      </div>
                      <p className="text-sm font-medium mt-1">{event.title}</p>
                      <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}