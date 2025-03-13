let vh = window.innerHeight * 0.01;

document.documentElement.style.setProperty('--vh', `${vh}px`);
window.addEventListener('resize', () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  
});



const portfolioTogglers  = new Swiper(".portfolio-nav.swiper", {
	speed: 1000,
	
	slidesPerView: 'auto',
	spaceBetween: 40,
})


const portfolioGallery  = new Swiper(".swiper.portfolio", {
	speed: 1000,	
	slidesPerView: 'auto',
	spaceBetween: 16,
})


Fancybox.bind('[data-fancybox]', {
    compact: false,
    contentClick: "iterateZoom",
    Images: {
      Panzoom: {
        maxScale: 2,
      },
    },
    Toolbar: {
      display: {
        left: [
          "infobar",
        ],
        middle : [],
        right: [
          "iterateZoom",
          "close",
        ],
      }
    }
});  



const protfolioTogglers = document.querySelectorAll('.portfolio-toggler');
const gallerySlides = document.querySelectorAll('.swiper-slide.portfolio__item');

if ( protfolioTogglers.length ){
	protfolioTogglers.forEach( pt => {
		pt.addEventListener('click', function(){
			if ( !this.classList.contains('.portfolio-toggler-active') ){
				let activeToggler = document.querySelector('.portfolio-toggler.portfolio-toggler-active');
				activeToggler.classList.remove('portfolio-toggler-active');	
				this.classList.add('portfolio-toggler-active');
	
				let currentGallery = this.getAttribute('data-gallery');
				
				let animationCounter = 0;
				gallerySlides.forEach( slide => {

					

					if ( slide.getAttribute('data-gallery') === currentGallery ){
						//slide.classList.add('show-animation');
						slide.classList.add('active');
						slide.style.animationDelay  = (animationCounter * 150) + 'ms';
						portfolioGallery.params.speed = 0;
						portfolioGallery.slideTo(0)
						portfolioGallery.params.speed = 1000;
						animationCounter +=  1;
					} else{
						slide.classList.remove('active');
					}
				} )
			}
		})
		
	} )
}


const advantagesSlider = new Swiper(".advantages-grid.swiper", {
	speed: 1000,
	
	slidesPerView: 1,
	spaceBetween: 24,
	
	pagination: {
		el: '.pagination',
		clickable: true,
	},
	
	breakpoints: {
		480: {
			slidesPerView: 2,
			spaceBetween: 24
		},
		720: {
			slidesPerView: 3,
			spaceBetween: 24
		},
		
	}
})

const categoryAdvantagesSlider = new Swiper(".category-advantages-grid.swiper", {
	speed: 1000,
	
	slidesPerView: 2,
	spaceBetween: 24,
	
	pagination: {
		el: '.pagination',
		clickable: true,
	},
	
	breakpoints: {
		480: {
			slidesPerView: 2,
			spaceBetween: 24
		},
		720: {
			slidesPerView: 3,
			spaceBetween: 24
		},
		
	}
})

/*
const servicesCard = document.querySelectorAll('.our-services__item');
if ( servicesCard.length ){
	servicesCard.forEach( sc => {

		const innerContainer = sc.querySelector('.our-services__list-inner-wrap');
		const serviceList = sc.querySelector('.our-services__list'); 

		sc.addEventListener('mouseenter', () => {
			let height = innerContainer.offsetHeight;
			serviceList.style.height = height + 'px';
		});

		sc.addEventListener('mouseleave', () => {

			serviceList.style.height = 0 + 'px';
	
		});
	} )
}*/


const orServices  = new Swiper(".swiper.our-services", {
	speed: 1000,	
	slidesPerView: 'auto',
	spaceBetween: 16,
})

let approves = document.querySelectorAll('[data-approve]');
if ( approves.length ){
    approves.forEach( cb => {
        let parent = cb.closest('form');

        const target_link = cb.getAttribute('data-approve');
        const targetNode = parent.querySelector(target_link);
        console.log(cb);
        if ( !cb.checked ){
            targetNode.setAttribute('disabled', 'disabled');
        }
        cb.addEventListener('change', function(){
            
            if ( !this.checked ){
                targetNode.setAttribute('disabled', 'disabled');
            } else {
                targetNode.removeAttribute('disabled');
            }   
        })
    } )
}


const clientsSlider = new Swiper(".swiper.clients-slider", {
	speed: 1000,
	autoplay: {
		delay: 6000,
	},
	slidesPerView: 2,
	spaceBetween: 24,
	loop: true,
	pagination: {
		el: '.pagination',
		clickable: true,
	},
	navigation: {
		nextEl: '.clients-nav-next',
		prevEl: '.clients-nav-prev',
	},
	breakpoints: {
		
		600: {
			slidesPerView: 3,
			spaceBetween: 24
		},
		800: {
			slidesPerView: 4,
			spaceBetween: 24
		},


		1400: {
			slidesPerView: 5,
			spaceBetween: 32
		},
		
		1600: {
			slidesPerView: 6,
			spaceBetween: 49
		}

	}
})

