/*-----------Navigation Menu---------- */
(() =>{
    const hamburgerBtn = document.querySelector('.hamburger-btn'),
     navMenu = document.querySelector('.nav-menu'),
     closeNavBtn = document.querySelector('.close-nav-menu');

     hamburgerBtn.addEventListener('click', showNavMenu);
     closeNavBtn.addEventListener('click', hideNavMenu);

     function showNavMenu(){
         navMenu.classList.add('open');
         bodyScrollingToggle();
     }

     function hideNavMenu() {
        navMenu.classList.remove('open');
        toggleFadeOutEffect();
        bodyScrollingToggle();
     }

     function toggleFadeOutEffect(){
        document.querySelector('.fade-out-effect').classList.add('open');
        setTimeout(() => {
            document.querySelector('.fade-out-effect').classList.remove('open');
        }, 300);
    }

    // attach and event handler to document
    document.addEventListener('click', (event) => {
        if(event.target.classList.contains('link-item')){
            /*make sure event.target.hash a value befor overridding default behavior */
            if(event.target.hash !==""){
                // preventing default anchor click behavior
                const hash = event.target.hash;
                // deactivate existing active 'section'
                document.querySelector('.section.active').classList.add('hide'); 
                document.querySelector('.section.active').classList.remove('active'); 
                // activate new 'section
                document.querySelector(hash).classList.add('active');
                document.querySelector(hash).classList.remove('hide');
                //deactivate existing active navigation menu 'link-item'
                navMenu.querySelector('.active').classList.add('outer-shadow','hover-in-shadow');
                navMenu.querySelector('.active').classList.remove('active','inner-shadow');
                // if clicked 'link-item is contained withing the navigation menu'
                if(navMenu.classList.contains('open')){
                    //activate new navigation menu 'link-item'
                    event.target.classList.add('active','inner-shadow');
                    event.target.classList.remove('outer-shadow','hover-in-shadow');
                    // hide navigation menu
                    hideNavMenu();
                }else {
                    let navItems = navMenu.querySelectorAll('.link-item');
                    navItems.forEach((item) => {
                        if(hash === item.hash){
                            // activate new navigation menu 'link-item'
                            item.classList.add('active','inner-shadow');
                            item.classList.remove('outer-shadow','hover-in-shadow');
                        }
                    })
                    toggleFadeOutEffect();
                }
            } 
        }
    });

})();

/*----------Nav Item-----------*/
(() => {
    const linkItme = document.querySelectorAll(".link-item");

})();

/*----------- about section tabs ---------- */
/*-------Tab on off classes Start------*/
const activeTabClasses = ['outer-shadow','active'];
const activeTabContentClasses = 'active';
/*-------Tab on off classes End------*/

(() => {
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");
    tabsContainer.addEventListener('click', (event) => {
        /** If event.target contains class 'tab-item' class and not contains 'active' class */
        if(event.target.classList.contains('tab-item') && !event.target.classList.contains('active')){
            const target = event.target.getAttribute('data-target');
            // deactivate existing active 'tab-item'
            tabsContainer.querySelector('.active').classList.remove(...activeTabClasses);
            //active new 'tab-item'
            event.target.classList.add(...activeTabClasses)
            // deactivate existing active 'tab-content'
            aboutSection.querySelector('.tab-content.active').classList.remove(activeTabContentClasses);
            //active new 'tab-content'
            aboutSection.querySelector(target).classList.add(activeTabContentClasses);
        }
    })
})();

function bodyScrollingToggle(){
    document.body.classList.toggle("hidden-scrolling");
}

