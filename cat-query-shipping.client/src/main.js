import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import 'monaco-editor'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router'
import { logger } from "./utils/Logger"

const root = createApp(App)
registerGlobalComponents(root)

root
  .directive('pickup',{
    updated:(el, binding)=>{
      let data = JSON.parse(el.dataset.pickup)?.id
    },
    mounted:(el, binding) =>{
      el.ondragstart= ()=> false
      el.style.cursor = 'grab'
      let width = el.offsetWidth
      let height = el.offsetHeight
      let screen = document.documentElement
      el.style.position = 'absolute'
      el.style.transition = 'transform 0.1s ease'
      let elmStyle = window.getComputedStyle(el)
      let elmRect = el.getBoundingClientRect()
      let startingLeft = elmStyle.left
      let startingTop = elmStyle.top
      let startingRot = elmStyle.transform
      let startingZ = elmStyle.zIndex
      let inDrop = false
      let droppable = null
      let dropX = startingLeft
      let dropY = startingTop
      let dropZ = startingZ
      let dropW = 0
      let dropH = 0
      let lag = 0
      function drag({movementX, movementY}){
        el.hidden = true;
        let elmBelow = document.elementFromPoint(event.clientX, event.clientY);
        el.hidden = false;
        droppable = elmBelow.closest('.drop-zone');
        // in drop zone
        if(droppable) {
          inDrop = true
          el.style.filter = 'drop-shadow(0px 0px 2px white)'
          let dropRect = droppable.getBoundingClientRect()
          let dropStyle = getComputedStyle(droppable)
          dropX = dropRect.x
          dropY = dropRect.y
          dropZ = dropStyle.zIndex
          dropH = dropRect.height
          dropW = dropRect.width
        } else { inDrop = false; el.style.filter = null }

        let style = window.getComputedStyle(el)
        let left = parseInt(style.left)
        let top = parseInt(style.top)
        if(left + width + movementX < screen.clientWidth - 30 && left + movementX > 15){
          el.style.left = left + movementX + 'px'
        }
        if(top  + movementY >  15 && top + height + movementY < screen.clientHeight -15)
        el.style.top = top + movementY + 'px'
        // NOTE ROTATE ONLY WORKS WHEN CONSOLE OPEN
        // lag += movementX
        // if(Math.abs(lag) > 5) lag = 5 * movementX;
        // el.style.transform = `rotate(${lag}deg)`
      }
        // Pickup
      el.addEventListener('mousedown', ()=>{
        binding.value(event)
        sessionStorage.setItem('pickup'  , el.dataset.pickup)
        el.addEventListener('mousemove', drag)
        el.style.transform = 'scale(1.02)'
        el.style.zIndex= 10000

        // Drop
      document.addEventListener('mouseup', ()=> {
        el.hidden = true;
        el.removeEventListener('mousemove', drag)
        el.hidden = false;
        el.style.transform = `scale(1) ${startingRot}`
        el.style.zIndex=startingZ
        if(binding.arg == 'anchor' && !inDrop){
          el.style.left = startingLeft
          el.style.top = startingTop
        }
        if(inDrop){
          if(droppable.drop) droppable.drop()
          el.style.left = dropX + (dropW/2) - (elmRect.width/2) + 'px'
          el.style.top = dropY + (dropH/2) - (elmRect.height/2) + 'px'
          el.style.zIndex = dropZ + 1
        }
      })
      })
    }
  })
  .directive('drop', {
    mounted:(el, binding)=>{
      el.classList.add('drop-zone')
      el.style.zIndex = 500
      el.drop = ()=> {binding.value(event, JSON.parse(sessionStorage.getItem('pickup')))}
    }
  })
  .use(router)
  .mount('#app')
