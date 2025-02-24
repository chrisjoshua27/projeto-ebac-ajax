$(document).ready(async function () {
    const githubUsername = 'chrisjoshua27'; 
    const endpoint = `https://api.github.com/users/${githubUsername}`;

    console.log("🔄 Buscando dados do GitHub...");

    $('#profile-name').text('Carregando...');
    $('#profile-username').text('@Carregando...');
    $('#repo-count').text('...');
    $('#followers-count').text('...');
    $('#following-count').text('...');
    $('#github-link').attr('href', '#');

    try {
        const resposta = await fetch(endpoint);

        if (!resposta.ok) {
            if (resposta.status === 403) {
                throw new Error('Limite de requisições excedido. Tente novamente mais tarde.');
            }
            throw new Error('Usuário não encontrado no GitHub.');
        }

        const usuario = await resposta.json();
        console.log("✅ Dados recebidos:", usuario);

        $('#profile-avatar').attr('src', usuario.avatar_url || 'https://via.placeholder.com/180x180');
        $('#profile-name').text(usuario.name || 'Nome não disponível');
        $('#profile-username').text(`@${usuario.login}`);
        $('#repo-count').text(usuario.public_repos ?? '0');
        $('#followers-count').text(usuario.followers ?? '0');
        $('#following-count').text(usuario.following ?? '0');
        $('#github-link').attr('href', usuario.html_url);

    } catch (erro) {
        console.error("❌ Erro ao carregar perfil:", erro);
        alert(`Erro ao carregar perfil do GitHub: ${erro.message}`);
        $('#profile-name').text('Erro ao carregar');
        $('#profile-username').text('@Erro');
        $('#repo-count, #followers-count, #following-count').text('0');
    }
});