const modals = new HystModal({
    linkAttributeName: "data-hystmodal",
    // настройки (не обязательно), см. API
});


let phoneInputs = document.querySelectorAll('input[name="phone"]');
if ( phoneInputs.length ){
    phoneInputs.forEach( inp => {
        let mask = IMask(inp, {
            mask: '+{7} 000 000 00-00',
			
            lazy: true,  // make placeholder always visible
            placeholderChar: '_'     // defaults to '_'
        })

		inp.addEventListener('focus', function(){
			mask.updateOptions({
				lazy: false,
			});
		})
		inp.addEventListener('blur', function(){
			mask.updateOptions({
				lazy: true,
			});
		})
    } )
}


//Отправка форм
const forms = document.querySelectorAll('form');


if ( forms.length) {
	forms.forEach( frm => {
		frm.addEventListener('submit', function(event){
			event.preventDefault();
		
			const formData = new FormData(frm);
			
			fetch('send_action', {
				method: 'POST',            
				body: new URLSearchParams({									
					...Object.fromEntries(formData.entries())
				}),
		
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
		
			})
			.then(response => response.json())
			.then(data => {					
				modals.close('#feedback-modal');
				modals.open('#thanks-modal');
				frm.reset();
			})
		
			.catch(error => {

				//ДЛЯ ТЕСТА
				modals.close('#feedback-modal');
				modals.open('#thanks-modal');
				frm.reset();
			});
			
		})
	} )
}

document.addEventListener('DOMContentLoaded', function(){
    let jumpBlocks = document.querySelectorAll('[data-to-jump][data-media-jump]');

    if ( jumpBlocks.length ){
        jumpBlocks.forEach( jb => {
            
            const targetBlockLink = jb.getAttribute('data-to-jump');
            const targetBlockNode = document.querySelector(targetBlockLink);
            const targetMedia = Number(jb.getAttribute('data-media-jump'));
            

            const initialParent = jb.parentNode;
            
            let vw = document.documentElement.clientWidth;
            
            if ( targetBlockNode &&  targetMedia )  {

                const mode = jb.getAttribute('data-mode');

                if ( mode === 'desktop-first' ){
                    if ( vw <= targetMedia ) targetBlockNode.append(jb);
                } else{
                    if ( vw >= targetMedia ) targetBlockNode.append(jb);
                }
                
                

                window.addEventListener('resize', function(){
                    
                    let currentParent = jb.parentNode;
                    let vw = document.documentElement.clientWidth;

                    if ( mode === 'desktop-first' ){
                        if ( vw <= targetMedia  && currentParent !=  targetBlockNode ){
                            targetBlockNode.append(jb)
                        } else if ( vw > targetMedia && currentParent != initialParent) {
                            initialParent.append(jb);
                        }

                    } else{
                        if ( vw >= targetMedia  && currentParent !=  targetBlockNode ){
                            targetBlockNode.append(jb)
                        } else if ( vw < targetMedia && currentParent != initialParent) {
                            initialParent.append(jb);
                        }
                    }
                })
            }


            

        } )  
    }

})

const categoriesSections = document.querySelectorAll('.categories-section');
if ( categoriesSections.length ){
	categoriesSections.forEach( section => {
		let categories = section.querySelectorAll('.category');

		if ( categories.length && categories.length % 2 > 0){
			section.style.marginBottom = '0px';
		}
	} )
}

const fadeSlider = new Swiper(".swiper.fade-slider", {
	
	speed: 1000,
	
	watchSlidesProgress: true,
	mousewheelControl: true,
	keyboardControl: true,
	effect: 'fade',
	navigation: {
	  nextEl: ".fade-slider-next",
	  prevEl: ".fade-slider-prev"
	}
})

const doubleSlider = new Swiper(".double-slider.swiper", {
	speed: 1000,
	
	slidesPerView: 1,
	spaceBetween: 12,
	
	
	navigation: {
		nextEl: '.dbl-slider-next',
		prevEl: '.dbl-slider-prev',
	},
	breakpoints: {
		
		768: {
			slidesPerView: 2,
			spaceBetween: 12
		}
	}
})

const menuItems = document.querySelectorAll('.menu__item-parent-content');
const asideBack = document.querySelector('.aside-back');
const aside = document.querySelector('.aside');
const currentSubMenu = document.querySelector('.aside-back__current-menu-list');


