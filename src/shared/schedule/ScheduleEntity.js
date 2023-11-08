export class Schedule{
  constructor(weekType, days){
    this.weekType = weekType;
    this.days = days.map((day) => new ScheduleDay(day));
  }
}

export class ScheduleDay{
  constructor(dayName, classEntries){
    this.dayName = dayName;
    this.classEntries = classEntries.map((entry) => new ScheduleEntry(entry));
  }
}

export class ScheduleEntry{
  constructor(className, startTime, endTime, classType, url){
    this.className = className;
    this.startTime = startTime;
    this.endTime = endTime;
    this.classType = classType;
    this.url = url;
  }
}

export const defaultData = [
  {
    "weekType": "WEEK_A",
    "days": [
    {
      "dayName": "Monday",
      "classEntries": [
        {
          "className": "Math",
          "startTime": "09:00",
          "endTime": "10:30",
          "classType": "LECTURE",
          "url": "https://example.com/math"
        },
        {
          "className": "History",
          "startTime": "11:00",
          "endTime": "12:30",
          "classType": "LECTURE",
          "url": "https://example.com/history"
        }
      ]
    },
    {
      "dayName": "Tuesday",
      "classEntries": [
        {
          "className": "Physics",
          "startTime": "09:00",
          "endTime": "10:30",
          "classType": "LAB",
          "url": "https://example.com/physics"
        }
      ]
    },
    {
      "dayName": "Wednesday",
      "classEntries": [
        {
          "className": "Physics",
          "startTime": "09:00",
          "endTime": "10:30",
          "classType": "LAB",
          "url": "https://example.com/physics"
        },
        {
          "className": "Physics",
          "startTime": "09:00",
          "endTime": "10:30",
          "classType": "LAB",
          "url": "https://example.com/physics"
        },
        {
          "className": "Physics",
          "startTime": "09:00",
          "endTime": "10:30",
          "classType": "LAB",
          "url": "https://example.com/physics"
        },
        {
          "className": "Physics",
          "startTime": "09:00",
          "endTime": "10:30",
          "classType": "LAB",
          "url": "https://example.com/physics"
        }
      ]
    },
    {
      "dayName": "Thursday",
      "classEntries": [
        {
          "className": "Physics",
          "startTime": "09:00",
          "endTime": "10:30",
          "classType": "LAB",
          "url": "https://example.com/physics"
        }
      ]
    },
    {
      "dayName": "Friday",
      "classEntries": [
        {
          "className": "Physics",
          "startTime": "09:00",
          "endTime": "10:30",
          "classType": "LAB",
          "url": "https://example.com/physics"
        },
        {
          "className": "Physics",
          "startTime": "09:00",
          "endTime": "10:30",
          "classType": "LAB",
          "url": "https://example.com/physics"
        },{
          "className": "Physics",
          "startTime": "09:00",
          "endTime": "10:30",
          "classType": "LAB",
          "url": "https://example.com/physics"
        }
      ]
    }
  ]
},
{
  "weekType": "WEEK_B",
  "days": [
  {
    "dayName": "Monday",
    "classEntries": [
      {
        "className": "Math",
        "startTime": "09:00",
        "endTime": "10:30",
        "classType": "LECTURE",
        "url": "https://example.com/math"
      },
      {
        "className": "History",
        "startTime": "11:00",
        "endTime": "12:30",
        "classType": "LECTURE",
        "url": "https://example.com/history"
      }
    ]
  },
  {
    "dayName": "Tuesday",
    "classEntries": [
      {
        "className": "Physics",
        "startTime": "09:00",
        "endTime": "10:30",
        "classType": "LAB",
        "url": "https://example.com/physics"
      }
    ]
  },
  {
    "dayName": "Wednesday",
    "classEntries": [
      {
        "className": "Physics",
        "startTime": "09:00",
        "endTime": "10:30",
        "classType": "LAB",
        "url": "https://example.com/physics"
      },
      {
        "className": "Physics",
        "startTime": "09:00",
        "endTime": "10:30",
        "classType": "LAB",
        "url": "https://example.com/physics"
      },
      {
        "className": "Physics",
        "startTime": "09:00",
        "endTime": "10:30",
        "classType": "LAB",
        "url": "https://example.com/physics"
      },
      {
        "className": "Physics",
        "startTime": "09:00",
        "endTime": "10:30",
        "classType": "LAB",
        "url": "https://example.com/physics"
      }
    ]
  },
  {
    "dayName": "Thursday",
    "classEntries": [
      {
        "className": "Physics",
        "startTime": "09:00",
        "endTime": "10:30",
        "classType": "LAB",
        "url": "https://example.com/physics"
      }
    ]
  },
  {
    "dayName": "Friday",
    "classEntries": [
      {
        "className": "Physics",
        "startTime": "09:00",
        "endTime": "10:30",
        "classType": "LAB",
        "url": "https://example.com/physics"
      },
      {
        "className": "Physics",
        "startTime": "09:00",
        "endTime": "10:30",
        "classType": "LAB",
        "url": "https://example.com/physics"
      },{
        "className": "Physics",
        "startTime": "09:00",
        "endTime": "10:30",
        "classType": "LAB",
        "url": "https://example.com/physics"
      }
    ]
  }
]
},
]