import * as yup from 'yup';

const SendMessageSchema = yup.object({
  message: yup
    .string()
    .typeError('O campo message é do tipo texto!')
    .required('O campo message é um campo obrigatório!'),
  email: yup
    .string()
    .typeError('O campo email é do tipo texto!')
    .email('O campo email deve conter um formato valido. Ex: email@dominio.com')
    .required('O campo email é um campo obrigatório!')
});

export { SendMessageSchema };
