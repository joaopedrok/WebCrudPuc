$(function() {
	//Executa quando clicar em botao de editar usuario
	$('.btn-create').on('click', function(e) {
		e.preventDefault();
		alert('criar');
	});

	//Executa quando clicar em botao de editar usuario
	$('.btn-edit').on('click', function(e) {
		e.preventDefault();

		var $row = $(this).parent().parent();
		alert('Editar usuario de ID ' + $row.data('userid'));
	});

	//Executa quando clicar em botao de remover usuario
	$('.btn-remove').on('click', function(e) {
		e.preventDefault();

		var $row = $(this).parent().parent();
		alert('Remover usuario de ID ' + $row.data('userid'));
	});
});

var isParentOdd = function(){
	return $(".row").length % 2 == 0 ? '' : ' odd';
}

var templateUsers = function() {
	var template = 
	'{{#results}}' +
	'<div class="row' + isParentOdd() + '" data-userid="{{ registered }}">' +
		'<div class="col-xs-8">' +
			'<span>{{ user.name.first }} {{ user.name.last }}</span>' +
		'</div>' +
		'<div class="col-xs-4 text-right">' +
			'<a href="#" class="button btn-edit" title="Editar"><i class="fa fa-pencil-square-o"></i> Editar</a>' +
        	'<a href="#" class="button btn-remove" title="Remover"><i class="fa fa-times"></i> Excluir</a>' +
		'</div>' +
	'</div>' +
	'{{/results}}';
	return template;
}

var qtUsers = function(){
	return parseInt($('qtUsers').text().trim());
}

for (var i = 0; i < qtUsers; i++) {
	$.ajax({
	url: 'https://randomuser.me/api/',
	dataType: 'json',
	// data: '', // to send to 
	success: function(data) {
		//console.dir(data);
		console.log(isParentOdd());
		/* global Mustache */
		var rendered = Mustache.render(templateUsers(), data);
		$('#users_list').append(rendered);
	}
});
}

// proper case string prptotype (JScript 5.5+)
String.prototype.toProperCase = function() {
  return this.toLowerCase().replace(/^(.)|\s(.)/g, 
      function($1) { return $1.toUpperCase(); });
};