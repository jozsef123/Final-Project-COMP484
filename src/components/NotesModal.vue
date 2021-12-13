<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header
          class="modal-header"
          id="modalTitle"
        >
          <input type = "text" placeholder="edit event title" :value="title"
          @input = "changeNoteTitle">

          <p id = "dateInfo">howdydddddd</p>
          
          <button
            type="button"
            class="btn-delete"
            @click="deleteEvent"
            aria-label="Delete modal"
          >
            <font-awesome-icon icon = "trash" />
          </button>
        </header>

        <section
          class="modal-body"
          id="modalDescription"
        >
          <textarea id = "textBox" type="text" placeholder="add details here" :value="msg"
          @input = "changeMessage"></textarea>
        </section>

        <footer class="modal-footer">
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            Close and Save Note
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>


<script>
  export default {
    name: 'NotesModal',
    props: ['title','msg'],
    data(){
      return{
        noteTitle: '',
        message: '',
      }
    },
    methods: {
      close() {
        this.$emit('close');
      },
      deleteEvent(){
        this.$emit('deleteEvent');
      },
      changeNoteTitle(event){
        this.noteTitle = event.target.value;
        this.$emit('noteTitleChanged', this.noteTitle);
      },
      changeMessage(event){
        this.message = event.target.value;
        this.$emit('messageChanged', this.message);
      }
    },
  };
</script>

<style>
  textarea{
    height: 250px;
    width: 350px;
  }

  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #FFFFFF;
    box-shadow: 2px 2px 20px 1px;
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    height: 400px;
    width: 400px;
  }

  .modal-header,
  .modal-footer {
    padding: 15px;
    display: flex;
  }

  .modal-header {
    position: relative;
    border-bottom: 1px solid #eeeeee;
    color: #4AAE9B;
    justify-content: space-between;
  }

  .modal-footer {
    border-top: 1px solid #eeeeee;
    flex-direction: column;
    justify-content: flex-end;
  }

  .modal-body {
    position: relative;
    padding: 20px 10px;
  }

  .btn-delete {
    position: absolute;
    top: 0;
    right: 0;
    border: none;
    /*font-size: 30px;*/
    padding: 10px;
    cursor: pointer;
    font-weight: bold;
    color: rgb(206, 49, 49);
    background: #ffffff;
    border: 1px solid #ff0000;
    border-radius: 2px;
    font-size: 1.5em;
  margin: 5px;
  }

  .btn-close {
    color: white;
    background: #4AAE9B;
    border: 1px solid #4AAE9B;
    border-radius: 2px;
  }

  #textBox{
    height: 250px;
    width: 360px;
  }

  .datesInfo{
    margin-right: 150px;
  }
</style>