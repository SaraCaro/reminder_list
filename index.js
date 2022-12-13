
var recordatorio;

$(document).ready(function() {
    $(document).keypress(function(e) {
        if(e.which == 13) {
            $('#boton').click();
        }
    });


    if(localStorage.recordatorio != null) {
         recordatorio = JSON.parse(localStorage.getItem('recordatorio'));
    }
    else {
         recordatorio = [];
    }


    var bton = $('#boton');
    var input = $('#recordar');
    var div = $('#container');
    var borrado = $('#borrar');
    completadas = 0;
    total = 0;


    if (localStorage.getItem('recordatorio') != null) {
        writeLocalStorage();
    }

    bton.click(function() {
        var recordatorioValor = input.val();
        div.append('<div id="eliminarTarea"><i class="fa-regular fa-circle"></i><i class="fa-solid fa-circle-minus"></i> <h2>' + recordatorioValor + '</h2><h6>Prioridad <button id="low">Low</button><button id="normal">Normal</button><button id="high">High</button><p> Añadido hace ' + Math.floor(Date.now() - new Date() )+'</p></h6></div>');
        input.val('');
        total++;
        tareas();
        recordatorio.push(recordatorioValor);
        localStorage.setItem('recordatorio', JSON.stringify(recordatorio));
    }
    );    

    div.on('click', '.fa-circle-minus', function() {
        $(this).parent().remove();

        var index = $(this).parent().index();
        console.log(index);
        recordatorio.splice(index, 1);
        localStorage.setItem('recordatorio', JSON.stringify(recordatorio));

        total = recordatorio.length;
        tareas();
    });


    div.on('click', '.fa-circle', function() {
        $(this).toggleClass('fa-circle fa-check-circle');
        $(this).siblings("h2").toggleClass('tachado');
        completadas++;
        tareas();
        localStorage.setItem('recordatorio', JSON.stringify(recordatorio));
    });

    div.on('click', '.fa-check-circle', function() {
        $(this).toggleClass('fa-check-circle fa-circle');
        $(this).siblings("h2").toggleClass('tachado');
        completadas--;
        tareas();
    });

    
    div.on('click', '#low', function() {
        $(this).toggleClass('selected');
        $(this).css('#normal, #high', 'not-selected');
    });

    div.on('click', '#normal', function() {
        $(this).toggleClass('selected');
        $(this).css('#low, #high', 'not-selected');
    });

    div.on('click', '#high', function() {
        $(this).toggleClass('selected');
        $(this).css('#normal, #low', 'not-selected');
    });


    function tareas() {
        $("#pendientes").html(total - completadas);
        $("#total").html(total);
    }

    borrado.click(function() {
        $('.fa-check-circle').parent().remove();
        total = 0;
        completadas = 0;
        tareas();
        
    });

    function writeLocalStorage() {
        var recordatorio = JSON.parse(localStorage.getItem('recordatorio'));
        var contenedor = $('#container');
        for (var i = 0; i < recordatorio.length; i++) {  
            var newReminder = $('<div id="eliminarTarea"><i class="fa-regular fa-circle"></i><i class="fa-solid fa-circle-minus"></i> <h2>' + recordatorio[i] + '</h2><h6>Prioridad <button id="low">Low</button><button id="normal">Normal</button><button id="high">High</button><p> Añadido hace ' + Math.floor(Date.now() - new Date() )+'</p></h6></div>');
            contenedor.append(newReminder);
            newReminder.show();
        }

    }


});