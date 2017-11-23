
import {EventEmitter} from 'events'

class KeyBoardNavigation extends EventEmitter {
    index = 0;
    columns = 4;

    navigate (children, event, focusSelector) {

            const focusChild = (indx) => {
                //children[indx].querySelector(focusSelector).focus();
            }

            //Right Arrow
            if (event.keyCode === 39) {
                this.index += 1;
                if (this.index < children.length) {
                    focusChild(this.index);
                } else {
                    this.index = children.length - 1;
                }
                return;
            }

            //Left Arrow
            if (event.keyCode === 37) {
                this.index -= 1;
                if (this.index >= 0) {
                    focusChild(this.index);
                } else {
                    this.index = 0;
                }
                return;
            }

            //Up Key
            if (event.keyCode === 38) {
                this.index -= this.columns;
                if (this.index >= 0) {
                    focusChild(this.index)
                } else {
                    //this.index = 0;
                    this.index += this.columns;
                    this.emit('onLastUp')
                }
                event.preventDefault();
                return;
            }

            //Down Key
            if (event.keyCode === 40) {

                this.index += this.columns;
                if (this.index < children.length) {
                    focusChild(this.index);
                } else {
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

