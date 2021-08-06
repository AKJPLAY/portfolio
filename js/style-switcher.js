/**-----------toggel style swithcer-------------- */
const styleSwitcherToggler = document.querySelector('.style-switcher-toggler');
styleSwitcherToggler.addEventListener('click', () => {
    document.querySelector('.style-switcher').classList.toggle('open');
})

// hide style - switcher on scroll
window.addEventListener('scroll', () => {
    if(document.querySelector('.style-switcher').classList.contains('open')){
        document.querySelector('.style-switcher').classList.remove('open');
    }
});

/**--------------Theme Color ---------------- */
const alternateStyle = document.querySelectorAll('.alternate-style');
function setActiveStyles(color) {
     alternateStyle.forEach((style) => {
         if(color === style.getAttribute('title')){
             style.removeAttribute('disabled');
         }else {
            style.setAttribute('disabled', true);
         }
     })
}

/**-----------------theme light and dark mode -----------------  */
const dayNight = document.querySelector('.day-night');
dayNight.addEventListener('click', () => {
    dayNight.querySelector('i').classList.toggle('fa-sun');    
    dayNight.querySelector('i').classList.toggle('fa-moon');
    document.body.classList.toggle('dark');
    if(dayNight.querySelector('i').classList.contains('fa-sun')){
        setCookie('dayNight','SUN',30);   
    }
    if(dayNight.querySelector('i').classList.contains('fa-moon')){
        setCookie('dayNight','MOON',30);
    }
    
})
window.addEventListener('load', () => {
    if(getCookie('dayNight') == 'MOON'){
        document.body.classList.add('dark');
    }
    if(document.body.classList.contains('dark')){
        dayNight.querySelector('i').classList.add('fa-sun');
    }else {
        dayNight.querySelector('i').classList.add('fa-moon');
    }
})



/**Set Cookies */
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

/**Get Cookies */

function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}