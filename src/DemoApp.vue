<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
//import { INITIAL_EVENTS, createEventId } from './event-utils'

import NotesModal from './components/NotesModal.vue'
import Sidebar from './components/Sidebar.vue'
let main;
let idNum = 1;
var clickData;
export default {

  components: {
    FullCalendar,       // make the <FullCalendar> tag available, calendar component
    NotesModal,         // Pop up notes modal, fades calendar and sidebar
    Sidebar,            // Show sidebar to the left of the calendar page
  },

  data: function() {
    return {
      isModalVisible: false,    // is the modal for taking notes visible, no
      calendarOptions: {
        plugins: [
          dayGridPlugin,
          timeGridPlugin,
          interactionPlugin, // needed for dateClick
          listPlugin
        ],
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth, timeGridWeek, timeGridDay, listWeek'
        },
        initialView: 'dayGridMonth',
        //initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
        events: this.getEvents,
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        weekends: true,
        select: this.handleDateSelect,
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        /* you can update a remote database when these fire: */
        eventAdd: this.addEventToDB,
        eventChange: this.updateEventToDB,
        
        //eventRemove: 
      },
      currentEvents: [],
    }
  },

  methods: {
    handleWeekendsToggle() {
      this.calendarOptions.weekends = !this.calendarOptions.weekends // update a property
    },

    handleDateSelect(selectInfo) {
      let title = 'Event Title'; //add input from modal component for title
      let text = 'french fires';// take text from NotesModal
      let calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      if (title) {
        calendarApi.addEvent({
          id: idNum++,
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
          text
        })
      }
    },

    // If user presses an event, call show modal function.
    handleEventClick(selectInfo) {
      this.showModal();
      clickData = selectInfo;   // save event object, in case I have to delete it
    },

    // function to call when delete button is pressed
     handleDeleteButton() {
      var clickInfo = clickData;    // retrieve event object, so I can delete it
      if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
        clickInfo.event.remove()
        this.closeModal();
      }
      this.deleteEventFromDB(clickInfo.event.id);
      idNum--;
    },

    // bug where it deletes based on event.id not id
    async deleteEventFromDB(id){
      const res = await fetch(`http://localhost:5000/events/${id}`, {
        method: 'DELETE'
      })

      res.status === 200 ? 
      (this.events = this.events.filter((event) => event.id !== id)) :
      alert('Error deleting event')
    },

    handleEvents(events) {
    this.currentEvents = events
    },

    async addEventToDB(event) {
      const res = await fetch('http://localhost:5000/events',{
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(event)
      })
      const data = await res.json()
      this.events = [...this.events, data]
    },

    async updateEventToDB(clickInfo){
       const res = await fetch(`http://localhost:5000/events/${clickInfo.event.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(clickInfo)
      })
      const data = await res.json()
      this.events = [...this.events, data]
    },

    // make modal visible
    showModal() {
      this.isModalVisible = true;
    },

    // close modal for taking notes
    closeModal() {
      this.isModalVisible = false;
    },

    async getEvents(){
      this.events = await this.fetchEvents();
      main = [];
      for(let i = 0; i < this.events.length; i++){ 
         main.push(this.events[i].event);
         if (this.events[i].id > idNum)
         {
           idNum = this.events[i].id;
         }
      }
      if (this.events.length > 0){
        idNum++;
      }
      this.events = main;
      return this.events;
    },

    async fetchEvents(){
      const res = await fetch('http://localhost:5000/events')
      const data = await res.json()
      return data
    },

    async fetchEvent(id){
      const res = await fetch(`http://localhost:5000/events/${id}`)
      const data = await res.json()
      return data
    },
  },
  async created() {
    this.events = await this.fetchEvents();
  },
}
</script>

<template>
  <div class='demo-app'>
      <NotesModal
            v-show="isModalVisible"
            @close="closeModal"
            @deleteEvent="handleDeleteButton"
          />
          <Sidebar
      v-if="isModalVisible == false"
       />
      <div class='demo-app-main'>
      <FullCalendar
      v-if="isModalVisible == false"
      class='demo-app-calendar'
      :options='calendarOptions'       
      >
        <template v-slot:eventContent='arg'>
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
      </div>
  </div>
</template>

<style lang='css'>

h2 {
  margin: 0;
  font-size: 16px;
}

ul {
  margin: 0;
  padding: 0 0 0 1.5em;
}

li {
  margin: 1.5em 0;
  padding: 0;
}

b { /* used for event dates/times */
  margin-right: 3px;
}

.demo-app {
  display: flex;
  min-height: 100%;
  font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
  font-size: 14px;
}

.demo-app-sidebar {
  width: 300px;
  line-height: 1.5;
  background: #eaf9ff;
  border-right: 1px solid #d3e2e8;
}

.demo-app-sidebar-section {
  padding: 2em;
}

.demo-app-main {
  flex-grow: 1;
  padding: 3em;
}

.fc { /* the calendar root */
  max-width: 1100px;
  margin: 0 auto;
}

</style>