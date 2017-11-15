import {get} from 'axios';
import config from '../config/config';

export default class Api {
    static  search(text){
        return get(`${config.API}/search/${text}`);
    }
}