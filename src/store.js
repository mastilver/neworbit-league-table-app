import { pull } from 'lodash';

export default {
    setState(newData){
        this.data = Object.assign({}, this.data, newData);
        this.callbacks.map(callback=>{
            callback();
        });
    },
    callbacks:[],
    data:{},
    addCallback(cb){
        this.callbacks.push(cb);
    },
    removeCallback(cb){
        pull(this.callbacks, cb);
    },
}