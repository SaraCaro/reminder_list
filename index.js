const { createApp } = Vue

createApp({
    data() {
    return {
        recordatorios:[
            {
                id: 1,
                titulo: "Ir al medico",
                prioridad: 0,
                realizada: false
            },
            {   
                id: 2,
                titulo: "Hacer la compra",
                prioridad: 0,
                realizada: false
            },
            {
                id: 3,
                titulo: "Prueba 3",
                prioridad: 0,
                realizada: false
            }
        ],
        campoFiltro: "",
        texto: ""
    }
    },
    methods: {
        nuevaEntrada(){
            notaIndividual = {
                titulo: this.texto,
                prioridad: 0,
                realizada: false
            }
            this.recordatorios.push(notaIndividual);
            this.texto = "";
        },

        borrarCompletadas(){
            let tareas = this.recordatorios.filter((ent) => !ent.realizada)
            this.recordatorios = tareas;
        },

        eliminarTarea(recordatorio){
            let index = this.recordatorios.indexOf(recordatorio);
            this.recordatorios.splice(index,1);
         }
    },
    computed:{
        totalTareas(){
            return this.recordatorios.length;
        },

        completadas(){
            return this.recordatorios.filter((record)=> record.realizada==false).length;
        },

        recordatoriosFiltrados(){
            arrayFilt = this.recordatorios.filter((ent)=> ent.titulo.includes(this.campoFiltro));
            return arrayFilt.sort(function(a,b){
                return b.prioridad - a.prioridad;
            });
        },

        palabraFiltrada(){
            return this.recordatorios.filter((ent)=> ent.titulo.includes(this.campoFiltro));
        }
    }
}).mount('#app')



