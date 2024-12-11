const HTTP_MESSAGES = {
  CHILD_CREATE_201_PT: 'Nova criança registrada com sucesso.',
  CHILD_CLIENT_404: 'No caregiver was found with the caregiverId.',
  CHILD_CLIENT_404_PT:
    'Não foi possível encontrar o responsável pela criança com a id informada.',
  CHILD_CREATE_500:
    'An error occurred while registering the child. Please check the error log for more information.',
  CHILD_CREATE_500_PT:
    'Um erro ocorreu ao registrar a criança. Por favor, indique o código PID para o time de desenvolvimento.',
  CHILD_DELETE_200_PT: 'Registro removido com sucesso.',
  CHILD_DELETE_500:
    'An error occurred while deleting the register. Please check the error log for more information.',
  CHILD_DELETE_500_PT:
    'Um erro ocorreu ao remover o registro. Por favor, indique o código PID para o time de desenvolvimento.',
  CHILD_FETCH_200_PT: 'Um registro foi encontrado.',
  CHILD_FETCH_404: 'No register was found.',
  CHILD_FETCH_404_PT: 'Nenhum registro foi encontrado.',
  CHILD_FETCH_500:
    'An error occurred while fetching the registered child. Please check the error log for more information.',
  CHILD_FETCH_500_PT:
    'Um erro ocorreu ao buscar o registro. Por favor, indique o código PID para o time de desenvolvimento.',
  CHILD_UPDATE_200_PT: 'Registro atualizado com sucesso.',
  CHILD_UPDATE_500:
    'An unexpected error occurred while updating the register. Please check the error log for more information.',
  CHILD_UPDATE_500_PT:
    'Um erro ocorreu ao atualizar o registro. Por favor, informe o código PID para o time de desenvolvimento.',
  CHILDREN_FETCH_200_PT: 'Lista de crianças registradas no sistema.',
  CHILDREN_FETCH_404: 'There are no registered children to show.',
  CHILDREN_FETCH_404_PT: 'Não há crianças registradas para exibir.',
  CHILDREN_FETCH_500:
    'An error occurred while fetching the registered children. Please check the error log for more information.',
  CHILDREN_FETCH_500_PT:
    'Um erro ocorreu ao buscar as crianças registradas no sistema. Por favor, indique o código PID para o time de desenvolvimento.',
  CONTRACT_CREATE_201_PT: 'Contrato gerado com sucesso.',
  CONTRACT_CREATE_500:
    'An unexpected error occurred while generating the contract. Please check the error log for more information.',
  CONTRACT_CREATE_500_PT:
    'Um erro inesperado ocorreu ao gerar o contrato. Por favor, indique o código PID para o time de desenvolvimento.',
  CONTRACT_DELETE_200_PT: 'Contrato removido com sucesso.',
  CONTRACT_DELETE_500:
    'An unexpected error occurred while deleting the contract. Please check the error log for more information.',
  CONTRACT_DELETE_500_PT:
    'Um erro inesperado ocorreu ao deletar o arquivo. Por favor, indique o código PID para o time de desenvolvimento.',
  CONTRACT_FETCH_200_PT: 'Contrato encontrado.',
  CONTRACT_FETCH_404:
    'No contract was found with this ID. Please check the error log for more information.',
  CONTRACT_FETCH_404_PT: 'Nenhum contrato foi encontrado.',
  CONTRACT_FETCH_500:
    'An error occurred while fetching the contract. Please check the error log for more information.',
  CONTRACT_FETCH_500_PT:
    'Um erro ocorreu ao buscar o contrato. Por favor, indique o código PID para o time de desenvolvimento.',
  CONTRACTS_FETCH_200_PT: 'Lista de contratos encontrados.',
  CONTRACTS_FETCH_404: 'There are no contracts to show.',
  CONTRACTS_FETCH_404_PT: 'Não há contratos para exibir.',
  CONTRACTS_FETCH_500:
    'An error occurred while fetching the contracts. Please check the error log for more information.',
  CONTRACTS_FETCH_500_PT:
    'Um erro ocorreu ao buscar os contratos. Por favor, indique o código PID para o time de desenvolvimento.',
  CONTRACT_UPDATE_200_PT: 'Contrato atualizado com sucesso.',
  CONTRACT_UPDATE_400:
    'At least one attribute needs to be changed in order to proceed with the request. ERROR: Argument data is missing.',
  CONTRACT_UPDATE_400_PT:
    'Ao menos um atributo precisa ser alterado para que a requisição prossiga.',
  CONTRACT_UPDATE_500:
    'An error occurred while updating the contract. Please check the error log for more information.',
  CONTRACT_UPDATE_500_PT:
    'Um erro ocorreu ao atualizar o contrato. Por favor, indique o código PID para o time de desenvolvimento.',
  CLIENT_CREATE_201_PT: 'Cliente criado(a) com sucesso.',
  CLIENT_CREATE_500:
    'An unexpected error occurred while creating the client. Please check the error log for more information.',
  CLIENT_CREATE_500_PT:
    'Um erro inesperado ocorreu ao criar o(a) cliente. Por favor, indique o código PID para o time de desenvolvimento.',
  CLIENT_FETCH_200_PT: 'Cliente encontrado(a) com sucesso.',
  CLIENT_FETCH_404: 'Client not found.',
  CLIENT_FETCH_404_PT: 'Cliente não encontrado(a).',
  CLIENT_DELETE_200_PT: 'Cliente removido(a) com sucesso.',
  CLIENT_DELETE_500:
    'An unexpected error occurred while deleting the client. Please check the error log for more information.',
  CLIENT_DELETE_500_PT:
    'Um erro inesperado ocorreu ao deletar o(a) cliente. Por favor, indique o código PID para o time de desenvolvimento.',
  CLIENT_UPDATE_200_PT: 'Cliente atualizado(a) com sucesso.',
  CLIENT_UPDATE_500:
    'An error occurred while updating the client. Please check the error log for more information.',
  CLIENT_UPDATE_500_PT:
    'Um erro inesperado ocorreu ao atualizar o(a) cliente. Por favor, indique o código PID para o time de desenvolvimento.',
  CLIENTS_FETCH_200_PT: 'Lista de clientes encontrados.',
  CLIENTS_FETCH_404: 'There are no clients to show.',
  CLIENTS_FETCH_404_PT: 'Não há clientes para exibir.',
  CPF_RG_409:
    'CPF and/or RG are already in the database. The need to be unique.',
  CPF_RG_409_PT: 'CPF e/ou RG já estão cadastrados no sistema.',
  EMAIL_409: 'This email has already been used.',
  EMAIL_409_PT: 'Este email já foi utilizado.',
  EVENT_CREATE_201_PT: 'Evento criado com sucesso.',
  EVENT_CREATE_500:
    'An unexpected error occurred while creating the event. Please check the error log for more information.',
  EVENT_CREATE_500_PT:
    'Um erro inesperado ocorreu ao criar o evento. Por favor, indique o código PID para o time de desenvolvimento.',
  EVENT_FETCH_200_PT: 'Evento encontrado com sucesso.',
  EVENT_FETCH_404: 'No event was found with this id.',
  EVENT_FETCH_404_PT: 'Nenhum evento foi encontrado.',
  EVENT_FETCH_500:
    'An error occurred while fetching the event. Please check the error log for more information.',
  EVENT_FETCH_500_PT:
    'Um erro ocorreu ao buscar o evento. Por favor, indique o código PID para o time de desenvolvimento.',
  EVENT_UPDATE_200_PT: 'Evento atualizado com sucesso.',
  EVENT_UPDATE_500:
    'An unexpected error occurred while updating the event. Please check the error log for more information.',
  EVENT_UPDATE_500_PT:
    'Um erro inesperado ocorreu ao atualizar o evento. Por favor, indique o código PID para o time de desenvolvimento.',
  EVENT_DELETE_200_PT: 'Evento removido com sucesso.',
  EVENT_DELETE_500:
    'An unexpected error occurred while deleting the event. Please check the error log for more information.',
  EVENT_DELETE_500_PT:
    'Um erro inesperado ocorreu ao remover o evento. Por favor, indique o código PID para o time de desenvolvimento.',
  EVENTS_FETCH_200_PT: 'Eventos encontrados com sucesso',
  EVENTS_FETCH_404: 'There are no events to show.',
  EVENTS_FETCH_404_PT: 'Não há eventos para exibir.',
  EVENTS_FETCH_500:
    'An unexpected error occurred while fetching the events. Please check the error log for more information.',
  EVENTS_FETCH_500_PT:
    'Um erro inesperado ocorreu ao buscar a lista de usuários. Por favor, informe o código PID para o time de desenvolvimento.',
  EXPENSECATEGORY_CREATE_201_PT: 'Categoria criada com sucesso.',
  EXPENSECATEGORY_CREATE_500:
    'An unexpected error occurred while creating the category. Please check the error log for more information.',
  EXPENSECATEGORY_CREATE_500_PT:
    'Um erro inesperado ocorreu ao criar a categoria. Por favor, indique o código PID para o time de desenvolvimento.',
  EXPENSECATEGORIES_FETCH_200_PT: 'Lista de categorias encontradas.',
  EXPENSECATEGORIES_FETCH_404: 'There are no categories to show.',
  EXPENSECATEGORIES_FETCH_404_PT: 'Não foram encontradas categorias',
  EXPENSECATEGORIES_FETCH_500:
    'An unexpected error occurred while fetching the category. Please check the error log for more information.',
  EXPENSECATEGORIES_FETCH_500_PT:
    'Um erro inesperado ocorreu ao buscar a categoria. Por favor, indique o código PID para o time de desenvolvimento.',
  EXPENSECATEGORY_FETCH_200_PT: 'Categoria encontrada com sucesso.',
  EXPENSECATEGORY_FETCH_404: 'The category was not found.',
  EXPENSECATEGORY_FETCH_404_PT: 'A categoria não foi encontrada.',
  EXPENSECATEGORY_FETCH_500:
    'An unexpected error occurred while fetching the category. Please check the error log for more information.',
  EXPENSECATEGORY_FETCH_500_PT:
    'Um erro inesperado ocorreu ao buscar a categoria. Por favor, indique o código PID para o time de desenvolvimento.',
  EXPENSECATEGORY_UPDATE_200_PT: 'Categoria atualizada com sucesso.',
  EXPENSECATEGORY_UPDATE_500:
    'An unexpected error occurred while updating the category. Please check the error log for more information.',
  EXPENSECATEGORY_UPDATE_500_PT:
    'Um erro inesperado ocorreu ao atualizar a categoria. Por favor, indique o código PID para o time de desenvolvimento.',
  EXPENSECATEGORY_DELETE_200_PT: 'Categoria removida com sucesso.',
  EXPENSECATEGORY_DELETE_500:
    'An unexpected error occurred while deleting the category. Please check the error log for more information.',
  EXPENSECATEGORY_DELETE_500_PT:
    'Um erro inesperado ocorreu ao deletar a categoria. Por favor, indique o código PID para o time de desenvolvimento.',
  EXTRASERVICE_ADD_200_PT: 'Serviço adicionado com sucesso.',
  EXTRASERVICE_ADD_400: 'Please check the contractId and extraServiceId',
  EXTRASERVICE_ADD_400_PT: 'Por favor, cheque contractId e extraServiceId.',
  EXTRASERVICE_ADD_500:
    'An unexpected error occurred while adding the extra service. Please check the error log for more information.',
  EXTRASERVICE_ADD_500_PT:
    'Um erro inesperado ocorreu ao adicionar o serviço. Por favor, indique o código PID para o time de desenvolvimento.',
  EXTRASERVICE_REMOVE_200_PT: 'Serviço removido com sucesso.',
  EXTRASERVICE_REMOVE_404:
    'No extra service with this ID was added to this contract.',
  EXTRASERVICE_REMOVE_404_PT:
    'Nenhum serviço extra foi encontrado com esta ID neste contrato.',
  EXTRASERVICE_REMOVE_500:
    'An unexpected error occurred while removing the extra service. Please check the error log for more information.',
  EXTRASERVICE_REMOVE_500_PT:
    'Um erro inesperado ocorreu ao remover o serviço. Por favor, indique o código PID para o time de desenvolvimento.',
  EXTRASERVICE_CREATE_201_PT: 'Serviço criado com sucesso.',
  EXTRASERVICE_CREATE_500:
    'An unexpected error occurred while creating the service. Please check the error log for more information.',
  EXTRASERVICE_CREATE_500_PT:
    'Um erro inesperado ocorreu ao criar o serviço. Por favor, indique o código PID para o time de desenvolvimento.',
  EXTRASERVICES_FETCH_200_PT: 'Lista de serviços encontrados.',
  EXTRASERVICES_FETCH_404: 'No extra services were found.',
  EXTRASERVICES_FETCH_404_PT: 'Não há serviços para exibir.',
  EXTRASERVICES_FETCH_500:
    'An error occurred while fetching the service list. Please check the error log for more information.',
  EXTRASERVICES_FETCH_500_PT:
    'Um erro occorreu ao buscar a lista de serviços. Por favor, indique o código PID para o time de desenvolvimento.',
  EXTRASERVICE_FETCH_200_PT: 'Serviço encontrado com sucesso.',
  EXTRASERVICE_FETCH_404: 'Service not found.',
  EXTRASERVICE_FETCH_404_PT: 'Serviço não encontrado.',
  EXTRASERVICE_FETCH_500:
    'An error occurred while fetching the service. Please check the error log for more information.',
  EXTRASERVICE_FETCH_500_PT:
    'Um erro occorreu ao buscar o serviço. Por favor, indique o código PID para o time de desenvolvimento.',
  EXTRASERVICE_UPDATE_200_PT: 'Serviço atualizado com sucesso.',
  EXTRASERVICE_UPDATE_500:
    'An unexpected error occurred while updating the service. Please check the error log for more information.',
  EXTRASERVICE_UPDATE_500_PT:
    'Um erro inesperado ocorreu ao atualizar o serviço. Por favor, indique o código PID para o time de desenvolvimento.',
  EXTRASERVICE_DELETE_200_PT: 'Serviço removido com sucesso.',
  EXTRASERVICE_DELETE_500:
    'An unexpected error occurred while deleting the service. Please check the error log for more information.',
  EXTRASERVICE_DELETE_500_PT:
    'Um erro inesperado ocorreu ao remover o serviço. Por favor, indique o código PID para o time de desenvolvimento.',
  FILTERS_500:
    'An unexpected error occurred while processing the request. Please check the error log for more information.',
  FILTERS_500_PT:
    'Um erro inesperado ocorreu ao processar a solicitação. Por favor, indique o código PID para o time de desenvolvimento.',
  FILTERS_CLIENTS_200_PT: 'Total de clientes encontrados.',
  FILTERS_CONTRACTS_200_PT: 'Total de contratos encontrados.',
  FILTERS_CONTRACTS_PACKAGE_400:
    'The package does not exist or it is typed incorrectly.',
  FILTERS_CONTRACTS_PACKAGE_400_PT:
    'O nome do pacote está incorreto ou o pacote não existe.',
  FILTERS_FINANCES_200_PT: 'Requisição processada com sucesso',
  FILTERS_FINANCES_TYPE_400:
    'The type does not exist or there are no registers.',
  FILTERS_FINANCES_TYPE_400_PT:
    'O tipo está incorreto ou não existem registros.',
  FILTERS_FINANCES_TYPE_404:
    'The type does not exist or there are no registers.',
  FILTERS_FINANCES_TYPE_404_PT:
    'O tipo está incorreto ou não existem registros.',
  FILTERS_FINANCES_YEAR_404:
    'The year does not exist or there are no registers.',
  FILTERS_FINANCES_YEAR_404_PT:
    'O ano está incorreto ou não existem registros.',
  FILTERS_FINANCES_404: 'No registers were found.',
  FILTERS_FINANCES_404_PT: 'Não foram encontrados registros.',
  FINANCIALRECORD_CREATE_201_PT: 'Demonstrativo criado com sucesso.',
  FINANCIALRECORD_CREATE_500:
    'An error occurred while creating the financial record. Please check the error log for more information.',
  FINANCIALRECORD_CREATE_500_PT:
    'Um erro ocorreu ao criar o demonstrativo. Por favor, indique o código PID para o time de desenvolvimento.',
  FINANCIALRECORD_DELETE_200_PT: 'Demonstrativo removido com sucesso.',
  FINANCIALRECORD_DELETE_500:
    'An error occurred while deleting the financial record. Please check the error log for more information.',
  FINANCIALRECORD_DELETE_500_PT:
    'Um erro ocorreu ao remover o demonstrativo. Por favor, indique o código PID para o time de desenvolvimento.',
  FINANCIALRECORD_FETCH_200_PT: 'Demonstrativo encontrado com sucesso.',
  FINANCIALRECORD_FETCH_404: 'There is no financial record to show.',
  FINANCIALRECORD_FETCH_404_PT: 'Demonstrativo não encontrado.',
  FINANCIALRECORD_FETCH_500:
    'An error occurred while fetching the financial record. Please check the error log for more information.',
  FINANCIALRECORD_FETCH_500_PT:
    'Um erro ocorreu ao buscar o demonstrativo. Por favor, indique o código PID para o time de desenvolvimento.',
  FINANCIALRECORDS_FETCH_200_PT: 'Demonstrativos encontrados com sucesso.',
  FINANCIALRECORDS_FETCH_404: 'There are no financial records to show.',
  FINANCIALRECORDS_FETCH_404_PT: 'Não há demonstrativos para exibir.',
  FINANCIALRECORDS_FETCH_500:
    'An error occurred while fetching the financial records. Please check the error log for more information.',
  FINANCIALRECORDS_FETCH_500_PT:
    'Um erro ocorreu ao buscar os demonstrativos. Por favor, indique o código PID para o time de desenvolvimento.',
  FINANCIALRECORD_UPDATE_200_PT: 'Demonstrativo atualizado com sucesso.',
  FINANCIALRECORD_UPDATE_500:
    'An error occurred while updating the financial record. Please check the error log for more information.',
  FINANCIALRECORD_UPDATE_500_PT:
    'Um erro ocorreu ao atualizar o demonstrativo. Por favor, indique o código PID para o time de desenvolvimento.',
  REVENUECATEGORY_CREATE_201_PT: 'Categoria criada com sucesso.',
  REVENUECATEGORY_CREATE_500:
    'An unexpected error occurred while creating the category. Please check the error log for more information.',
  REVENUECATEGORY_CREATE_500_PT:
    'Um erro inesperado ocorreu ao criar a categoria. Por favor, indique o código PID para o time de desenvolvimento.',
  REVENUECATEGORIES_FETCH_200_PT: 'Lista de categorias encontradas.',
  REVENUECATEGORIES_FETCH_404: 'There are no categories to show.',
  REVENUECATEGORIES_FETCH_404_PT: 'Não foram encontradas categorias',
  REVENUECATEGORIES_FETCH_500:
    'An unexpected error occurred while fetching the category. Please check the error log for more information.',
  REVENUECATEGORIES_FETCH_500_PT:
    'Um erro inesperado ocorreu ao buscar a categoria. Por favor, indique o código PID para o time de desenvolvimento.',
  REVENUECATEGORY_FETCH_200_PT: 'Categoria encontrada com sucesso.',
  REVENUECATEGORY_FETCH_404: 'The category was not found.',
  REVENUECATEGORY_FETCH_404_PT: 'A categoria não foi encontrada.',
  REVENUECATEGORY_FETCH_500:
    'An unexpected error occurred while fetching the category. Please check the error log for more information.',
  REVENUECATEGORY_FETCH_500_PT:
    'Um erro inesperado ocorreu ao buscar a categoria. Por favor, indique o código PID para o time de desenvolvimento.',
  REVENUECATEGORY_UPDATE_200_PT: 'Categoria atualizada com sucesso.',
  REVENUECATEGORY_UPDATE_500:
    'An unexpected error occurred while updating the category. Please check the error log for more information.',
  REVENUECATEGORY_UPDATE_500_PT:
    'Um erro inesperado ocorreu ao atualizar a categoria. Por favor, indique o código PID para o time de desenvolvimento.',
  REVENUECATEGORY_DELETE_200_PT: 'Categoria removida com sucesso.',
  REVENUECATEGORY_DELETE_500:
    'An unexpected error occurred while deleting the category. Please check the error log for more information.',
  REVENUECATEGORY_DELETE_500_PT:
    'Um erro inesperado ocorreu ao deletar a categoria. Por favor, indique o código PID para o time de desenvolvimento.',
  USER_FETCH_200: 'User successfully found.',
  USER_FETCH_200_PT: 'Usuário(a) encontrado(a) com sucesso.',
  USER_201: 'User successfully created.',
  USER_201_PT: 'Usuário(a) criado(a) com sucesso.',
  USER_404: 'User not found.',
  USER_404_PT: 'Usuário(a) não encontrado(a).',
  USER_CREATE_500:
    'An unexpected error occurred while creating the user. Please check the error log for more information.',
  USER_CREATE_500_PT:
    'Um erro inesperado ocorreu ao criar o(a) usuário(a). Por favor, indique o código PID para o time de desenvolvimento.',
  USER_UPDATE_200_PT: 'Usuário(a) atualizado(a) com sucesso.',
  USER_UPDATE_500:
    'An unexpected error occurred while updating the user. Please check the error log for more information.',
  USER_UPDATE_500_PT:
    'Um erro inesperado ocorreu ao atualizar o(a) usuário(a). Por favor, indique o código PID para o time de desenvolvimento.',
  USER_FETCH_500:
    'An unexpected error occurred while fetching the user. Please check the error log for more information.',
  USER_FETCH_500_PT:
    'Um erro inesperado ocorreu ao buscar o(a) usuário(a). Por favor, indique o código PID para o time de desenvolvimento.',
  USER_DELETE_200: 'User successfully updated.',
  USER_DELETE_200_PT: 'Usuário(a) removido(a) com sucesso.',
  USER_DELETE_500:
    'An unexpected error occurred while deleting the user. Please check the error log for more information.',
  USER_DELETE_500_PT:
    'Um erro inesperado ocorreu ao remover o(a) usuário(a) do sistema. Por favor, indique o código PID para o time de desenvolvimento.',
  USERS_404: 'There are no users to show.',
  USERS_404_PT: 'Não há usuários para mostrar.',
  USERS_FETCH_500:
    'An unexpected error occurred while fetching the users. Please check the error log for more information.',
  USERS_FETCH_500_PT:
    'Um erro inesperado ocorreu ao buscar os usuários no sistema. Por favor, indique o código PID para o time de desenvolvimento.',
  PASSWORD_UPDATE_200: 'Password succesfully updated.',
  PASSWORD_UPDATE_200_PT: 'Senha atualizada com sucesso.',
  PASSWORD_UPDATE_500:
    'An unexpected error occurred while updating the password. Please check the error log for more information.',
  PASSWORD_UPDATE_500_PT:
    'Um erro inesperado ocorreu ao atualizar a senha no sistema. Por favor, indique o código PID para o time de desenvolvimento.',
  PASSWORD_UPDATE_409:
    'This password has already been used. Please choose a different password.',
  PASSWORD_UPDATE_409_PT:
    'A senha já foi usada anteriormente. Por favor, escolha uma nova senha.',
  LOGIN_200_PT: 'Usuário(a) logado(a) com sucesso.',
  LOGIN_400_PT: 'Email ou senha inválidos.',
  LOGIN_403_PT: 'Credenciais inválidas.',
  LOGIN_SESSION_403_PT: 'Sessão inválida. Por favor, faça login.',
  LOGIN_500:
    'An unexpected error occurred while logging the user in. Please check the error log for more information.',
  LOGIN_500_PT:
    'Um erro inesperado ocorreu ao fazer o login. Por favor, indique o código PID para o time de desenvolvimento.',
  PASSWORD_LOGIN_400: 'Wrong password.',
  EMAIL_LOGIN_400: 'This email does not belong to any user in the system.',
  LOGOUT_200: 'User successfully logged out.',
  LOGOUT_200_PT: 'Usuário(a) deslogado com sucesso.',
  SALT_ROUNDS_500:
    'Check the SALT_ROUNDS environment variable. It is currently NaN.',
  ENVIRONMENT_VARIABLES_500_PT:
    'Um erro de configuração impede o correto funcionamento da aplicação. Por favor, indique o código PID para o time de desenvolvimento.',
  TOKEN_GENERATE_500:
    'An unexpected error occurred while generating the JWT token. Please check the error log for more information.',
  TOKEN_GENERATE_500_PT:
    'Um erro inesperado ocorreu ao gerar o token de autorização. Por favor, indique o código PID para o time de desenvolvimento.',
  SENDGRID_500:
    'An unexpected error occurred while sending the email. Please check the error log for more information.',
  SENDGRID_500_PT:
    'Um erro interno ocorreu ao enviar o email. Por favor, indique o código PID para o time de desenvolvimento.',
  VERIFY_JWT_500:
    'An error occurred while verifying a JWT. Please check the error log for more information.',
  VERIFY_JWT_500_PT:
    'Um erro inesperado ocorreu. Por favor, indique o código PID para o time de desenvolvimento.',
  LOGIN_GUARD_500: 'User trying to access resource without a token.',
  LOGIN_GUARD_500_PT: 'Você não tem autorização para acessar este recurso.',
};

export default HTTP_MESSAGES;
