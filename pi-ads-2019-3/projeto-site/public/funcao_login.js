function logar(){

if(Usuario.value == 'Vinicius' ||
    Usuario.value == 'Lucas' ||
    Usuario.value == 'Rubens' ||
    Usuario.value == 'Bruno' ||
    Usuario.value == 'Paulo' ||
    Usuario.value == 'Iago' &&
    Senha.value == '12345'
) {
    div1.innerHTML = `Login efetuado com sucesso!!`;
}
}