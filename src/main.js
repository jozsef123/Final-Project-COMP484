import Vue from 'vue'
import DemoApp from './DemoApp.vue'
import './main.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrash)
library.add(faSignOutAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

require("regenerator-runtime/runtime");


Vue.config.productionTip = false

new Vue({
  render: h => h(DemoApp),
}).$mount(
  document.body.appendChild(document.createElement('div'))
)