/*------------Portfolio Filter and popup------------*/ 
(() =>{
    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item");
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    /* Filter portfolio items */
    filterContainer.addEventListener('click', (event) => {
        if(event.target.classList.contains('filter-item') && !event.target.classList.contains('active')){
            // deactive existing active 'filter-item'
            filterContainer.querySelector('.active').classList.remove(...activeTabClasses);
            // active new 'filter-item'
            event.target.classList.add(...activeTabClasses);
            const target = event.target.getAttribute('data-target');
            portfolioItems.forEach((item) => {
                if(target === item.getAttribute('data-category') || target === 'all' ){
                    item.classList.remove("hide");
                    item.classList.add("show"); 
                }else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    });

    portfolioItemsContainer.addEventListener('click', (event) => {
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // get the portfolioItem index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            // covert screenshots into array
            screenshots = screenshots.split(",");
            if(screenshots.length === 1 ){
                prevBtn.style.display = 'none'; 
                nextBtn.style.display = 'none'; 
            }else {
                prevBtn.style.display = 'block'; 
                nextBtn.style.display = 'block'; 
            }
            slideIndex = 0;
            popupToggle();
            popupSlideShow();
            popupDetails();
        }
    });

    closeBtn.addEventListener('click', () => {
        popupToggle();
        if(projectDetailsContainer.classList.contains('active')) {
            popupDetailsToggle();
        }
    })

    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideShow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        /* activate loader until the popupImg loaded */
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            /* deactivate loader after popupImg loaded */
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = `${ slideIndex+1 } of ${ screenshots.length }`;
       
    }

    // next slide
    nextBtn.addEventListener('click', () => {
        if(slideIndex === (screenshots.length - 1)){
            slideIndex = 0;
        }else {
            slideIndex++;
        }
        popupSlideShow();
    })

    //prev slide
    prevBtn.addEventListener('click', () => {
        if(slideIndex === 0){
            slideIndex = (screenshots.length - 1);
        }else {
            slideIndex--;
        }
        popupSlideShow();
    })

    function popupDetails(){
        // if porfolio-item-details not exists
        if(!portfolioItems[itemIndex].querySelector('.portfolio-item-details')){
            projectDetailBtn.style.display = 'none';
            return; /* end function execution */ 
        }
        projectDetailBtn.style.display = 'block';
        //get the project details
        const details = portfolioItems[itemIndex].querySelector('.portfolio-item-details').innerHTML;
        //set the project details
        popup.querySelector('.pp-project-details').innerHTML = details;
        //get the project title
        const title = portfolioItems[itemIndex].querySelector('.portfolio-item-title').innerHTML;
        //set the project title
        popup.querySelector('.pp-title h2').innerHTML = title;
        //get the project category
        const category = portfolioItems[itemIndex].getAttribute('data-category');
        //set the project category
        popup.querySelector('.pp-project-category').innerHTML = category.split("-").join(" ");
    }

    projectDetailBtn.addEventListener('click', () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains('active')) {
            projectDetailBtn.querySelector('i').classList.remove('fa-minus');
            projectDetailBtn.querySelector('i').classList.add('fa-plus');
            projectDetailsContainer.classList.remove('active'); 
            projectDetailsContainer.style.maxHeight = `${0}px`;
        }else {
            projectDetailBtn.querySelector('i').classList.remove('fa-plus');
            projectDetailBtn.querySelector('i').classList.add('fa-minus');
            projectDetailsContainer.classList.add('active');
            projectDetailsContainer.style.maxHeight = `${projectDetailsContainer.scrollHeight}px`;
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }
    
})();

/*-------------------------testominal section slider ---------------------- */
(() => {
    const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = document.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector('.testi-item.active');
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);

    //set with of all slides
    slides.forEach((slide) => {
        slide.style.width = slideWidth + "px";
    })
    // set with of sliderContainer
    sliderContainer.style.width = slideWidth * slides.length + "px";

    nextBtn.addEventListener('click', () =>{
        if(slideIndex === slides.length - 1){
            nextBtn.style.visibility  = 'hidden';
        }else {
            slideIndex++;
            if(slideIndex === slides.length - 1){
                nextBtn.style.visibility  = 'hidden';
            }
            prevBtn.style.visibility  = 'visible';
        }
        slider();
    })
    prevBtn.addEventListener('click', () =>{
        if(!slideIndex === 0){
            prevBtn.style.visibility  = 'hidden';
        }else {
            slideIndex--;
            if(slideIndex === 0){
                prevBtn.style.visibility  = 'hidden';
            }
            nextBtn.style.visibility  = 'visible';
        }
        slider();
        
    })

    function slider(){
        //deactivte existing active slides
        sliderContainer.querySelector('.testi-item.active').classList.remove('active');
        //activte new active slides
        slides[slideIndex].classList.add('active');
        sliderContainer.style.transform  = `translateX(${-(slideWidth * slideIndex)}px)`;
    }
    slider();
})();

