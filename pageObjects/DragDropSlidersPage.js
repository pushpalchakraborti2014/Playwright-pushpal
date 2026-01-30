const BasePage = require('./BasePage');

class DragDropSlidersPage extends BasePage {
    constructor(page) {
        super(page);
        
        // Selectors
        this.selectors = {
            slider15: '[data-id="slider1"]',
            sliderHandle: '[data-id="slider1"] input[type="range"]',
            sliderValueDisplay: '[data-id="slider1"] ~ .text-bold',
        };
    }

    async dragSliderTo(targetValue) {
        const slider = this.page.locator(this.selectors.sliderHandle);
        
        // Get the bounding box of the slider
        const sliderBox = await slider.boundingBox();
        
        if (!sliderBox) {
            throw new Error('Slider not found');
        }

        // Calculate the position for the target value
        // Assuming the slider goes from 0 to 100
        const percentage = targetValue / 100;
        const targetX = sliderBox.x + (sliderBox.width * percentage);
        
        // Drag to the target position
        await slider.click();
        await this.page.mouse.move(targetX, sliderBox.y + sliderBox.height / 2);
        await this.page.mouse.down();
        await this.page.mouse.move(targetX, sliderBox.y + sliderBox.height / 2);
        await this.page.mouse.up();
    }

    async getSliderValue() {
        // Alternative method: get the value attribute
        const slider = this.page.locator(this.selectors.sliderHandle);
        const value = await slider.getAttribute('value');
        return parseInt(value, 10);
    }

    async validateSliderValue(expectedValue) {
        const actualValue = await this.getSliderValue();
        return actualValue === expectedValue;
    }
}

module.exports = { DragDropSlidersPage };