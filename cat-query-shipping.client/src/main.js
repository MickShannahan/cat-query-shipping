import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap'
import 'monaco-editor'
import { createApp } from 'vue'
// @ts-ignore
import App from './App.vue'
import { registerGlobalComponents } from './registerGlobalComponents'
import { router } from './router'
import InfiniteScroll from './services/InfiniteScroll'

const root = createApp(App)
registerGlobalComponents(root)

root
  .directive('pickup',{
    beforeUnmount:(el, binding) => {
      el.removeEventListener('mousedown', binding.dir.pickupElm)
      el.removeEventListener('mouseup', binding.dir.dropElm)
      el.remove()
    },
    updated:(el, binding)=>{
      let data = JSON.parse(el.dataset.pickup)?.id
    },
    mounted:(el, binding) =>{
      el.ondragstart= ()=> false
      el.style.cursor = 'grab'
      el.style.position = 'absolute'
      el.style.transition = 'transform 0.2s ease'
      let width = el.offsetWidth
      let height = el.offsetHeight
      let screen = document.documentElement
      let elmStyle = getComputedStyle(el)
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
      function drag({movementX, movementY, clientX, clientY}){
        el.hidden = true;
        let elmBelow = document.elementFromPoint(event.clientX, event.clientY);
        el.hidden = false;
        droppable = elmBelow.closest('.drop-zone');

        //SECTION in drop zone
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
        } else {  el.style.filter = null; inDrop = false; droppable = null }

        let style = window.getComputedStyle(el)
        let left = parseInt(style.left)
        let top = parseInt(style.top)
        if(left + width + movementX < screen.clientWidth - 30 && left + movementX > 15){
          el.style.left =  clientX - (width/2) + 'px'
        }
        if(top  + movementY >  15 && top + height + movementY < screen.clientHeight -15){
          el.style.top = clientY - (height/2) + 'px'
        }

        // NOTE ROTATE ONLY WORKS WHEN CONSOLE OPEN
        // lag += movementX
        // if(Math.abs(lag) > 5) lag = 5 * movementX;
        let rot = movementX > 0 ? 5 : movementX < 0 ? -5 : 0
        el.style.transform = `rotate(${rot}deg) scale(1.02)`
      }
        //SECTION Pickup
        binding.dir.pickupElm = ()=> {
          binding.value(event)
          sessionStorage.setItem('pickup'  , el.dataset.pickup)
          el.addEventListener('mousemove', drag)
          el.style.transform = 'scale(1.02)'
          el.style.zIndex= 10000
        }
        el.addEventListener('mousedown', binding.dir.pickupElm)

        //SECTION Drop
        binding.dir.dropElm = ()=> {
          el.removeEventListener('mousemove', drag)
          el.hidden = true;
          el.hidden = false;
          el.style.transform = `scale(1) ${startingRot}`
          el.style.zIndex=startingZ
          // FIXME this snapping needs correcting
          if(binding.arg == 'anchor' &&  !inDrop){
            el.style.left = startingLeft
            el.style.top = startingTop
          }
          if(inDrop){
            if(droppable.drop) droppable.drop()
            if(droppable.dataset.anchor){
              el.style.left = dropX + (dropW/2) - (elmRect.width/2) + 'px'
              el.style.top = dropY + (dropH/2) - (elmRect.height/2) + 'px'
            }
            el.style.zIndex = dropZ + 1
            inDrop=false
          }
        }
        el.addEventListener('mouseup', binding.dir.dropElm)
    }
  })
  .directive('drop', {
    mounted:(el, binding)=>{
      el.classList.add('drop-zone')
      if(binding.arg == 'anchor') {
        el.setAttribute('data-anchor', true)
      }
      el.style.zIndex = 500
        el.drop = ()=> {
          if(binding.value) binding.value(event, JSON.parse(sessionStorage.getItem('pickup')))
        }
    }
  })
  .use(InfiniteScroll)
  .use(router)
  .mount('#app')