/*--------------Hide All Section Except Active----------*/
(() => {
    let current_url = location.href.split('#')[1];
    const sections = document.querySelectorAll('.section');
    const allLinks = document.querySelectorAll('.nav-menu-inner .link-item');
    if(current_url){
        allLinks.forEach((linkItem) =>{
            //deactivate existing active navigation menu 'link-item'
            linkItem.classList.add('outer-shadow','hover-in-shadow');
            linkItem.classList.remove('active','inner-shadow');
            //activate new navigation menu 'link-item'
            document.querySelector(`.nav-menu-inner a[href='#${current_url}']`).classList.add('active','inner-shadow');
            document.querySelector(`.nav-menu-inner a[href='#${current_url}']`).classList.remove('outer-shadow','hover-in-shadow');
        })
    }
    sections.forEach((section) =>{
        if(current_url){
            if(section.id == current_url) {
                section.classList.add('active');
            }else {
                section.classList.remove('active');
            }
            if(!section.classList.contains('active')){
                section.classList.add('hide'); 
            }    
        }else {
            if(!section.classList.contains('active')){
                section.classList.add('hide'); 
            }
        }
        
    })
})();

window.addEventListener('load', () => {
    //preloader
    document.querySelector('.preloader').classList.add('fade-out');    
    setTimeout(() => {
        document.querySelector('.preloader').style.display = 'none';
    }, 600);
})

/* Send Form Data To Mail */

(function() {
    // get all data in form and return object
    function getFormData(form) {
        var elements = form.elements;
        var honeypot;

        var fields = Object.keys(elements).filter(function(k) {
            if (elements[k].name === "honeypot") {
                honeypot = elements[k].value;
                return false;
            }
            return true;
        }).map(function(k) {
            if(elements[k].name !== undefined) {
                return elements[k].name;
                // special case for Edge's html collection
            }else if(elements[k].length > 0){
                return elements[k].item(0).name;
            }
        }).filter(function(item, pos, self) {
            return self.indexOf(item) == pos && item;
        });

        var formData = {};
        fields.forEach(function(name){
            var element = elements[name];

            // singular form elements just have one value
            formData[name] = element.value;

            // when our element has multiple items, get their values
            if (element.length) {
                var data = [];
                for (var i = 0; i < element.length; i++) {
                    var item = element.item(i);
                    if (item.checked || item.selected) {
                        data.push(item.value);
                    }
                }
                formData[name] = data.join(', ');
            }
        });

        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
        formData.formGoogleSendEmail
            = form.dataset.email || ""; // no email by default

        return {data: formData, honeypot: honeypot};
    }

    function handleFormSubmit(event) {  // handles form submit without any jquery
        event.preventDefault();           // we are submitting via xhr below
        var form = event.target;
        var formData = getFormData(form);
        var data = formData.data;

        // If a honeypot field is filled, assume it was done so by a spam bot.
        if (formData.honeypot) {
            return false;
        }

        disableAllButtons(form);
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        // xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {
                form.reset();
                var formElements = form.querySelector(".form-elements")
                if (formElements) {
                    formElements.style.display = "none"; // hide form
                }
                var thankYouMessage = form.querySelector(".thankyou_message");
                if (thankYouMessage) {
                    thankYouMessage.style.display = "block";
                }
            }
        };
        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        }).join('&');
        xhr.send(encoded);
    }

    function loaded() {
        // bind to the submit event of our form
        var forms = document.querySelectorAll("form.contact-us-form");//Get all the forms having class="gform" in the form tag
        for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", handleFormSubmit, false);
        }
    };
    document.addEventListener("DOMContentLoaded", loaded, false);

    function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].disabled = true;
        }
    }
})();