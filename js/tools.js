$(function(){
	//Executa quando clicar em botao de editar usuario
	$('.btn-create').on('click', function(e){
		e.preventDefault();
		alert('criar');
	});

	//Executa quando clicar em botao de editar usuario
	$('.btn-edit').on('click', function(e){
		e.preventDefault();

		var $row = $(this).parent().parent();
		alert('Editar usuario de ID ' + $row.data('userid'));
	});

	//Executa quando clicar em botao de remover usuario
	$('.btn-remove').on('click', function(e){
		e.preventDefault();

		var $row = $(this).parent().parent();
		alert('Remover usuario de ID ' + $row.data('userid'));
	});
});