import { pull } from 'lodash';

export default {
    setState(newData){
        this.data = Object.assign({}, this.data, newData);
        this.callbacks.forEach(callback => {
            callback();
        });
    },
    callbacks:[],
    data:{
        leagues: [
            {
                name: 'Bob',
                players: []
            }
        ]
    },
    addCallback(cb){
        this.callbacks.push(cb);
        cb();
    },
    removeCallback(cb){
        pull(this.callbacks, cb);
    },
}
