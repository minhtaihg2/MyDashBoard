Translation = [{
    "id": "Log In",
    "translation": "Autenticação"
}, {
    "id": "Personal data",
    "translation": "Dados pessoais"
}, {
    "id": "Identification",
    "translation": "Identificação"
}, {
    "id": "Name",
    "translation": "Nome"
}, {
    "id": "VAT number",
    "translation": "NIF"
}, {
    "id": "Civil ID",
    "translation": "BI ou CC"
}, {
    "id": "Sex",
    "translation": "Sexo"
}, {
    "id": "Male",
    "translation": "Masculino"
}, {
    "id": "Female",
    "translation": "Feminino"
}, {
    "id": "Telephone numbers",
    "translation": "Números de telefone"
}, {
    "id": "Telephone",
    "translation": "Telefone"
}, {
    "id": "Mobile",
    "translation": "Telemóvel"
}, {
    "id": "Postal address",
    "translation": "Endereço postal"
}, {
    "id": "Address",
    "translation": "Morada"
}, {
    "id": "Location",
    "translation": "Localidade"
}, {
    "id": "Zip code",
    "translation": "Cód. postal"
}, {
    "id": "Save",
    "translation": "Gravar"
}, {
    "id": 'Sign into your account',
    "translation": "Use os dados da sua conta"
}, {
    "id": 'user',
    "translation": "email"
}, {
    "id": 'Password',
    "translation": "Senha"
}, {
    "id": 'Choose photo',
    "translation": "Alterar fotografia"
}, {
    "id": 'Change password',
    "translation": "Alterar a senha"
}, {
    "id": 'New password',
    "translation": "Nova senha"
}, {
    "id": 'New password (repeat)',
    "translation": "Nova senha (repita)"
}, {
    "id": 'Remember me',
    "translation": "Estou no meu computador"
}, {
    "id": 'Forgot Password?',
    "translation": "Não se lembra da senha?"
}, {
    "id": 'Login',
    "translation": "Entrar"
}, {
    "id": 'Login with Facebook',
    "translation": "Usar a conta do Facebook"
}, {
    "id": 'Create Account',
    "translation": "Criar uma nova conta"
}, {
    "id": 'User Registration',
    "translation": 'Registo de um novo utilizador'
}, {
    "id": 'Create an account',
    "translation": 'Criar uma nova conta'
}, {
    "id": 'Fullname',
    "translation": 'Primeiro e último nome'
}, {
    "id": 'user@example.com',
    "translation": 'nome@servidor.com'
}, {
    "id": 'Success',
    "translation": 'Sucesso'
}, {
    "id": 'Your photo has been uploaded',
    "translation": 'A sua fotografia foi carregada com sucesso'
}, {
    "id": 'Signup',
    "translation": 'Registar'
}, {
    "id": 'Login',
    "translation": 'Entrar'
}, {
    "id": 'Logout',
    "translation": 'Sair'
}, {
    "id": 'Close',
    "translation": 'Fechar'
}, {
    "id": 'Reset Password',
    "translation": 'Reposição da senha'
}, {
    "id": 'The minimum are {0} characters',
    "translation": 'Use pelo menos {0} carateres'
}, {
    "id": 'Enter your email address for further reset instructions',
    "translation": 'Indique o seu email para receber as indicações necessárias'
}, {
    "id": 'Request password',
    "translation": 'Pedir nova senha'
}, {
    "id": 'Close',
    "translation": 'Fechar'
}, {
    "id": 'Close',
    "translation": 'Fechar'
}, {
    "id": 'Layers',
    "translation": 'Camadas'
}, {
    "id": 'Search',
    "translation": 'Procurar'
}, {
    "id": 'Error starting session',
    "translation": 'Erro de autenticação'
}, {
    "id": 'Invalid user or password',
    "translation": 'O email ou a senha não estão corretos.<br/>Certifique-se que já se registou e validou o email.<br/>Se for necessário, pode repor a senha'
}, {
    "id": 'Draw',
    "translation": 'Desenhar'
}, {
    "id": 'Point',
    "translation": 'Ponto'
}, {
    "id": 'Line',
    "translation": 'Linha'
}, {
    "id": 'Polygon',
    "translation": 'Polígono'
}, {
    "id": 'Circle',
    "translation": 'Círculo'
}, {
    "id": 'Square',
    "translation": 'Quadrado'
}, {
    "id": 'Box',
    "translation": 'Caixa'
}, {
    "id": 'Select/Modify',
    "translation": 'Selecionar/Editar'
}, {
    "id": 'Remove last',
    "translation": 'Apagar último'
}, {
    "id": 'Remove all',
    "translation": 'Apagar tudo'
}, {
    "id": 'PDF document',
    "translation": 'Documento para impressão'
}, {
    "id": 'Download',
    "translation": 'Descarregar'
}];

String.prototype.translate = function() {
    var s = this.valueOf();
    // console.log('TRANSLATE: ' + s);
    var t = {},
        i = 0,
        n = Translation.length;
    while (i < n) {
        t = Translation[i];
        // console.log(t);
        if (t.id == s) {
            return t.translation;
        }
        i++;
    }
    return s;
};