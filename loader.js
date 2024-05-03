import gsap from 'gsap';
class Loader {

    tlAnimateDots = gsap.timeline();
    tlReavealVisual = gsap.timeline({defaults: {duration: 1}});
    constructor(){
       this.loaderWrapper = document.querySelector(".preloader-wrapper");
       this.loadingDots = [...this.loaderWrapper.querySelectorAll('.loading-visual')]
        this.loadingTextWrapper = document.querySelector('.loading-text-wrapper')
        this.init()
        this.addEventListeners()
    }

    init(){
        this.animateDots();
    }

    animateDots(){
        this.tlAnimateDots.to(this.loadingDots, {
            scale: 1,
            borderRadius: "0%",
            duration: 1,
            ease: "expo.inOut",
            stagger: {
                amount: 2,
                from: "end",
            },
            delay: 0.5
        })
        this.tlAnimateDots.to(this.loadingTextWrapper.querySelector("*"), {opacity: 0.5, duration: 0.6, yoyo: true, repeat: -1}, "<")
    }

    addEventListeners(){
        this.loaderWrapper.addEventListener('click', () => {
            this.tlReavealVisual.to(this.loadingDots[2], {height: '100%', scaleX: 0.5, ease: "expo.out"})
            this.tlReavealVisual.to([this.loadingDots[0], this.loadingDots[1], this.loadingDots[3], this.loadingDots[4]], {height: '0%'}, "<")
            this.tlReavealVisual.to(this.loaderWrapper, {backgroundColor:'transparent', color: 'black'}, "<")
            this.tlReavealVisual.to(this.loadingTextWrapper, {opacity:0, duration: 0.3}, "<")
        });
    }
}

export default Loader;