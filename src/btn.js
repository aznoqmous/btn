export default class Btn {
    constructor(container){
        this.container = container
        this.animationDuration = 700
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
        element.style.opacity = 0
        element.style.pointerEvents = "none"
        element.style.borderRadius = "50%"
        element.style.aspectRatio = 1
        element.style.transform = "translate(-50%, -50%)"
        return element
    }

    bind(){
        this.container.addEventListener('mouseenter', (e)=>{
            const element = this.createElement()
            element.style.transition = null
            element.style.left = e.offsetX + "px"
            element.style.top = e.offsetY + "px"
            element.style.width = "0px"
            element.style.opacity = 0.5
            
            setTimeout(()=>{


                element.style.transition = `all ${this.animationDuration}ms ease`

                element.style.width = "20rem"
                element.style.opacity = 0
                //setTimeout(()=> element.remove(), this.animationDuration)
            }, 10)
        })
    }

    static bind(selector){
        document.querySelectorAll(selector).forEach(el => new this(el))
    }
}