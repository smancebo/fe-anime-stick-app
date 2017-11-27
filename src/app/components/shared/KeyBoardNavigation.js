
import {EventEmitter} from 'events'

class KeyBoardNavigation extends EventEmitter {
    index = 0;
    columns = 4;

    navigate (childrens, event, focusSelector) {

          

            //Right Arrow
            if (event.keyCode === 39) {
                this.index += 1;
                if (this.index >= childrens) {
                    this.index = childrens - 1;
                } 
                return;
            }

            //Left Arrow
            if (event.keyCode === 37) {
                this.index -= 1;
                if (this.index <= 0) {
                    this.index = 0;
                } 
                return;
            }

            //Up Key
            if (event.keyCode === 38) {
                this.index -= this.columns;
                if (this.index <= 0) {
                    this.index = 0;
                    // this.index += this.columns;
                    this.emit('onLastUp')
                } 
                event.preventDefault();
                return;
            }

            //Down Key
            if (event.keyCode === 40) {

                this.index += this.columns;
                if (this.index > childrens) {
                    this.index -= this.columns;
                    this.emit('onLastDown')
                } 

                event.preventDefault();
                return;
            }

            if (!event.keyCode === 13) {
                event.preventDefault();
            }
    }
    reset(){
        this.index = 0;
    }
    setColumns(columns) {
        this.columns = columns; 
    }
}

export default new KeyBoardNavigation()

