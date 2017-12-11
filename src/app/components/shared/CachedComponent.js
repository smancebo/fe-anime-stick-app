
import React from 'react';


export default class CachedComponent extends React.Component
{
    constructor(props){
        super(props);
        this.state = {}
        this.storage = sessionStorage;
    }
    saveCache(name){
        //const name = this.constructor.name;
        this.storage.setItem(name, JSON.stringify(this.state));
    }
    restoreCache(name){
        //const name = this.constructor.name;
        const cache = JSON.parse(this.storage.getItem(name));
        if(cache){
            this.setState(cache);
            if(this.onCacheRestored) this.onCacheRestored(cache);
        }
    }
    clearCache(){
        const name = this.constructor.name;
        this.storage.removeItem(name);
    }
}