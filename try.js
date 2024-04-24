let obj = {
    name:'ali',
    clc : function(){
        const hh =()=>{
        console.log(this)
        }
        hh()
    },
    arrow: ()=>{
        console.log(this)
    }
}
console.log(obj.clc())