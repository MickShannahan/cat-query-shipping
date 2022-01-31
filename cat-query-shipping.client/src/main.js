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
    mounted:(el, binding) =>{
      el.ondragstart= ()=> false
      el.style.cursor = 'grab'
      el.ondragend= ()=> logger.log('end drag')
      let width = el.offsetWidth
      let height = el.offsetHeight
      let screen = document.documentElement
      el.style.position = 'absolute'
      el.style.transition = 'transform 0.1s ease'
      let elmStyle = window.getComputedStyle(el)
      let startingLeft = elmStyle.left
      let startingtop = elmStyle.top
      let startingRot = elmStyle.transform
      let startingZ = elmStyle.zIndex
      logger.log('rotation', startingRot)
      let lag = 0
      function drag({movementX, movementY}){
        el.hidden = true;
        let elmBelow = document.elementFromPoint(event.clientX, event.clientY);
        el.hidden = false;
        let droppable = elmBelow.closest('.drop-zone');
        if(droppable) {
          droppable.style.background = 'red'
        }

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

      el.addEventListener('mousedown', ()=>{
        binding.value(event)
        el.addEventListener('mousemove', drag)
        el.style.transform = 'scale(1.02)'
        el.style.zIndex= 10000
      document.addEventListener('mouseup', ()=> {
        el.hidden = true;
        el.removeEventListener('mousemove', drag)
        el.hidden = false;
        el.style.transform = `scale(1) ${startingRot}`
        el.style.zIndex=startingZ
        if(binding.arg == 'anchor'){
          el.style.left = startingLeft
          el.style.top = startingtop
        }
      })
      })
    }
  })
  .directive('drop', {
    beforeMount:(el, binding)=>{
      el.classList.add('drop-zone')

      let outsideClick = false;
      let mouseIn = false;
      document.addEventListener('mousedown', ()=> {
        outsideClick = !mouseIn ? true : false
        logger.log('outside click', outsideClick)
      })
      document.addEventListener('mouseup', ()=> setTimeout(()=>outsideClick = false, 10))
      el.addEventListener('mouseenter', ()=> {
        mouseIn = true
        logger.log('enter', mouseIn)
      })
      el.addEventListener('mouseleave', ()=> {
        mouseIn = false
        outsideClick = false
        logger.log('leave', outsideClick, mouseIn)
      })
      el.addEventListener('mouseenter', ()=>{
        logger.log(mouseIn, ":", outsideClick )
        if(mouseIn == true && outsideClick == true ){
          binding.value(event)
          logger.log('DROPPED!')
        }
      })
    }
  })
  .use(router)
  .mount('#app')
