import barba from "@barba/core";
import gsap from "gsap";
import Loader from './loader.js';

gsap.config({
    nullTargetWarn: false,
});

let firstLoad = true;


barba.hooks.enter((data) => {
    gsap.set([data.next.container, data.current.container], { position: "fixed", top: 0, left: 0, width: "100%", height:'100vh' });
});
barba.hooks.after((data) => {
    gsap.set(data.next.container, { position: "relative", height: "auto" });
});

barba.init({
    preventRunning: true,
    views: [
        {
            namespace: "home",
            afterEnter(data) {
                console.log('home')
                //new Loader();
            }
        },
        {
            namespace: "info",
            afterEnter(data) {
            },
        },
        {
            namespace: "work-category",
            afterEnter(data) {

            },
        },
        {
            namespace: "work",
            afterEnter(data) {

            },
        },
        {
            namespace: "404",
            beforeEnter() {},
        }
    ],
    transitions: [
        {
            sync: true,
            enter(data) {
                const currentContainer = data.current.container;
                const nextContainer = data.next.container;
                console.log(currentContainer, nextContainer)
                let insetValue = '40%'
                let tlTransition = gsap.timeline({defaults: {ease: "expo.inOut"}});
                tlTransition.set(nextContainer, {clipPath: `inset(${insetValue})`, xPercent: 120})
                    .set([currentContainer.querySelector(".section-transition"),nextContainer.querySelector(".section-transition")], {scale: 1, duration: 0.3})
                    .to(currentContainer, {clipPath: `inset(${insetValue})`, duration: 1})
                    .to(currentContainer, {xPercent: -120, duration: 1})
                    .to(nextContainer, {xPercent: 0, duration: 1}, "<")
                    .to(nextContainer, {clipPath: `inset(0%)`, duration: 1})
                    .to([nextContainer.querySelector(".section-transition")], {opacity: 0, display:'hidden', duration: 1}, "<")
                    .set([nextContainer.querySelector(".section-transition")], {opacity: 1, scale: 0})
                return tlTransition;
            }
        }
    ]
});