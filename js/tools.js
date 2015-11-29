var appModule = (function () {
 
  var users = [];
 
  function changeButtonIcon(classToRemove, classToAdd) {
    $('.btn-create').find('i').removeClass(classToRemove).addClass(classToAdd);
  }

  return {
    init: function() {
      // Executa quando clicar em botao de editar usuario
      $('.btn-create').on('click', function(e) {
          e.preventDefault();
          var qty = parseInt($('#users_qty').val());
          if (qty > 0 ) {
              appModule.createUsersList(qty);
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
          appModule.removeUser(this);
      });

      // Executa quando clica Enter dentro do input de qty de usuarios
      $('#form_create_users').on('submit', function(e) {
          e.preventDefault();
          var qty = parseInt($('#users_qty').val());
          if (qty > 0 ) {
              appModule.createUsersList(qty);
          }
      });
    },
    
	// Cria lista de usuarios nova
	createUsersList: function(usersQty) {
      var self = this;

      // Altera icone de botao para loading
      changeButtonIcon('fa-user-plus', 'fa-spinner fa-pulse');

      $.ajax({
          url: 'http://api.randomuser.me/?results='+usersQty,
          dataType: 'json',
          success: function(data) {
              for(var i = 0; i < data.results.length; i++) {
                  self.setUser(data.results[i]);
              }

              // Retorna icone de users para botao
              changeButtonIcon('fa-spinner fa-pulse', 'fa-user-plus');
          }
      });
	}
  };
})();

$(function() {
  appModule.init();
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

		// Altera icone de botao para loading
		$('.btn-create').find('i').removeClass('fa-user-plus').addClass('fa-spinner fa-pulse');

		$.ajax({
			url: 'http://api.randomuser.me/?results='+usersQty,
			dataType: 'json',
			success: function(data) {
				for(var i = 0; i < data.results.length; i++) {
					self.setUser(data.results[i]);
				}

				// Retorna icone de users para botao
				$('.btn-create').find('i').removeClass('fa-spinner fa-pulse').addClass('fa-user-plus');
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
			'<div class="col-xs-12 col-md-8">' +
				'<img src="{{ user.picture.thumbnail }}" class="rounded-face"><span>{{ user.name.first }} {{ user.name.last }}</span>' +
			'</div>' +
			'<div class="col-xs-12 col-md-4 actions">' +
				'<a href="#" class="button btn-edit" title="Editar"><i class="fa fa-pencil-square-o"></i> Editar</a>' +
	        	'<a href="#" class="button btn-remove" title="Remover"><i class="fa fa-times"></i> Excluir</a>' +
			'</div>' +
		'</div>';
	};
}