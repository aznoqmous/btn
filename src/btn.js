export default class Btn {
    constructor(container, opts={}){
        this.opts = Object.assign({
            animationDurationMs: 700,
            autoClean: false
        }, this)
        this.container = container
        this.build()
        this.bind()
    }

    build(){
        this.container.style.position = "relative"

        this.contentElement = document.createElement("span")
        this.contentElement.innerHTML = this.container.innerHTML

        this.container.innerHTML = ""
        this.container.style.isolation = "isolate"
        this.container.append(this.contentElement)
    }
    
    createElement(){
        let element = document.createElement('i')
        this.container.append(element)
        element.className = "hover-effect"
        element.style.position = "absolute"
        element.style.pointerEvents = "none"
        element.style.borderRadius = "50%"
        element.style.aspectRatio = 1
        element.style.pointerEvents = "none"
        element.style.transform = "translate(-50%, -50%)"
        return element
    }

    bind(){
        this.container.addEventListener('mouseenter', (e)=>{
            //if(this.element) this.element.remove()
            this.mousePosition = {x: e.offsetX, y: e.offsetY}
            const element = this.createElement()
            this.element = element
            element.style.transition = null
            element.style.left = e.offsetX + "px"
            element.style.top = e.offsetY + "px"
            element.style.width = "0px"
            
            const rect = this.container.getBoundingClientRect()
            const size = Math.max(rect.width, rect.left)

            setTimeout(()=>{
                element.style.transition = `all ${this.opts.animationDurationMs}ms ease`
                element.style.width = size + "px"
                element.classList.add('visible')
                if(!this.opts.autoClean) setTimeout(()=> element.remove(), this.opts.animationDurationMs)
            })
        })
        this.container.addEventListener('mouseleave', ()=>{
            if(this.opts.autoClean) this.element.remove()
        })
    }

    static bind(selector){
        document.querySelectorAll(selector).forEach(el => new this(el))
    }
}