
if(localStorage.reminders != null) {
    var recordatorio = JSON.parse(localStorage.getItem('recordatorio'));
}
else {
    var recordatorio = [];
}

$(document).ready(function() {
    $(document).keypress(function(e) {
        if(e.which == 13) {
            $('#boton').click();
        }
    });


    var bton = $('#boton');
    var input = $('#recordar');
    var div = $('#container');
    var borrado = $('#borrar');
    completadas = 0;
    total = 0;


    if (localStorage.getItem('reminders') != null) {
        writeLocalStorage();
    }

    function writeLocalStorage() {
        var recordatorio = JSON.parse(localStorage.getItem('recordatorio'));
        for (var i = 0; i < recordatorio.length; i++) {
            div.append('<div id="eliminarTarea"><i class="fa-regular fa-circle"></i><i class="fa-solid fa-circle-minus"></i> <h2>' +recordatorio[i] + '</h2><h6>Prioridad <button id="low">Low</button><button id="normal">Normal</button><button id="high">High</button></h6></div>');
            total++;
            tareas();
        }
    }


    bton.click(function() {
        var recordatorio = input.val();
        div.append('<div id="eliminarTarea"><i class="fa-regular fa-circle"></i><i class="fa-solid fa-circle-minus"></i> <h2>' +recordatorio + '</h2><h6>Prioridad <button id="low">Low</button><button id="normal">Normal</button><button id="high">High</button><p> Añadido hace ' + Math.floor(Date.now() - new Date() )+'</p></h6></div>');
        input.val('');
        total++;
        tareas();
    }
    );    

    div.on('click', '.fa-circle-minus', function() {
        $(this).parent().remove();
        total--;
        tareas();
    });


    div.on('click', '.fa-circle', function() {
        $(this).toggleClass('fa-circle fa-check-circle');
        $(this).siblings("h2").toggleClass('tachado');
        completadas++;
        tareas();
    });

    div.on('click', '.fa-check-circle', function() {
        $(this).toggleClass('fa-check-circle fa-circle');
        $(this).siblings("h2").toggleClass('tachado');
        completadas--;
        tareas();
    });

    
    div.on('click', '#low', function() {
        $(this).toggleClass('low').css('background-color', 'green');
    });

    div.on('click', '#normal', function() {
        $(this).toggleClass('normal').css('background-color', 'blue');
    });

    div.on('click', '#high', function() {
        $(this).toggleClass('high').css('background-color', 'red');
    });


    div.on('click', '.low', function() {
        $(this).toggleClass('low').css('background-color', 'gray');
    });

    div.on('click', '.normal', function() {
        $(this).toggleClass('normal').css('background-color', 'gray');
    });

    div.on('click', '.high', function() {
        $(this).toggleClass('high').css('background-color', 'gray');
    });

    function tareas() {
        $("#pendientes").html(total - completadas);
        $("#total").html(total);
    }

    borrado.click(function() {
        div.empty();
        total = 0;
        completadas = 0;
        tareas();
    });


});