function closeSubAsideMenu(){
	asideBack.classList.remove('active');
	let activeSubLinks = document.querySelectorAll('.aside-back__current-menu-list a');
	if ( activeSubLinks.length ){
		activeSubLinks.forEach( link => link.remove() );
	}

	let openItem = document.querySelector('.menu__item-parent-content.active')

	if ( openItem ){
		openItem.classList.remove('active');
	}
}


if ( menuItems.length ){
	
	menuItems.forEach( item => {
		item.addEventListener('click', function(){

			let vw = document.documentElement.clientWidth;

			if ( vw >= 768 ){

				if ( this.classList.contains('active') ){
					
					let activeSubLinks = document.querySelectorAll('.aside-back__current-menu-list a');
					if ( activeSubLinks.length ){
						activeSubLinks.forEach( link => link.remove() );
					}

					asideBack.classList.remove('active')
					this.classList.remove('active')
				} else{					
					let openItem = document.querySelector('.menu__item-parent-content.active')

					if ( openItem ){

						let activeSubLinks = document.querySelectorAll('.aside-back__current-menu-list a');
						if ( activeSubLinks.length ){
							activeSubLinks.forEach( link => link.remove() );
						}



						openItem.classList.remove('active');
						this.classList.add('active');

						let parentItem = this.closest('.menu__item');
						let subMenuLinks = parentItem.querySelectorAll('.sub-menu__list a');

						currentSubMenu.style.top = this.offsetTop + 'px';

						subMenuLinks.forEach( (link, index) => {
							let clonedLink = link.cloneNode(true);
							if ( index > 0 ){
								clonedLink.classList.add('animation-delay-' + (index * 100));
							}

							currentSubMenu.append(clonedLink);
						})


						
						

						
					} else{					

						let parentItem = this.closest('.menu__item');
						let subMenuLinks = parentItem.querySelectorAll('.sub-menu__list a');

						currentSubMenu.style.top = this.offsetTop + 'px';


						asideBack.classList.add('active')
						this.classList.add('active');
						currentSubMenu.style.top = this.offsetTop + 'px';

						subMenuLinks.forEach( (link, index) => {
							let clonedLink = link.cloneNode(true);
							if ( index > 0 ){
								clonedLink.classList.add('animation-delay-' + (index * 50));
							}

							currentSubMenu.append(clonedLink);
						})
					}

					
				}


				//item.classList.toggle('active');
			} else{
				let parentItem = this.closest('.menu__item');
				let subMenu = parentItem.querySelector('.sub-menu');
				let subMenuList = parentItem.querySelector('.sub-menu__list');

				if ( this.classList.contains('active') ){
					subMenu.style.height = '0px';
					this.classList.remove('active');
				} else{

					
					let openItem = document.querySelector('.menu__item-parent-content.active')

					if ( openItem ){
						openItem.classList.remove('active');
						let parentOpen = openItem.closest('.menu__item');
						let openSubMenu = parentOpen.querySelector('.sub-menu');
						openSubMenu.style.height  = '0px';

					}

					subMenu.style.height = subMenuList.offsetHeight + 'px';
					this.classList.add('active')
				}


				
			}


			
		})
		
	} )
}


const hamburger = document.querySelector('.hamburger');


hamburger.addEventListener('click', function(){

	
	this.classList.toggle('active');
	aside.classList.toggle('active');
	
	closeSubAsideMenu()
	
})


let asideClose = document.querySelector('.aside-back__close');

asideClose.addEventListener('click', function(){
	let activeSubLinks = document.querySelectorAll('.aside-back__current-menu-list a');
	if ( activeSubLinks.length ){
		activeSubLinks.forEach( link => link.remove() );
	}
	let openItem = document.querySelector('.menu__item-parent-content.active')

	if ( openItem ){
		openItem.classList.remove('active');
	}
	asideBack.classList.remove('active')
})

function resetMenu(){
	let asideActive = document.querySelector('.aside.active');
	if ( asideActive ){
		asideActive.classList.remove('active')
	}

	let backAsideActive = document.querySelector('.aside-back.active');
	if ( backAsideActive ){
		backAsideActive.classList.remove('active')
	}


	let hamburgerActive = document.querySelector('.hamburger.active');

	if ( hamburgerActive ) {
		hamburgerActive.classList.remove('active')
	}

	let openItems = document.querySelectorAll('.menu__item-parent-content.active');
	if ( openItems.length ){
		openItems.forEach( item => item.classList.remove('active') );
	}


	let subMenuStyled = document.querySelectorAll('.sub-menu[style]');
	if ( subMenuStyled.length ){
		subMenuStyled.forEach( sb => sb.removeAttribute('style') );
	}
}



const asideMobClose = document.querySelector('.aside__mob-close');
asideMobClose.addEventListener('click', resetMenu);
window.addEventListener('resize', resetMenu);