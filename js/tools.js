$(function() {
	// Cria objeto de controle da pagina
	var indexCtrl = new indexController();

	// Executa quando clicar em botao de editar usuario
	$('.btn-create').on('click', function(e) {
		e.preventDefault();
		var qty = parseInt($('#users_qty').val());
		if (qty > 0 ) {
			indexCtrl.createUsersList(qty);
		}
	});

	// Executa quando clicar em botao de editar usuario
	$('.btn-edit').on('click', function(e) {
		e.preventDefault();

		var $row = $(this).parent().parent();
		alert('Editar usuario de ID ' + $row.data('userid'));
	});

	// Executa quando clicar em botao de remover usuario
	$('#users_list').on('click', '.btn-remove', function(e) {
		e.preventDefault();
		indexCtrl.removeUser(this);
	});

	// Executa quando clica Enter dentro do input de qty de usuarios
	$('#form_create_users').on('submit', function(e) {
		e.preventDefault();
		var qty = parseInt($('#users_qty').val());
		if (qty > 0 ) {
			indexCtrl.createUsersList(qty);
		}
	});

});

function indexController(){

	// Adiciona json de usuario no array
	this.setUser = function(user) {
		//TODO Salvar usuario no banco
		this.addListRow(user);
		this.updateUsersCount();
	};

	// Remove usuario da lista
	this.removeUser = function(element) {
		//TODO Remove usuario no banco

		var $row = $(element).parent().parent();
		$row.addClass('removed-item');

		window.setTimeout(function(){ $row.remove()}, 600);
		this.updateUsersCount();
	};

	// Cria lista de usuarios nova
	this.createUsersList = function(usersQty) {
		this.createUserFromAPI(usersQty);
	};

	// Cria novo usuario da API Random User
	this.createUserFromAPI = function(usersQty) {
		var self = this;

		$.ajax({
			url: 'http://api.randomuser.me/?results='+usersQty,
			dataType: 'json',
			success: function(data) {
				for(var i = 0; i < data.results.length; i++) {
					self.setUser(data.results[i]);
				}
			}
		});
	};

	// Adiciona linha na tabela de usuarios
	this.addListRow = function(user) {
		var tableRow = Mustache.render(this.rowTemplate(), user);
		$('#users_list').append(tableRow);
	};

	this.updateUsersCount = function() {
		var users = $('#users_list').find('.row').length;
		$('#users_count').html(users + ' usuário(s)');
	};

	// Layout da linha da tabela
	this.rowTemplate = function() {
		return '<div class="row" data-userid="{{ user.registered }}">' +
			'<div class="col-xs-8">' +
				'<img src="{{ user.picture.thumbnail }}" class="rounded-face"><span>{{ user.name.first }} {{ user.name.last }}</span>' +
			'</div>' +
			'<div class="col-xs-4 actions">' +
				'<a href="#" class="button btn-edit" title="Editar"><i class="fa fa-pencil-square-o"></i> Editar</a>' +
	        	'<a href="#" class="button btn-remove" title="Remover"><i class="fa fa-times"></i> Excluir</a>' +
			'</div>' +
		'</div>';
	};
}