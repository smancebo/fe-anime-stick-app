
import React from 'react';


export default class CachedComponent extends React.Component
{
    constructor(props){
        super(props);
        this.state = {}
    }
    saveCache(){
        const name = this.constructor.name;
        sessionStorage.setItem(name, JSON.stringify(this.state));
    }
    restoreCache(){
        const name = this.constructor.name;
        const cache = JSON.parse(sessionStorage.getItem(name));
        if(cache){
            this.setState(cache);
            if(this.onCacheRestored) this.onCacheRestored(cache);
        }
    }
    clearCache(){
        const name = this.constructor.name;
        sessionStorage.removeItem(name);
    }
}