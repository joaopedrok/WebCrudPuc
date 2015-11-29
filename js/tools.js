var appModule = (function () {
 
  var users = [];
  
  // Layout da linha da tabela
  var rowTemplate = '<div class="row" id="user_{{ user.registered }}" data-userid="{{ user.registered }}">' +
          '<div class="col-xs-12 col-md-8">' +
              '<img src="{{ user.picture.thumbnail }}" class="rounded-face"><span class="name">{{ user.name.first }} {{ user.name.last }}</span>' +
          '</div>' +
          '<div class="col-xs-12 col-md-4 actions">' +
              '<a href="#" class="button btn-edit" title="Editar"><i class="fa fa-pencil-square-o"></i> Editar</a>' +
              '<a href="#" class="button btn-remove" title="Remover"><i class="fa fa-times"></i> Excluir</a>' +
          '</div>' +
      '</div>';
      
  // Salva usuario no banco
  function setUser(userData) {
    //TODO Salvar usuario no banco
    users.push(userData.user);
  }
  
  // Remove usuario da lista
  function removeUser(element) {
    //TODO Remove usuario no banco
    var $row = $(element).parent().parent(),
        userId = $row.data('userid');

    for (var i = 0; users.length; i++) {
      if (users[i].registered === userId) {
        users.splice(i, 1);
        break;
      }
    }
    
    $row.addClass('removed-item');
    
    window.setTimeout(function(){ $row.remove(); }, 600);
    updateUsersCount();
  }
  
  // Altera icone do botao
  function changeButtonIcon(classToRemove, classToAdd) {
    $('.btn-create').find('i').removeClass(classToRemove).addClass(classToAdd);
  }
  
  // Adiciona linha na tabela de usuarios
  function addListRow(userData) {
    var tableRow = Mustache.render(rowTemplate, userData);
    $('#users_list').append(tableRow);
  }

  // Atualiza contador de usuarios na tela
  function updateUsersCount() {
    var qty = users.length;
    $('#users_count').html(qty + ' usuário(s)');
  }
  
  // Abre modal de edicao de dados
  function openEditModal(userId) {
    var userData;
    
    $("body").addClass("modal-open");
    $('#overlay').removeClass('hide');
    $('#ui_modal').removeClass('hide');
    
    for (var i = 0; users.length; i++) {
      if (users[i].registered === userId) {
        userData = users[i];
        break;
      }
    }
    
    var template = $('#template_edit_form').html();
    Mustache.parse(template);
    var rendered = Mustache.render(template, userData);
    $('#ui_modal').find('.ui-modal-content').html(rendered);
  }
  
  // Fecha modal de edicao de dados
  function closeEditModal() {
    $("body").removeClass("modal-open");
    $('#overlay').addClass('hide');
    $('#ui_modal').addClass('hide');
  }
  
  // Envia dados do form de edicao
  function sendEditForm() {
    var userIndex,
        uiModal = $('#ui_modal'),
        userId = parseFloat(uiModal.find('.user-id').html());
    
    for (var i = 0; users.length; i++) {
      if (users[i].registered === userId) {
        userIndex = i;
        break;
      }
    }
    
    users[i].name.title = uiModal.find('input[name=name_title]').val();
    users[i].name.first = uiModal.find('input[name=name_first]').val();
    users[i].name.last = uiModal.find('input[name=name_last]').val();
    users[i].username = uiModal.find('input[name=username]').val();
    users[i].email = uiModal.find('input[name=email]').val();
    users[i].location.street = uiModal.find('input[name=street]').val();
    users[i].location.city = uiModal.find('input[name=city]').val();
    users[i].location.state = uiModal.find('input[name=state]').val();
    users[i].location.zip = uiModal.find('input[name=zip]').val();
    users[i].phone = uiModal.find('input[name=phone]').val();
    users[i].cell = uiModal.find('input[name=cell]').val();
    
    updateUserDatabase(users[i]);
    
    // Atualiza nome do usuario na tabela
    $('#user_'+userId).find('.name').html(users[i].name.first+ ' '+users[i].name.last);
    closeEditModal();
  }
  
  // Atualiza dados do usuario no banco
  function updateUserDatabase(userData) {
    //TODO Atualizar os dados do usuario no banco
  }
  
  // Cria lista de usuarios nova
  function createUsersList(usersQty) {
    // Altera icone de botao para loading
    changeButtonIcon('fa-user-plus', 'fa-spinner fa-pulse');

    $.ajax({
        url: 'http://api.randomuser.me/?results='+usersQty,
        dataType: 'json',
        success: function(data) {
            for(var i = 0; i < data.results.length; i++) {
                setUser(data.results[i]);
                addListRow(data.results[i]);
            }

            updateUsersCount();

            // Retorna icone de users para botao
            changeButtonIcon('fa-spinner fa-pulse', 'fa-user-plus');
        }
    });
  }
  
  // Ativa listeners nos botoes da tela
  function bindElements() {
      // Executa quando clicar em botao de editar usuario
      $('.btn-create').on('click', function(e) {
          e.preventDefault();
          var qty = parseInt($('#users_qty').val());
          if (qty > 0 ) {
              createUsersList(qty);
          }
      });

      // Fecha modal de edicao
      $('.ui-btn-close').on('click', function(e) {
        closeEditModal();
      });
      
      // Envia dados do form de edicao
      $('#btn_send_edit_form').on('click', function(e) {
        sendEditForm();
      });
      
      // Executa quando clicar em botao de editar usuario
      $('#users_list').on('click', '.btn-edit', function(e) {
          e.preventDefault();

          var $row = $(this).parent().parent();
          
          openEditModal($row.data('userid'));
      });

      // Executa quando clicar em botao de remover usuario
      $('#users_list').on('click', '.btn-remove', function(e) {
          e.preventDefault();
          removeUser(this);
      });

      // Executa quando clica Enter dentro do input de qty de usuarios
      $('#form_create_users').on('submit', function(e) {
          e.preventDefault();
          var qty = parseInt($('#users_qty').val());
          if (qty > 0 ) {
              createUsersList(qty);
          }
      });
  }

  return {
    init: function() {
      bindElements();
    }
  };
})();

$(function() {
  appModule.init();
});