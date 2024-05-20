if(!customElements.get('image-gallery')) {
	customElements.define(
		'image-gallery',
		class imageSlider extends HTMLElement {
			constructor() {
				super();
				this.elements = {
					imageList: this.querySelectorAll('.image-gallery__item'),
					textList: this.querySelectorAll('.image-gallery__text-item'),
					sliderHandleList: this.querySelectorAll('.image-gallery__handle'),
					prevBtn: this.querySelector('.image-gallery--btn__prev'),
					nextBtn: this.querySelector('.image-gallery--btn__next')
				}
				this.elements.sliderHandleList.forEach(item => item.addEventListener('click', this.changeSliderImage.bind(this)));
				this.elements.prevBtn.addEventListener('click', this.onClickPrevBtn.bind(this));
				this.elements.nextBtn.addEventListener('click', this.onClickNextBtn.bind(this));
        this.doGallery(this.elements.sliderHandleList[0])
			}

			changeSliderImage(event) {
				event.preventDefault();
				this.doGallery(event.target);
			}

			onClickNextBtn(event) {
				event.preventDefault();
        const targetElementArray = [...this.elements.sliderHandleList];
				const targetElement = targetElementArray.filter(item => [...item.classList].includes('handle-active'));
				let tabIndex = (parseInt(targetElement[0].getAttribute('tabindex')) + 1) % targetElementArray.length;
				let element = targetElementArray.filter(element => parseInt(element.getAttribute('tabindex')) === tabIndex);
				this.doGallery(...element);
			}

			onClickPrevBtn(event) {
				event.preventDefault();
        const targetElementArray = [...this.elements.sliderHandleList];
				const targetElement = targetElementArray.filter(item => [...item.classList].includes('handle-active'));
				let tabIndex = Math.abs((((parseInt(targetElement[0].getAttribute('tabindex')) - 1) < 0) ? targetElementArray.length - 1 : parseInt(targetElement[0].getAttribute('tabindex')) - 1) % targetElementArray.length);
				let element = targetElementArray.filter(element => parseInt(element.getAttribute('tabindex')) === tabIndex);
				this.doGallery(...element);
			}

			doGallery(element) {
				this.addClass(this.elements.sliderHandleList, element, 'handle-active');
				this.addClass(this.elements.imageList, element, 'active');
				this.addClass(this.elements.textList, element, 'active');
			}

			addClass(elementList, targetElement, className) {
				elementList.forEach((element, index) => {
					element.classList.remove(className);
					if (element.hasAttribute('tabindex')) {
						if (parseInt(targetElement.getAttribute('tabindex')) === index) {
							element.classList.add(className);
						}
					}
				});
			}
		}
	)
}