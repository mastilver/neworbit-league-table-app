import { pull } from 'lodash';

export default {

    setState(newData){
        this.data = Object.assign({}, this.data, newData);
        this.callbacks.forEach(callback => {
            callback();
        });
        window.localStorage.setItem('leagues-data', JSON.stringify(this.data));
    },
    callbacks:[],
    data: JSON.parse(window.localStorage.getItem('leagues-data')) || {
        leagues: []
    },
    addCallback(cb){
        this.callbacks.push(cb);
        cb();
    },
    removeCallback(cb){
        pull(this.callbacks, cb);
    },
}
