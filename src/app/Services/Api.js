import {get} from 'axios';
import config from '../config/config';

export default class Api {
    static search(text){
        return get(`${config.API}/search/${text}`);
    }
    static getEpisodes(link) {
        return get(`${config.API}/episodes/${link}`);
    }
    static getVideo(link) {
        return get(`${config.API}/view/${link}`);
    }
}